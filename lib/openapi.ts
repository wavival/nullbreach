export const openapiDocument = {
  openapi: "3.0.3",
  info: {
    title: "NullBreach API",
    version: "0.1.0",
    description:
      "API for the NullBreach AI-assisted application security workspace.",
  },
  servers: [
    { url: "https://www.wavival.dev/nullbreach", description: "Production" },
    {
      url: "https://nullbreach-git-stg-wavivals-projects.vercel.app/nullbreach",
      description: "Staging",
    },
    { url: "http://localhost:3000/nullbreach", description: "Local" },
  ],
  tags: [{ name: "Health" }, { name: "Authentication" }, { name: "Workspace" }],
  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Check deployment and database health",
        operationId: "getHealth",
        responses: {
          "200": {
            description: "Database is available",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Health" },
              },
            },
          },
          "503": {
            description: "Database is unavailable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Health" },
              },
            },
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Create a credentials account",
        operationId: "register",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Account created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "400": {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "409": {
            description: "Email already registered",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "503": {
            description: "Database unavailable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/auth/{nextauth}": {
      get: {
        tags: ["Authentication"],
        summary: "NextAuth OAuth and session operations",
        operationId: "nextAuthGet",
        parameters: [{ $ref: "#/components/parameters/NextAuthPath" }],
        responses: { "200": { description: "NextAuth response" } },
      },
      post: {
        tags: ["Authentication"],
        summary: "NextAuth OAuth and session operations",
        operationId: "nextAuthPost",
        parameters: [{ $ref: "#/components/parameters/NextAuthPath" }],
        responses: { "200": { description: "NextAuth response" } },
      },
    },
    "/api/chat": {
      post: {
        tags: ["Workspace"],
        summary: "Ask a secure-development question",
        security: [{ sessionCookie: [] }],
        operationId: "createChat",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ChatRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Chat response",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ChatResponse" },
              },
            },
          },
          "400": {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": {
            description: "Authentication required",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "413": {
            description: "Input too long",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "502": {
            description: "Provider or persistence failure",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/analyze": {
      post: {
        tags: ["Workspace"],
        summary: "Analyze code for AppSec vulnerabilities",
        security: [{ sessionCookie: [] }],
        operationId: "analyzeCode",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AnalyzeRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Analysis response",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AnalyzeResponse" },
              },
            },
          },
          "400": {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": {
            description: "Authentication required",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "413": {
            description: "Input too long",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "502": {
            description: "Provider or persistence failure",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/history": {
      get: {
        tags: ["Workspace"],
        summary: "Get the current user's recent chat history",
        security: [{ sessionCookie: [] }],
        operationId: "getHistory",
        responses: {
          "200": { description: "Chat history" },
          "401": {
            description: "Authentication required",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "503": {
            description: "Database unavailable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      NextAuthPath: {
        name: "nextauth",
        in: "path",
        required: true,
        description:
          "NextAuth operation, for example signin/google or session.",
        schema: { type: "string" },
      },
    },
    securitySchemes: {
      sessionCookie: {
        type: "apiKey",
        in: "cookie",
        name: "next-auth.session-token",
      },
    },
    schemas: {
      Error: {
        type: "object",
        required: ["error"],
        properties: { error: { type: "string" } },
      },
      Health: {
        type: "object",
        required: ["status"],
        properties: { status: { type: "string", enum: ["ok", "degraded"] } },
      },
      User: {
        type: "object",
        required: ["id", "email"],
        properties: {
          id: { type: "string" },
          email: { type: "string", format: "email" },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: {
            type: "string",
            minLength: 8,
            maxLength: 128,
            format: "password",
          },
        },
      },
      ChatRequest: {
        type: "object",
        required: ["question"],
        properties: {
          question: { type: "string", minLength: 1, maxLength: 4000 },
        },
      },
      ChatResponse: {
        type: "object",
        required: ["response", "id", "timestamp"],
        properties: {
          response: { type: "string" },
          id: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
        },
      },
      AnalyzeRequest: {
        type: "object",
        required: ["code"],
        properties: {
          code: { type: "string", minLength: 1, maxLength: 20000 },
        },
      },
      AnalyzeResponse: {
        type: "object",
        required: ["vulnerabilities", "id", "timestamp"],
        properties: {
          vulnerabilities: { type: "string" },
          id: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
        },
      },
    },
  },
} as const;
