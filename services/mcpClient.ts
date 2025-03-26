import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

export class MCPClientService {
  private client: Client;
  private transport: SSEClientTransport | null = null;
  private serverUrl: string;
  private connected: boolean = false;
  
  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
    this.client = new Client({
      name: "InstantCoder",
      version: "1.0.0",
      capabilities: {
        // Define capabilities needed for code generation
        tools: true,
        prompts: true
      }
    });
  }
  
  async connect(): Promise<boolean> {
    try {
      this.transport = new SSEClientTransport(new URL(this.serverUrl));
      await this.client.connect(this.transport);
      this.connected = true;
      return true;
    } catch (error) {
      console.error("Failed to connect to MCP server:", error);
      this.connected = false;
      return false;
    }
  }
  
  async disconnect(): Promise<void> {
    if (this.transport) {
      await this.client.close();
      this.connected = false;
    }
  }
  
  async generateCode(prompt: string): Promise<ReadableStream<Uint8Array>> {
    if (!this.connected) {
      throw new Error("Not connected to MCP server");
    }
    
    // First check if the server has tools for code generation
    const tools = await this.client.listTools();
    const codeGenTool = tools.tools.find(tool => 
      tool.name.toLowerCase().includes("code") || 
      tool.name.toLowerCase().includes("generate")
    );
    
    if (codeGenTool) {
      // Use the code generation tool if available
      const result = await this.client.callTool(codeGenTool.name, { prompt });
      
      // Convert the result to a stream for compatibility with existing code
      return new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(result.content[0].text));
          controller.close();
        }
      });
    } else {
      // Fall back to using a completion if no specific tool is found
      const result = await this.client.complete({
        prompt: `Generate a React component based on this description: ${prompt}. 
                Use TypeScript and Tailwind CSS. Return only the code.`
      });
      
      return new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(result.text));
          controller.close();
        }
      });
    }
  }
  
  isConnected(): boolean {
    return this.connected;
  }
  
  getServerCapabilities() {
    return this.client.getServerCapabilities();
  }
  
  getServerInfo() {
    return this.client.getServerVersion();
  }
}
