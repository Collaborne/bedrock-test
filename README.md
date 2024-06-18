# bedrock-test

## Set up AWS profile

1. Look up in your AWS console the access key.
2. Create AWS profile `development` to access AWS (replace `KEY_ID` and `ACCESS_KEY` with the values from the AWS console):
	```sh
	echo "[development] \
	aws_access_key_id=KEY_ID \
	aws_secret_access_key=ACCESS_KEY" > ~/.aws/credentials-test
	```

## Installation

Install all dependencies:
```sh
npm ci
```

## Usage

Run the tool via:
```sh
AWS_PROFILE=development npm run start
```

This will generate output like:
```sh
Summary: The South Korean government is launching a new "K-Culture Training Visa" to attract foreign nationals who wish to train in K-pop dancing, choreography, and modeling, as part of its efforts to revive the country's tourism industry to pre-pandemic levels.
```
