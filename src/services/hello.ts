import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { v4 } from "uuid";

const s3Client = new S3Client({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const command = new ListBucketsCommand({});
  //To list the buckets you need to change IAM permission for lambda to access s3
  const listBucketsResponse = (await s3Client.send(command)).Buckets;

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(
      "I have this many buckets: " + JSON.stringify(listBucketsResponse)
    ),
  };
  console.log(event);

  return response;
}
export { handler };
