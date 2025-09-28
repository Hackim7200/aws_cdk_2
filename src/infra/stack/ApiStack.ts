import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  helloLambdaIntegration: LambdaIntegration; // helloLambda will be passed to it
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "spacesApi"); //create a rest api named spacesApi
    const spacesResource = api.root.addResource("spaces");
    spacesResource.addMethod("GET", props.helloLambdaIntegration); // when get is done the hello lambda function will be called
  }
}
