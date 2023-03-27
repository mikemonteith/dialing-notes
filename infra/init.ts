#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WebAppStack } from './stack';

const app = new cdk.App();
new WebAppStack(app, 'WebAppStack', {
  env: {
    account: '488860341912',
    region: 'eu-west-1'
  },
});
