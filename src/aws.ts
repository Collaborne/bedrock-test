import {
	STSClient,
	AssumeRoleCommand
} from '@aws-sdk/client-sts';

export async function assumeRole() {
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
