import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdAwsPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'myPipeline', {
      pipelineName: 'myPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('alwinseb01/ci-cd-aws-pipeline', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
        // primaryOutputDirectory: 'cdk.out',
      }),
    });
  }
}
