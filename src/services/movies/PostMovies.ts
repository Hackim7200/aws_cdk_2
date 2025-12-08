import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { validateAsMovieEntry } from "../shared/Validator";
import { marshall } from "@aws-sdk/util-dynamodb";
import { parseJson } from "../shared/Utils";

export async function postMovies(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = v4();
  const item = parseJson(event.body);

  item.id = randomId; // this is required if its not provide the validator in /shared/Validator.ts will throw an error saying no id provided
  validateAsMovieEntry(item);

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME, //this is defined in the LambdaStack.ts file
      Item: marshall(item),
    })
  );

  // Item: {// this is the marshal format which the db understands and it needs to be provided like so
  //   id: { S: randomId }, // these properties are defined in the DataStack.ts file that why we are porivding it
  //   title: { S: item.title },
  //   year: { N: item.year },
  // },

  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId }), //returns the id of the item that was created
  };
}
