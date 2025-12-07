import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postMovies } from "./PostMovies";
import { getMovies } from "./GetMovies";
import { updateMovies } from "./UpdateMovies";
import { deleteMovies } from "./DeleteMovies";

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getMovies(event, ddbClient);
        console.log(getResponse);
        return getResponse;

      case "POST":
        const postResponse = await postMovies(event, ddbClient);
        return postResponse;

      case "PUT":
        const putResponse = await updateMovies(event, ddbClient);
        return putResponse;

      case "DELETE":
        const deleteResponse = await deleteMovies(event, ddbClient);
        return deleteResponse;

      default:
        message = "Hello from movies default";
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  return response;
}

export { handler };
