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
- **Docker Support**: Easy deployment to cloud services like Railway

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to LLMs. It allows for a clean separation between LLM applications and the tools, resources, and prompts they use. Think of MCP like a USB-C port for AI applications - it provides a standardized way for AI applications to connect to various resources and tools.

## Tech stack

- [Gemini API](https://ai.google.dev/gemini-api/docs) to use Gemini 1.5 Pro, Gemini 1.5 Flash, and Gemini 2.0 Flash Experimental
- [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/typescript-sdk) for connecting to MCP servers
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Sandpack](https://sandpack.codesandbox.io/) for the code sandbox
- Next.js app router with Tailwind
- Docker for containerization and deployment

## Cloning & running

### Local Development

1. Clone the repo: `git clone https://github.com/vredrick2/InstantCoder-MCP`
2. Create a `.env` file and add your [Google AI Studio API key](https://aistudio.google.com/app/apikey): `GOOGLE_AI_API_KEY=`
3. Run `npm install` and `npm run dev` to install dependencies and run locally

### Using Docker

#### Prerequisites
- Docker and Docker Compose installed on your machine

#### Running with Docker Compose
1. Clone the repo: `git clone https://github.com/vredrick2/InstantCoder-MCP`
2. Create a `.env` file with your Google AI API key: `GOOGLE_AI_API_KEY=your_api_key_here`
3. Build and start the container:
   ```bash
   docker-compose up -d
   ```
4. Access the application at http://localhost:3000

#### Building and Running the Docker Image Directly
1. Build the Docker image:
   ```bash
   docker build -t instantcoder-mcp .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 -e GOOGLE_AI_API_KEY=your_api_key_here instantcoder-mcp
   ```
3. Access the application at http://localhost:3000

## Deploying to Railway

Railway is a platform that makes it easy to deploy applications with minimal configuration.

1. Fork this repository to your GitHub account
2. Sign up for [Railway](https://railway.app/)
3. Create a new project and select "Deploy from GitHub repo"
4. Connect your GitHub account and select the InstantCoder-MCP repository
5. Add the environment variable `GOOGLE_AI_API_KEY` with your Google AI API key
6. Railway will automatically detect the Dockerfile and deploy your application
7. Once deployed, Railway will provide you with a public URL to access your application

### Railway Deployment Notes

This project includes specific optimizations for Railway deployment:

1. **Database Configuration**: The Prisma setup is configured to work without requiring a database during the build process, which prevents build failures in Railway.

2. **Build Process**: The build script has been modified to separate Prisma client generation from database migrations, allowing successful builds even without a configured database.

3. **Environment Variables**:
   - `GOOGLE_AI_API_KEY` (required): Your Google AI API key for Gemini
   - `DATABASE_URL` (optional): If you add a PostgreSQL service in Railway, this will be automatically set

4. **Adding a Database (Optional)**:
   - To enable saving generated apps, add a PostgreSQL service in Railway
   - Railway will automatically connect the database to your application
   - The first time you deploy with a database, you may need to run migrations manually:
     ```bash
     railway run npm run migrate
     ```

5. **Troubleshooting**:
   - If you encounter build issues, check that your `GOOGLE_AI_API_KEY` is correctly set
   - For database-related errors, verify that your PostgreSQL service is properly provisioned

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
