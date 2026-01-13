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
import { JsonError, MissingFieldsError } from "../shared/Validator";
import { addCorsHeader } from "../shared/Utils";

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  

  let response: APIGatewayProxyResult;

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getMovies(event, ddbClient);
        response = getResponse;
        break;

      case "POST":
        const postResponse = await postMovies(event, ddbClient);
        response = postResponse;
        break;

      case "PUT":
        const putResponse = await updateMovies(event, ddbClient);
        response = putResponse;
        break;

      case "DELETE":
        const deleteResponse = await deleteMovies(event, ddbClient);
        response = deleteResponse;
        break;

      default:
        break;
    }
  } catch (error) {
    if (error instanceof MissingFieldsError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    return {
      statusCode: 500,
      body: error.message,
    };
  }

  addCorsHeader(response);

  return response;
}

export { handler };
