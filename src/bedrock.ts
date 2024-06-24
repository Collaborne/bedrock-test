import { Credentials } from '@aws-sdk/client-sts';
import { Bedrock } from '@langchain/community/llms/bedrock';

export async function createBedrockModel(credentials: Credentials, options: {
	model: string;
	region: string;
}) {
	return new Bedrock({
		model: options.model,
		region: options.region,
		credentials: {
			accessKeyId: credentials.AccessKeyId!,
			secretAccessKey: credentials.SecretAccessKey!,
			sessionToken: credentials.SessionToken!,
		},
	});
}