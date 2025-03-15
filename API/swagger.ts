import tsj from "ts-json-schema-generator";
import swaggerJSDoc, { OAS3Options, } from "swagger-jsdoc";

const options: OAS3Options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog REST API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.ts", "./controllers/*.ts"]
};

const config: tsj.Config = {
  path: "./types/**.ts",
  type: "*",
};

const schema = tsj.createGenerator(config).createSchema(config.type);

const openapiSpecification = {
  ...swaggerJSDoc(options),
  definitions: schema.definitions,
};

console.log(openapiSpecification);

export default openapiSpecification;