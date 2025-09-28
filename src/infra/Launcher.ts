import { App } from "aws-cdk-lib";
import { DataStack } from "./stack/DataStack";



const app = new App();
new DataStack(app, "DataStack");