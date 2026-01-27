/**
 * Content Request/Response Schemas
 * Professional JSON Schema definitions for content endpoints
 */

export const ContentSchemas = {
  /**
   * AI Generate Content Request Schema
   * Used for POST /content/ai/generate
   */
  aiGenerateRequest: {
    type: 'object',
    title: 'AI Generate Content Request',
    description: 'Generate content using AI with specified prompt and parameters',
    required: ['prompt'],
    additionalProperties: false,
    properties: {
      prompt: {
        type: 'string',
        description: 'The prompt or topic for content generation',
        minLength: 10,
        maxLength: 2000,
        example: 'Write a professional product description for an e-commerce platform',
      },
      contentType: {
        type: 'string',
        description: 'Type of content to generate',
        enum: ['PRODUCT_DESCRIPTION', 'BLOG_POST', 'SOCIAL_MEDIA', 'EMAIL', 'GENERAL'],
        example: 'PRODUCT_DESCRIPTION',
      },
      tone: {
        type: 'string',
        description: 'Tone of the generated content',
        enum: ['PROFESSIONAL', 'CASUAL', 'FORMAL', 'CREATIVE', 'TECHNICAL'],
        example: 'PROFESSIONAL',
      },
      maxTokens: {
        type: 'number',
        description: 'Maximum tokens for the generated content (optional)',
        minimum: 50,
        maximum: 4000,
        example: 500,
      },
      language: {
        type: 'string',
        description: 'Language for generated content (ISO 639-1 code)',
        pattern: '^[a-z]{2}(-[A-Z]{2})?$',
        example: 'en',
      },
    },
  },

  /**
   * AI Generate Content Response Schema
   * Response from POST /content/ai/generate
   */
  aiGenerateResponse: {
    type: 'object',
    title: 'AI Generate Content Response',
    description: 'Generated content from AI service',
    properties: {
      success: {
        type: 'boolean',
        description: 'Whether content generation was successful',
        example: true,
      },
      data: {
        type: 'object',
        description: 'Generated content data',
        properties: {
          content: {
            type: 'string',
            description: 'The generated content',
            example: 'Premium product offering exceptional quality and value...',
          },
          contentType: {
            type: 'string',
            description: 'Type of content generated',
            example: 'PRODUCT_DESCRIPTION',
          },
          tokenCount: {
            type: 'number',
            description: 'Number of tokens used for generation',
            example: 245,
          },
          generatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'ISO 8601 timestamp of generation',
            example: '2026-01-27T10:30:00Z',
          },
        },
      },
      message: {
        type: 'string',
        description: 'Success message',
        example: 'Content generated successfully',
      },
    },
  },

  /**
   * Error Response Schema
   * Used for error responses across content endpoints
   */
  errorResponse: {
    type: 'object',
    title: 'Error Response',
    description: 'Error response from content service',
    properties: {
      message: {
        type: 'string',
        description: 'Error message',
        example: 'Content service unavailable',
      },
      code: {
        type: 'string',
        description: 'Error code for client handling',
        example: 'SERVICE_UNAVAILABLE',
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        description: 'ISO 8601 error timestamp',
        example: '2026-01-27T10:30:00Z',
      },
    },
  },
};
