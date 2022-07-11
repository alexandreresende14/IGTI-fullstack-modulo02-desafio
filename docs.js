export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description:
      "This is my resolution about the challenge API code from IGTI's Fullstack Developer course Module 02",
    version: '1.0.0',
    title: 'Grades-Control-API',
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'grade',
      description: 'Grade management',
    },
  ],
  paths: {
    '/grade': {
      post: {
        tags: ['grade'],
        summary: 'Add a new grade',
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Create a new grade with the received parameters',
            required: true,
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Grade created',
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
      get: {
        tags: ['grade'],
        summary: 'Get existing grades',
        description: '',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Grade',
              },
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
    '/grade/{id}': {
      get: {
        tags: ['grade'],
        summary: 'Find a grade by id',
        description: 'Returns a single grade',
        operationId: 'getGradeById',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of pet to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'Invalid ID supplied',
          },
        },
      },
      delete: {
        tags: ['grade'],
        summary: 'Deletes a grade',
        description: '',
        operationId: 'deleteGrade',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Grade id to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'Deleted succesfully',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'Invalid ID supplied',
          },
        },
      },
      put: {
        tags: ['grade'],
        summary: 'Updated grade',
        description: '',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Grade id to update',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            in: 'body',
            name: 'body',
            description: '',
            required: true,
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
        ],
        // parameters: [
        //   {
        //
        //   },
        // ],
        responses: {
          '200': {
            description: 'Grade updated successfully',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'Updated Error',
          },
        },
      },
    },
    '/grade/{student}/{subject}': {
      get: {
        tags: ['grade'],
        summary: 'Sum grades',
        description:
          'Sum the value of the grades of an specific student and subject',
        consumes: ['multipart/form-data'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'student',
            in: 'path',
            description: 'Student name',
            required: true,
            type: 'string',
          },
          {
            name: 'subject',
            in: 'path',
            description: 'Subject name',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'Error operation',
          },
        },
      },
    },
    '/grade/media/{subject}/{type}': {
      get: {
        tags: ['grade'],
        summary: 'Media grades',
        description: 'Shows the media grades of specific subject and type',
        consumes: ['multipart/form-data'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'subject',
            in: 'path',
            description: 'Subject name',
            required: true,
            type: 'string',
          },
          {
            name: 'type',
            in: 'path',
            description: 'Type of subject',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Grade',
            },
          },
          '400': {
            description: 'Error operation',
          },
        },
      },
    },
  },
  definitions: {
    Grade: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        student: {
          type: 'string',
          example: 'Alexandre Resende',
        },
        subject: {
          type: 'string',
          example: '01 - JavaScript',
        },
        type: {
          type: 'string',
          example: 'Trabalho Pratico',
        },
        value: {
          type: 'string',
          example: 10,
        },
      },
    },
  },
  externalDocs: {
    description: 'Developer - Alexandre Resende - linkedin',
    url: 'https://www.linkedin.com/in/alexandre-resende-asr/',
  },
}
