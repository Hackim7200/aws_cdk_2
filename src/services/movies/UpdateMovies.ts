import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateMovies(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (
    event.queryStringParameters &&
    "id" in event.queryStringParameters &&
    event.body
  ) {
    const parsedBody = JSON.parse(event.body);
    const moviesId = event.queryStringParameters["id"];
    const requestBodyKeys = Object.keys(parsedBody)[0]; //selecct the first item in the body
    const requestBodyValue = parsedBody[requestBodyKeys];

    const updateResult = await ddbClient.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: moviesId },
        },
        UpdateExpression: "set #zzzNew = :new", // this expression makes sure reserved key is not used
        // here you write the value that you want to update with what value you want to update it with
        ExpressionAttributeValues: {
          ":new": { S: requestBodyValue },
        },
        ExpressionAttributeNames: {
          "#zzzNew": requestBodyKeys,
        },
        ReturnValues: "UPDATED_NEW",
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify(unmarshall(updateResult.Attributes)), // attributes tells you what was updated
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Please provide right args!!" }),
  };
}
