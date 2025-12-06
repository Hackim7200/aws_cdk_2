import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function getMovies(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {


  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME, //this is defined in the LambdaStack.ts file
    })
  );
  console.log(result.Items);
  return {
    statusCode: 201,
    body: JSON.stringify({ movies: result.Items }), //returns the id of the item that was created
  };
}
