import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteMovies(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters && "id" in event.queryStringParameters) {
    const moviesId = event.queryStringParameters["id"]; // this is query string parameter which looks like: amazonaws.com/prod/movies?id=ad2e3dfb-bfef-48d7-8

    const deleteResult = await ddbClient.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: moviesId },
        },
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify(`Item ${moviesId} deleted successfully`), // attributes tells you what was updated
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Please provide right args!!" }),
  };
}
