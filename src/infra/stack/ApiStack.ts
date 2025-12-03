import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  reservationLambdaIntegration: LambdaIntegration; // helloLambda will be passed to it
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "spacesApi"); //create a rest api named spacesApi
    const spacesResource = api.root.addResource("reservation"); // adds the path /spaces to the api gateway
    spacesResource.addMethod("GET", props.reservationLambdaIntegration); // adds a GET method to the spaces path
    spacesResource.addMethod("POST", props.reservationLambdaIntegration); // adds a POST method to the spaces path
  }
}
