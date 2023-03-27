#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WebAppStack } from './stack';

const app = new cdk.App();
new WebAppStack(app, 'DialingNotesWebApp', {
  env: {
    account: '488860341912',
    region: 'eu-west-1'
  },

  // Add project tags to every resource in the stack
  tags: {
    project: 'Dialing Notes'
  }
});
