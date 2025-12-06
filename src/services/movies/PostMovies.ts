import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export async function postMovies(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = v4();
  const item = JSON.parse(event.body);

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME, //this is defined in the LambdaStack.ts file
      Item: {
        id: { S: randomId }, // these properties are defined in the DataStack.ts file that why we are porivding it
        title: { S: item.title },
        year: { N: item.year },
      },
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId }), //returns the id of the item that was created
  };
}
