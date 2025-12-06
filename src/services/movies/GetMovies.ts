import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function getMovies(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      const moviesId = event.queryStringParameters["id"];
      const getItemResponse = await ddbClient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: moviesId },
          },
        })
      );

      if (getItemResponse.Item) {
        const unmarshalledItem = unmarshall(getItemResponse.Item);
        return {
          statusCode: 200,
          body: JSON.stringify(unmarshalledItem),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "Movie not found with id: " + moviesId,
          }),
        };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify("Please provide an id"),
      };
    }
  }

  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME, //this is defined in the LambdaStack.ts file
    })
  );
  const unmarshalledItems = result.Items?.map((item) => unmarshall(item));
  console.log(unmarshalledItems);
  return {
    statusCode: 201,
    body: JSON.stringify(unmarshalledItems), //returns the id of the item that was created
  };
}
