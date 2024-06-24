import dotenv from 'dotenv';
import { assumeRole } from './aws';
import { createBedrockModel } from './bedrock';

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
		const bedrockModel = await createBedrockModel(credentials, {
			// Pick a region where the model is available
			region: 'us-east-1',
			model: MODEL_ID,
		});

		const prompt = `Human: Summarize the following text in one sentence\n\n${SAMPLE_TEXT}\nAssistant:`;
		const summary = await bedrockModel.invoke(prompt);

		console.log('Summary:', summary);
	} catch (error) {
		console.error('Failed to summarize text:', error);
	}
}

main();
