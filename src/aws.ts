import {
    BedrockRuntimeClient
} from '@aws-sdk/client-bedrock-runtime';
import {
    STSClient,
    AssumeRoleCommand
} from '@aws-sdk/client-sts';

async function assumeRole() {
    const stsClient = new STSClient({
        region: 'eu-west-1',
    });
    const params = {
        RoleArn: 'arn:aws:iam::996672920125:role/AccessToBedrockVivan',
        RoleSessionName: 'bedrockInvokeSession'
    };

    try {
        const command = new AssumeRoleCommand(params);
        const response = await stsClient.send(command);

        if (!response.Credentials) {
            throw new Error(`Didn't receive credentials`);
        }

        return response.Credentials;
    } catch (error) {
        console.error('Error assuming role:', error);
        throw error;
    }
}

/**
 * Create an AWS bedrock client that is connected via STS assume-role
 */
export async function initAWSBedrockClient() {
    const credentials = await assumeRole();
    const bedrock = new BedrockRuntimeClient({
        // Ensure we pick a region where the model are available
        region: 'us-east-1',
        credentials: {
            accessKeyId: credentials.AccessKeyId!,
            secretAccessKey: credentials.SecretAccessKey!,
            sessionToken: credentials.SessionToken!,
        },
    });
    return bedrock;
}