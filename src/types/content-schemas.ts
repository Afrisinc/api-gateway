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
    description: 'Generate social media posts using external AI Agent service',
    required: ['topic'],
    additionalProperties: true,
    properties: {
      topic: {
        type: 'string',
        minLength: 1,
        maxLength: 500,
        description: 'Topic for post generation',
      },
      keywords: {
        type: 'string',
        description: 'Keywords or hashtags to include (optional)',
      },
      link: {
        type: 'string',
        format: 'uri',
        description: 'Link to include in the post (optional)',
      },
      submittedAt: {
        type: 'string',
        format: 'date-time',
        description: 'ISO 8601 timestamp of submission (optional, defaults to current time)',
      },
      formMode: {
        type: 'string',
        enum: ['test', 'production'],
        default: 'production',
        description: 'Mode of operation - test or production',
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
    description: 'Generated social media posts from AI service',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Whether content generation was successful',
        example: true,
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Posts generated successfully',
      },
      data: {
        type: 'array',
        description: 'Generated posts with IDs',
        items: {
          type: 'object',
          additionalProperties: true,
          properties: {
            id: {
              type: 'string',
              description: 'Generated post ID',
            },
            post_id: {
              type: 'string',
              description: 'Platform post ID',
            },
          },
        },
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
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status (false for errors)',
        example: false,
      },
      message: {
        type: 'string',
        description: 'Error message',
        example: 'Content service unavailable',
      },
      error: {
        type: 'string',
        description: 'Error details',
      },
    },
  },
};
