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
   * Get All Articles Response Schema
   * Response from GET /articles
   */
  getAllArticlesResponse: {
    type: 'object',
    title: 'Get All Articles Response',
    description: 'Get all articles with search and pagination',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      resp_msg: {
        type: 'string',
        description: 'Response message',
        example: 'Articles retrieved successfully',
      },
      resp_code: {
        type: 'integer',
        description: 'Response code',
        example: 1000,
      },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          data: {
            type: 'array',
            description: 'Array of articles',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: { type: 'string' },
                guid: { type: 'string' },
                source_url: { type: 'string' },
                source_headline: { type: 'string' },
                source_summary: { type: 'string' },
                image_url: { type: 'string' },
                pub_date: { type: 'string' },
                category: { type: 'string' },
                creator: { type: 'string' },
                status: { type: 'string' },
                isFeatured: { type: 'boolean' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
              hasMore: { type: 'boolean' },
            },
          },
        },
      },
    },
  },

  /**
   * Get Articles by Category Response Schema
   * Response from GET /articles/category/:category
   */
  getArticlesByCategoryResponse: {
    type: 'object',
    title: 'Get Articles by Category Response',
    description: 'Get articles by category with pagination',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      resp_msg: {
        type: 'string',
        description: 'Response message',
        example: 'Articles retrieved successfully',
      },
      resp_code: {
        type: 'integer',
        description: 'Response code',
        example: 1000,
      },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          data: {
            type: 'array',
            description: 'Array of articles in category',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: { type: 'string' },
                guid: { type: 'string' },
                source_url: { type: 'string' },
                source_headline: { type: 'string' },
                source_summary: { type: 'string' },
                image_url: { type: 'string' },
                pub_date: { type: 'string' },
                category: { type: 'string' },
                creator: { type: 'string' },
                status: { type: 'string' },
                isFeatured: { type: 'boolean' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
              hasMore: { type: 'boolean' },
            },
          },
        },
      },
    },
  },

  /**
   * Get Article by ID Response Schema
   * Response from GET /articles/:id
   */
  getArticleByIdResponse: {
    type: 'object',
    title: 'Get Article by ID Response',
    description: 'Get a single   article by ID',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      resp_msg: {
        type: 'string',
        description: 'Response message',
        example: 'Article retrieved successfully',
      },
      resp_code: {
        type: 'integer',
        description: 'Response code',
        example: 1000,
      },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          id: { type: 'string' },
          guid: { type: 'string' },
          source_url: { type: 'string' },
          source_headline: { type: 'string' },
          source_summary: { type: 'string' },
          image_url: { type: 'string' },
          pub_date: { type: 'string' },
          category: { type: 'string' },
          creator: { type: 'string' },
          status: { type: 'string' },
          isFeatured: { type: 'boolean' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
        },
      },
    },
  },

  /**
   * Get All Generated Posts Response Schema
   * Response from GET /generated-posts
   */
  getAllGeneratedPostsResponse: {
    type: 'object',
    title: 'Get All Generated Posts Response',
    description: 'Get all generated posts with pagination',
    additionalProperties: true,
    properties: {
      success: { type: 'boolean' },
      resp_msg: { type: 'string' },
      resp_code: { type: 'integer' },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          data: {
            type: 'array',
            description: 'Array of generated posts',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: { type: 'string' },
                post_id: { type: 'string' },
                topic: { type: 'string' },
                platform: { type: 'string' },
                fb_post_id: { type: 'string' },
                fb_url: { type: 'string' },
                fb_content: { type: 'string' },
                fb_hashtags: { type: 'string' },
                insta_post_id: { type: 'string' },
                insta_url: { type: 'string' },
                insta_content: { type: 'string' },
                insta_hashtags: { type: 'string' },
                status: { type: 'string' },
                created_at: { type: 'string' },
                published_at: { type: 'string' },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
              hasMore: { type: 'boolean' },
            },
          },
        },
      },
    },
  },

  /**
   * Get Generated Posts by Status Response Schema
   * Response from GET /generated-posts/status/:status
   */
  getGeneratedPostsByStatusResponse: {
    type: 'object',
    title: 'Get Generated Posts by Status Response',
    description: 'Get generated posts by status with pagination',
    additionalProperties: true,
    properties: {
      success: { type: 'boolean' },
      resp_msg: { type: 'string' },
      resp_code: { type: 'integer' },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          data: {
            type: 'array',
            description: 'Array of generated posts with specified status',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: { type: 'string' },
                post_id: { type: 'string' },
                topic: { type: 'string' },
                platform: { type: 'string' },
                fb_post_id: { type: 'string' },
                fb_url: { type: 'string' },
                fb_content: { type: 'string' },
                fb_hashtags: { type: 'string' },
                insta_post_id: { type: 'string' },
                insta_url: { type: 'string' },
                insta_content: { type: 'string' },
                insta_hashtags: { type: 'string' },
                status: { type: 'string' },
                created_at: { type: 'string' },
                published_at: { type: 'string' },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
              hasMore: { type: 'boolean' },
            },
          },
        },
      },
    },
  },

  /**
   * Get Generated Post by ID Response Schema
   * Response from GET /generated-posts/:id
   */
  getGeneratedPostByIdResponse: {
    type: 'object',
    title: 'Get Generated Post by ID Response',
    description: 'Get a single generated post by ID',
    additionalProperties: true,
    properties: {
      success: { type: 'boolean' },
      resp_msg: { type: 'string' },
      resp_code: { type: 'integer' },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          id: { type: 'string' },
          post_id: { type: 'string' },
          topic: { type: 'string' },
          platform: { type: 'string' },
          fb_post_id: { type: 'string' },
          fb_url: { type: 'string' },
          fb_content: { type: 'string' },
          fb_hashtags: { type: 'string' },
          insta_post_id: { type: 'string' },
          insta_url: { type: 'string' },
          insta_content: { type: 'string' },
          insta_hashtags: { type: 'string' },
          status: { type: 'string' },
          created_at: { type: 'string' },
          published_at: { type: 'string' },
        },
      },
    },
  },

  /**
   * Create Generated Post Request Schema
   * Used for POST /generated-posts
   */
  createGeneratedPostRequest: {
    type: 'object',
    title: 'Create Generated Post Request',
    description: 'Create a new generated post',
    additionalProperties: true,
    properties: {
      post_id: { type: 'string', description: 'External post identifier' },
      topic: { type: 'string', description: 'Topic or title of the post' },
      platform: { type: 'string', description: 'Target platform' },
      fb_post_id: { type: 'string', description: 'Facebook post ID' },
      fb_url: { type: 'string', description: 'Facebook post URL' },
      fb_content: { type: 'string', description: 'Facebook post content' },
      fb_hashtags: { type: 'string', description: 'Facebook post hashtags' },
      insta_post_id: { type: 'string', description: 'Instagram post ID' },
      insta_url: { type: 'string', description: 'Instagram post URL' },
      insta_content: { type: 'string', description: 'Instagram post content' },
      insta_hashtags: { type: 'string', description: 'Instagram post hashtags' },
      status: { type: 'string', description: 'Post status' },
    },
  },

  /**
   * Create Generated Post Response Schema
   * Response from POST /generated-posts
   */
  createGeneratedPostResponse: {
    type: 'object',
    title: 'Create Generated Post Response',
    description: 'Created generated post',
    additionalProperties: true,
    properties: {
      success: { type: 'boolean' },
      resp_msg: { type: 'string' },
      resp_code: { type: 'integer' },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          id: { type: 'string' },
          post_id: { type: 'string' },
          topic: { type: 'string' },
          platform: { type: 'string' },
          fb_post_id: { type: 'string' },
          fb_url: { type: 'string' },
          fb_content: { type: 'string' },
          fb_hashtags: { type: 'string' },
          insta_post_id: { type: 'string' },
          insta_url: { type: 'string' },
          insta_content: { type: 'string' },
          insta_hashtags: { type: 'string' },
          status: { type: 'string' },
          created_at: { type: 'string' },
          published_at: { type: 'string' },
        },
      },
    },
  },

  /**
   * Update Generated Post Request Schema
   * Used for PUT /generated-posts/:id
   */
  updateGeneratedPostRequest: {
    type: 'object',
    title: 'Update Generated Post Request',
    description: 'Update an existing generated post',
    additionalProperties: true,
    properties: {
      post_id: { type: 'string', description: 'External post identifier' },
      topic: { type: 'string', description: 'Topic or title of the post' },
      platform: { type: 'string', description: 'Target platform' },
      fb_post_id: { type: 'string', description: 'Facebook post ID' },
      fb_url: { type: 'string', description: 'Facebook post URL' },
      fb_content: { type: 'string', description: 'Facebook post content' },
      fb_hashtags: { type: 'string', description: 'Facebook post hashtags' },
      insta_post_id: { type: 'string', description: 'Instagram post ID' },
      insta_url: { type: 'string', description: 'Instagram post URL' },
      insta_content: { type: 'string', description: 'Instagram post content' },
      insta_hashtags: { type: 'string', description: 'Instagram post hashtags' },
      status: { type: 'string', description: 'Post status' },
      published_at: { type: 'string', description: 'Publication timestamp' },
    },
  },

  /**
   * Generated Posts by Platform Response Schema
   * Response from GET /generated-posts/platform/:platform
   */
  getGeneratedPostsByPlatformResponse: {
    type: 'object',
    title: 'Get Generated Posts by Platform Response',
    description: 'Get generated posts by platform with pagination',
    additionalProperties: true,
    properties: {
      success: { type: 'boolean' },
      resp_msg: { type: 'string' },
      resp_code: { type: 'integer' },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          data: {
            type: 'array',
            description: 'Array of generated posts for specified platform',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: { type: 'string' },
                post_id: { type: 'string' },
                topic: { type: 'string' },
                platform: { type: 'string' },
                fb_post_id: { type: 'string' },
                fb_url: { type: 'string' },
                fb_content: { type: 'string' },
                fb_hashtags: { type: 'string' },
                insta_post_id: { type: 'string' },
                insta_url: { type: 'string' },
                insta_content: { type: 'string' },
                insta_hashtags: { type: 'string' },
                status: { type: 'string' },
                created_at: { type: 'string' },
                published_at: { type: 'string' },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
              hasMore: { type: 'boolean' },
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
