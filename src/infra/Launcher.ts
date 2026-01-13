import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  moviesTable: dataStack.spacesTable,
});

const authStack = new AuthStack(app, "AuthStack");

const apiStack = new ApiStack(app, "ApiStack", {
  reservationLambdaIntegration: lambdaStack.reservationLambdaIntegration,
  moviesLambdaIntegration: lambdaStack.moviesLambdaIntegration,
  userPool: authStack.userPool,
});

const uiStack = new UiDeploymentStack(app,"UiDeploymentStack")
