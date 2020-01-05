# Formula Dialogflow Config
This directory contains 2 separate components of the formula dialogflow API: the agent and the fulfillment API.

## Agent: "formula-chat-dev"
A JSON representation of the chat-bot (aka "agent") deployed to Dialogflow.

### Upload and Test changes to formula-chat
- `git clone` this repository
- create/modify intent in `/dialogflow-agent/intents/`
- Zip `/dialogflow-agent` repository and upload file to `Export and Import` tab under the "formula-chat-dev" agent.
- Check for errors, reload browser

## Fulfillment API
- Copy and paste contents of `/functions/index.js`
- Deploy application via Fulfillment tab
- To save changes for the future, open PR and submit changes for review
