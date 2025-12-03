import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message = "";
  switch (event.httpMethod) {
    case "POST":
      message = "Hello from reservations POST";
      break;
    case "GET":
      message = "Hello from reservations GET";
      break;
    default:
      message = "Hello from reservations default";
      break;
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  return response;
}
export { handler };
