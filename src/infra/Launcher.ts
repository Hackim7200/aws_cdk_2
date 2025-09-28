import { App } from "aws-cdk-lib";
import { DataStack } from "./stack/DataStack";
import { LambdaStack } from "./stack/LambdaStack";
import { ApiStack } from "./stack/ApiStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  spacesTable: dataStack.spacesTable,
});
new ApiStack(app, "ApiStack", {
  helloLambdaIntegration: lambdaStack.helloLambdaIntegration,
});
