<h1 align="center">InstantCoder-MCP</h1>
<p align="center">
  Generate small apps with one prompt. Powered by the Gemini API and Model Context Protocol (MCP).
</p>

This project is a fork of [InstantCoder](https://github.com/osanseviero/InstantCoder) with added support for connecting to MCP servers as alternative code generation sources.

## Features

- **Dual Code Generation Sources**: Choose between Gemini API and MCP servers
- **MCP Server Management**: Add, edit, and connect to any MCP server
- **Beginner-Friendly Interface**: Simple UI for managing MCP connections
- **Real-time Code Generation**: Stream code generation results as they're created
- **Interactive Sandbox**: Test generated code immediately in a Sandpack environment

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to LLMs. It allows for a clean separation between LLM applications and the tools, resources, and prompts they use. Think of MCP like a USB-C port for AI applications - it provides a standardized way for AI applications to connect to various resources and tools.

## Tech stack

- [Gemini API](https://ai.google.dev/gemini-api/docs) to use Gemini 1.5 Pro, Gemini 1.5 Flash, and Gemini 2.0 Flash Experimental
- [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/typescript-sdk) for connecting to MCP servers
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Sandpack](https://sandpack.codesandbox.io/) for the code sandbox
- Next.js app router with Tailwind

## Cloning & running

1. Clone the repo: `git clone https://github.com/vredrick2/InstantCoder-MCP`
2. Create a `.env` file and add your [Google AI Studio API key](https://aistudio.google.com/app/apikey): `GOOGLE_AI_API_KEY=`
3. Run `npm install` and `npm run dev` to install dependencies and run locally

## Using MCP Servers

1. Click the "MCP Server" option in the main interface
2. Click the "+" button to add a new MCP server
3. Enter the server details:
   - Name: A friendly name for the server
   - URL: The full URL to the MCP server endpoint
   - Auth Type: None, API Token (OAuth coming soon)
4. Click "Add Server" to save the connection
5. Select the server from the dropdown to connect
6. Once connected, enter your prompt and generate code

## MCP Server Compatibility

This implementation is compatible with any MCP server that follows the Model Context Protocol specification. The integration will automatically detect and use code generation tools available on the connected server.

## Implementation Details

The MCP integration consists of several key components:

1. **MCP Client Service**: Core service for connecting to and interacting with MCP servers
2. **MCP Server Store**: State management for server configurations
3. **MCP API Endpoint**: Backend API for handling code generation requests
4. **UI Components**: User interface for managing MCP server connections

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the MCP integration.

## License

This project is licensed under the same terms as the original InstantCoder project.

**This is a personal project and not a Google official project**
