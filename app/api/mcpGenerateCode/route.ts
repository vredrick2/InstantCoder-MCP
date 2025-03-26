import { NextRequest } from 'next/server';
import { MCPClientService } from '@/services/mcpClient';

export async function POST(req: NextRequest) {
  const json = await req.json();
  
  // Validate request
  if (!json.serverUrl || !json.prompt) {
    return new Response(JSON.stringify({ error: 'Missing serverUrl or prompt' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Create and connect MCP client
    const mcpClient = new MCPClientService(json.serverUrl);
    const connected = await mcpClient.connect();
    
    if (!connected) {
      return new Response(JSON.stringify({ error: 'Failed to connect to MCP server' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate code using MCP server
    const codeStream = await mcpClient.generateCode(json.prompt);
    
    // Return the stream
    return new Response(codeStream);
  } catch (error) {
    console.error('Error in MCP code generation:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const runtime = "edge";
