import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../utils";
import { join } from "path";
import { existsSync } from "fs";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import {
  AccessLevel,
  Distribution,
  OriginAccessIdentity,
} from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin, S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";

export class UiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);
    //this s3 could be created in the DataStack but this is done to avoid circular dep

    //here you create a s3 bucket
    const deploymentBucket = new Bucket(this, "uiDeploymentBucket", {
      bucketName: `example-2-frontend`,
    });

    const uiDir = join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "example-2-frontend",
      "dist"
    );
    //if dist folder doesnt exist dont procede
    if (!existsSync(uiDir)) {
      console.warn("Ui dir not found:" + uiDir);
      return;
    }

    // you provide path to the file you want to deploy
    new BucketDeployment(this, "Example2Deployment", {
      destinationBucket: deploymentBucket,
      sources: [Source.asset(uiDir)],
    });

    // this setup allows our distribution bucket to read from our deployment bucket
    const originIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    deploymentBucket.grantRead(originIdentity);

    const s3Origin = S3BucketOrigin.withOriginAccessControl(deploymentBucket, {
      originAccessLevels: [AccessLevel.READ],
    });

    const distribution = new Distribution(this, "Example2Distribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: s3Origin,
      },
    });

    new CfnOutput(this, "ExampleUrl", {
      value: distribution.distributionDomainName,
    });
  }
}
