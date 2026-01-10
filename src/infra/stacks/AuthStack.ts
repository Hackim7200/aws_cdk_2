import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { CfnUserPoolGroup, UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class AuthStack extends Stack {
  public userPool: UserPool;
  private userPoolClient: UserPoolClient;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createUserPool();
    this.createUserPoolClient();
    this.createAdminsGroup();
  }
  private createUserPool() {
    // a user pool shouldnt exist without a client
    this.userPool = new UserPool(this, "MoviesUserPool", {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
    });
    // output the user pool id for the user pool
    new CfnOutput(this, "UserPoolId", {
      value: this.userPool.userPoolId,
    });
  }
  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient("MoviesUserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
    });
    // output the user pool client id for the user pool client
    new CfnOutput(this, "MoviesUserPoolClientId", {
      value: this.userPoolClient.userPoolClientId,
    });
  }


  // this can be used to create degrees of security i.e normal user can login but not delete only admin users can delete items
  // this would add a groups in the client userpool group called admin
  // you can use the Ui to add users to a group manually
  private createAdminsGroup() {
    new CfnUserPoolGroup(this, 'SpacesAdmins', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'admins',
    });
  }

}
