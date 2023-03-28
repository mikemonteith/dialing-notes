#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WebAppStack } from './web-app-stack';
import { CertificateStack } from './certificate-stack';

const app = new cdk.App();

const accountId = '488860341912'

const tags = {
  project: 'Dialing Notes'
}

// The certificate must be in us-east-1 for use with cloudfront
const certificateStack = new CertificateStack(app, 'DialingNotesCertificate', {
  env: {
    account: accountId,
    region: 'us-east-1'
  },
  crossRegionReferences: true,
  tags,
})

new WebAppStack(app, 'DialingNotesWebApp', {
  env: {
    account: accountId,
    region: 'eu-west-1'
  },
  crossRegionReferences: true,
  certificateArn: certificateStack.certificateArn,
  zoneId: certificateStack.zoneId,
  zoneName: certificateStack.zoneName,
  tags,
});
