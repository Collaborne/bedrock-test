import {
	BedrockRuntimeClient,
	InvokeModelCommand,
	InvokeModelCommandOutput
} from "@aws-sdk/client-bedrock-runtime";

interface Options {
	modelId: string;
}

function composeRequest(text: string, options: Options): InvokeModelCommand {
	const requestBody = {
		anthropic_version: 'bedrock-2023-05-31',
		max_tokens: 1000,
		messages: [{
			role: 'user',
			content: [{ type: 'text', text }]
		}]
	};
	const command = new InvokeModelCommand({
		modelId: options?.modelId,
		body: JSON.stringify(requestBody),
		accept: 'application/json',
		contentType: 'application/json',
	});

	return command;
}

function parseResponse(response: InvokeModelCommandOutput) {
	const buffer = Buffer.from(response.body);
	const responseText = buffer.toString();
	const responseData = JSON.parse(responseText);
	return responseData.content[0].text;
}

/**
 * Helper to access bedrock
 * This abstracts away the details of how the Bedrock API is called and how the response is processed.
 *
 * TODO: Could this be replaced with langchain?
 */
export function createBedrock(awsBedrockClient: BedrockRuntimeClient, options: Options) {
	const call = async (text: string): Promise < string > => {
		try {
			const command = composeRequest(text, options);
			const response = await awsBedrockClient.send(command);
			return parseResponse(response);
		} catch (error) {
			console.error('Error summarizing text:', error);
			throw error;
		}
	}

	return { call };
}