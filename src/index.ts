import { Bedrock } from '@langchain/community/llms/bedrock';
import dotenv from 'dotenv';
import { assumeRole } from './aws';
import { loadSummarizationChain } from 'langchain/chains';

import { Document } from "langchain/document";


dotenv.config();

const SAMPLE_TEXT = `
South Korea will soon launch a new visa for foreign nationals who dream of training like a K-pop idol, in a bid to boost its tourism industry back to pre-pandemic levels.

The “K-Culture Training Visa” will be open to foreigners who want to train in K-pop dancing, choreography and modeling, the finance ministry announced on Monday.

Applicants don’t necessarily need to audition or have a callback offer from a talent agency – at least not yet – as more details are expected to come out later this year.
`;


const MODEL_ID = 'anthropic.claude-v2:1'; // 'anthropic.claude-3-haiku-20240307-v1:0';	

async function main() {
	try {
		const credentials = await assumeRole();
		const bedrockModel = new Bedrock({
			model: MODEL_ID,
			region: 'us-east-1',
			credentials: {
				accessKeyId: credentials.AccessKeyId!,
				secretAccessKey: credentials.SecretAccessKey!,
				sessionToken: credentials.SessionToken!,
			},
		})

		const inputDocuments = [
			new Document({ pageContent: `\n\nHuman: ${SAMPLE_TEXT}\n\nAssistant:` }),
		];

		const summarizationChain = loadSummarizationChain(bedrockModel);
		const summary = await summarizationChain.invoke({
			input_documents: inputDocuments,
		});

		console.log('Summary:', summary.text);
	} catch (error) {
		console.error('Failed to summarize text:', error);
	}
}

main();

