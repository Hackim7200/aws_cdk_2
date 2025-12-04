import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

interface LambdaStackProps extends StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly reservationLambdaIntegration: LambdaIntegration;
  public readonly moviesLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const ReservationLambda = new NodejsFunction(this, "ReservationLambda", {
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      entry: join(
        __dirname,
        "..",
        "..",
        "services",
        "reservation",
        "handler.ts"
      ),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
    });
    //To list the buckets you need to change IAM permission for lambda to access s3

    this.reservationLambdaIntegration = new LambdaIntegration(
      ReservationLambda
    );

    // Add your movies lambda here
    const MoviesLambda = new NodejsFunction(this, "MoviesLambda", {
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "movies", "handler.ts"),
      environment: {
        TABLE_NAME: props.spacesTable.tableName, // or a different table if needed
      },
    });
    //Add IAM permission to the MoviesLambda to access the DynamoDB table
    MoviesLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.spacesTable.tableArn],
        actions: ["dynamodb:PutItem"],
      })
    );

    this.moviesLambdaIntegration = new LambdaIntegration(MoviesLambda);
  }
}
