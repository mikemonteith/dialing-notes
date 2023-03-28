import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager'
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53'
import { Fn } from 'aws-cdk-lib'

export class CertificateStack extends cdk.Stack {
  public readonly certificateArn: string

  public readonly zoneName: string
  public readonly zoneId: string

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const zone = new PublicHostedZone(this, 'HostedZone', {
      zoneName: 'dialingnotes.mikemonteith.com',
    })

    this.zoneName = zone.zoneName
    this.zoneId = zone.hostedZoneId

    const certificate = new Certificate(this, 'Certificate', {
      domainName: 'dialingnotes.mikemonteith.com',
      validation: CertificateValidation.fromDns(zone),
    })

    this.certificateArn = certificate.certificateArn

    new cdk.CfnOutput(this, 'Route53ZoneNameServersOutput', {
      value: Fn.join(',', zone.hostedZoneNameServers!),
      exportName: 'Route53ZoneNameServers',
    })

    new cdk.CfnOutput(this, "CertificateArn", {
      value: certificate.certificateArn,
    });
  }
}
