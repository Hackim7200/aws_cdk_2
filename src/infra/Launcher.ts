import { App } from "aws-cdk-lib";
import { DataStack } from "./stack/DataStack";
import { LambdaStack } from "./stack/LambdaStack";



const app = new App();
new DataStack(app, "DataStack");
new LambdaStack(app, "LambdaStack");