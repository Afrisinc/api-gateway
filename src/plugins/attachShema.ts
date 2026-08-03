import fp from 'fastify-plugin';

const prefixTagMap: Record<string, string> = {
  '/auth': 'Auth',
  '/media': 'Media',
  '/notify': 'Notify',
  '/vpn': 'VPN',
};

export default fp(async fastify => {
  fastify.addHook('onRoute', routeOptions => {
    for (const prefix in prefixTagMap) {
      if (routeOptions.url.startsWith(prefix)) {
        routeOptions.schema = {
          ...(routeOptions.schema || {}),
          tags: [prefixTagMap[prefix]],
        };
        break;
      }
    }
  });
});
