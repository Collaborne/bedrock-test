import AWS from 'aws-sdk';

import dotenv from 'dotenv';

dotenv.config();

// Configure the AWS SDK
const bedrock = new AWS.Bedrock({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function summarizeText(text: string): Promise<string> {
  const params = {
    Text: text,
    // Add other necessary parameters for the API call here
  };

  try {
    const response = await bedrock.summarizeText(params).promise();
    return response.Summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
}

(async () => {
  const text = "This is a sample string that needs to be summarized.";
  try {
    const summary = await summarizeText(text);
    console.log('Summary:', summary);
  } catch (error) {
    console.error('Failed to summarize text:', error);
  }
})();