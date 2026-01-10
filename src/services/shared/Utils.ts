import { APIGatewayProxyEvent } from "aws-lambda";
import { JsonError } from "./Validator";
import { Condition } from "aws-cdk-lib/aws-stepfunctions";
import { group } from "console";

export function parseJson(arg: any) {
  try {
    return JSON.parse(arg);
  } catch (error) {
    throw new JsonError(error.message);
  }
}


// this method is a simple function that check if its admin or not and can be used within lambda function
export function hasAdminGroup(event: APIGatewayProxyEvent){
  const groups = event.requestContext.authorizer?.claims['cognito:groups'];
  if(groups){
    return (groups as string).includes('admins');

  }
  return false

}