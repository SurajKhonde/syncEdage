// swaggerConfig.ts
import swaggerJsDoc from "swagger-jsdoc";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dynamic Tech",
      version: "1.0.0",
      description: "Your API description",
    },
    servers: [
      {
        url: "http://192.168.32.110:8006/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
    
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/swaggerIndex*.js"],
};

const specs = swaggerJsDoc(options);

export default specs;
