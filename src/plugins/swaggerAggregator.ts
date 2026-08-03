import axios, { AxiosError } from 'axios';
import { logger } from '../utils/logger';

interface ExternalApiSource {
  name: string;
  baseUrl: string;
  jsonDocUrl: string;
  routePrefix: string;
}

interface OpenAPIObject {
  openapi?: string;
  swagger?: string;
  info: {
    title: string;
    description?: string;
    version: string;
  };
  paths?: Record<string, Record<string, unknown>>;
  components?: {
    schemas?: Record<string, unknown>;
    securitySchemes?: Record<string, unknown>;
    responses?: Record<string, unknown>;
  };
  tags?: Array<{ name: string; description?: string }>;
  security?: Array<Record<string, string[]>>;
  [key: string]: unknown;
}

const fetchExternalSpec = async (jsonDocUrl: string, serviceName: string): Promise<OpenAPIObject | null> => {
  try {
    const response = await axios.get<OpenAPIObject>(jsonDocUrl, {
      timeout: 5000,
    });

    if (!response.data || typeof response.data !== 'object') {
      logger.warn(`Invalid OpenAPI spec from ${serviceName}: response is not a valid object`);
      return null;
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    logger.warn(`Failed to fetch OpenAPI spec for ${serviceName} from ${jsonDocUrl}: ${axiosError.message}`);
    return null;
  }
};

const removeServiceSuffix = (serviceName: string): string => {
  const lowerName = serviceName.toLowerCase();
  if (lowerName.endsWith(' service')) {
    return serviceName.slice(0, -8).trim();
  }
  if (lowerName === 'service') {
    return '';
  }
  return serviceName;
};

const removeTrailingSlashes = (url: string): string => {
  let result = url;
  while (result.endsWith('/')) {
    result = result.slice(0, -1);
  }
  return result;
};

const remapPathsWithPrefix = (spec: OpenAPIObject, routePrefix: string): Record<string, Record<string, unknown>> => {
  const remappedPaths: Record<string, Record<string, unknown>> = {};

  if (!spec.paths) {
    return remappedPaths;
  }

  Object.entries(spec.paths).forEach(([path, pathItem]) => {
    const normalizedPrefix = routePrefix.endsWith('/') ? routePrefix.slice(0, -1) : routePrefix;
    const newPath = `${normalizedPrefix}${path}`;
    remappedPaths[newPath] = pathItem;
  });

  return remappedPaths;
};

const mergeComponents = (
  masterComponents: NonNullable<OpenAPIObject['components']>,
  externalComponents: OpenAPIObject['components'] | undefined,
  serviceName: string
): void => {
  if (!externalComponents) {
    return;
  }

  if (externalComponents.schemas) {
    if (!masterComponents.schemas) {
      masterComponents.schemas = {};
    }

    Object.entries(externalComponents.schemas).forEach(([schemaName, schema]) => {
      const servicePart = removeServiceSuffix(serviceName);
      const prefixedName = `${servicePart}_${schemaName}`;
      masterComponents.schemas![prefixedName] = schema;
    });
  }

  if (externalComponents.securitySchemes) {
    if (!masterComponents.securitySchemes) {
      masterComponents.securitySchemes = {};
    }

    Object.entries(externalComponents.securitySchemes).forEach(([schemeName, scheme]) => {
      if (!masterComponents.securitySchemes![schemeName]) {
        masterComponents.securitySchemes![schemeName] = scheme;
      }
    });
  }

  if (externalComponents.responses) {
    if (!masterComponents.responses) {
      masterComponents.responses = {};
    }

    Object.entries(externalComponents.responses).forEach(([responseName, response]) => {
      const servicePart = removeServiceSuffix(serviceName);
      const prefixedName = `${servicePart}_${responseName}`;
      masterComponents.responses![prefixedName] = response;
    });
  }
};

const tagPathsWithService = (
  masterPaths: Record<string, Record<string, unknown>>,
  masterTags: Array<{ name: string; description?: string }>,
  remappedPaths: Record<string, Record<string, unknown>>,
  serviceName: string
): void => {
  const tagName = removeServiceSuffix(serviceName);
  const tagDescription = `${serviceName} endpoints`;

  // Register the service tag if not already present
  if (!masterTags.some(t => t.name === tagName)) {
    masterTags.push({
      name: tagName,
      description: tagDescription,
    });
  }

  // Iterate through all paths and tag each operation
  Object.entries(remappedPaths).forEach(([path, pathItem]) => {
    if (!masterPaths[path]) {
      masterPaths[path] = pathItem;
    }

    const pathObj = pathItem as Record<string, unknown>;

    // Tag all HTTP methods in this path
    Object.keys(pathObj).forEach(method => {
      const operation = pathObj[method] as Record<string, unknown>;
      if (operation && typeof operation === 'object') {
        operation.tags = [tagName];
      }
    });
  });
};

export const buildAggregatedSwaggerDocument = async (
  gatewayBaseSpec: OpenAPIObject,
  externalServices: ExternalApiSource[]
): Promise<OpenAPIObject> => {
  const aggregatedSpec: OpenAPIObject = structuredClone(gatewayBaseSpec);

  if (!aggregatedSpec.openapi && !aggregatedSpec.swagger) {
    aggregatedSpec.openapi = '3.0.0';
  }

  if (!aggregatedSpec.paths) {
    aggregatedSpec.paths = {};
  }
  if (!aggregatedSpec.components) {
    aggregatedSpec.components = {};
  }
  if (!aggregatedSpec.tags) {
    aggregatedSpec.tags = [];
  }

  for (const service of externalServices) {
    const externalSpec = await fetchExternalSpec(service.jsonDocUrl, service.name);

    if (!externalSpec) {
      logger.info(`Skipping ${service.name} — spec could not be fetched`);
      continue;
    }

    const remappedPaths = remapPathsWithPrefix(externalSpec, service.routePrefix);

    tagPathsWithService(aggregatedSpec.paths, aggregatedSpec.tags, remappedPaths, service.name);

    if (externalSpec.components) {
      mergeComponents(aggregatedSpec.components, externalSpec.components, service.name);
    }

    logger.info(`Aggregated ${Object.keys(remappedPaths).length} endpoints from ${service.name}`);
  }

  if (!aggregatedSpec.openapi && !aggregatedSpec.swagger) {
    aggregatedSpec.openapi = '3.0.0';
  }

  return aggregatedSpec;
};

export const buildExternalApiSources = (): ExternalApiSource[] => {
  const services: ExternalApiSource[] = [];

  const serviceConfigs = [
    { envVar: 'AUTH_URL', name: 'Authentication Service', routePrefix: '/auth' },
    { envVar: 'MEDIA_URL', name: 'Media Service', routePrefix: '/media' },
    { envVar: 'NOTIFY_URL', name: 'Notify Service', routePrefix: '/notify' },
    { envVar: 'VPN_URL', name: 'VPN Service', routePrefix: '/vpn' },
  ];

  serviceConfigs.forEach(({ envVar, name, routePrefix }) => {
    const baseUrl = process.env[envVar];
    if (baseUrl) {
      const cleanUrl = removeTrailingSlashes(baseUrl);
      services.push({
        name,
        baseUrl,
        jsonDocUrl: `${cleanUrl}/docs/json`,
        routePrefix,
      });
    }
  });

  return services;
};

export type { ExternalApiSource, OpenAPIObject };
