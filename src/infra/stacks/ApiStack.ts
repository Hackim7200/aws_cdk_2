import { Stack, StackProps } from "aws-cdk-lib";
import { AuthorizationType, CognitoUserPoolsAuthorizer, Cors, LambdaIntegration, MethodOptions, ResourceOptions, RestApi } from "aws-cdk-lib/aws-apigateway";
import { AllowedMethods } from "aws-cdk-lib/aws-cloudfront";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  reservationLambdaIntegration: LambdaIntegration; // helloLambda will be passed to it
  moviesLambdaIntegration: LambdaIntegration; // Add this
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);


    const api = new RestApi(this, "SpacesApi"); //create a rest api named spacesApi

    const autherizer = new CognitoUserPoolsAuthorizer(this,"SpacesApiAuthorizer", {cognitoUserPools:[props.userPool],
      identitySource: "method.request.header.Authorization",
    });
    autherizer._attachToApi(api);

    const optionsWithAuth: MethodOptions = { // when this is passed with the lambda integration it will automatically authenticate the request befire responding
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: autherizer.authorizerId,
      },
    };

    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions:{
        allowOrigins:Cors.ALL_ORIGINS,
        allowMethods:Cors.ALL_METHODS
      }
    }
    const spacesResource = api.root.addResource("reservation",optionsWithCors); // adds the path /reservaitons to the api gateway
    spacesResource.addMethod("GET", props.reservationLambdaIntegration); // adds a GET method to the spaces path
    spacesResource.addMethod("POST", props.reservationLambdaIntegration); // adds a POST method to the spaces path

    const moviesResource = api.root.addResource("movies",optionsWithCors );
    moviesResource.addMethod("GET", props.moviesLambdaIntegration,optionsWithAuth);
    moviesResource.addMethod("POST", props.moviesLambdaIntegration,optionsWithAuth);
    moviesResource.addMethod("PUT", props.moviesLambdaIntegration,optionsWithAuth);
    moviesResource.addMethod("DELETE", props.moviesLambdaIntegration,optionsWithAuth);
  }
}
