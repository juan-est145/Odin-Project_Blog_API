import TJS from "typescript-json-schema";
import swaggerJSDoc, { OAS3Options, } from "swagger-jsdoc";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const settings: TJS.PartialArgs = {
  required: true,
};

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};

const typesDir = path.resolve(__dirname, "./types");
const typeFiles = fs.readdirSync(typesDir).filter((file) => file.endsWith(".ts")).map(file => path.join(typesDir, file));
const program = TJS.getProgramFromFiles(typeFiles, compilerOptions);
const schemas = TJS.generateSchema(program, "*")?.definitions;
const openapiSpecification = {
  ...swaggerJSDoc(options),
  definitions: schemas,
};

export default openapiSpecification;