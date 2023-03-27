import * as path from 'path'

import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

export class WebAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity');
    bucket.grantRead(originAccessIdentity)

    const urlRewriteFunction = new cloudfront.experimental.EdgeFunction(this, 'UrlRewriteLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = (event, context, callback) => {
          const { request } = event.Records[0].cf
          const { uri } = request

          if (uri.endsWith('/')) {
            // The URI is missing a file name.
            request.uri += 'index.html'
          } else if (!uri.includes('.')) {
            // Check whether the URI is missing a file extension.
            request.uri += '/index.html'
          }
          callback(null, request)
        }
      `)
    })

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'WebsiteDistribution', {
      defaultRootObject: 'index.html',
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity,
          },
          behaviors: [{
            isDefaultBehavior: true,
            lambdaFunctionAssociations: [
              {
                eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
                lambdaFunction: urlRewriteFunction.currentVersion,
              },
            ],
          }],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          responseCode: 404,
          responsePagePath: '/404.html',
        },
      ],
    })

    new cdk.CfnOutput(this, 'WebsiteBucketNameOutput', {
      value: bucket.bucketName,
      exportName: 'WebsiteBucketName',
    })

    new cdk.CfnOutput(this, 'WebsiteDistributionUrlOutput', {
      value: distribution.distributionDomainName,
      exportName: 'WebsiteDistributionUrl',
    })
  }
}
