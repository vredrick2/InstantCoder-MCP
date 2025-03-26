import { useState, useEffect } from 'react';
import { ServerSelector } from './ServerSelector';
import { ServerConnectionModal } from './ServerConnectionModal';
import { useMCPServerStore, MCPServer } from '@/services/mcpServerStore';

interface MCPIntegrationProps {
  onServerConnect: (connected: boolean, serverUrl?: string) => void;
}

export function MCPIntegration({ onServerConnect }: MCPIntegrationProps) {
  const { servers, activeServerId } = useMCPServerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverToEdit, setServerToEdit] = useState<MCPServer | undefined>(undefined);

  // Find the active server when activeServerId changes
  useEffect(() => {
    if (activeServerId) {
      const server = servers.find(s => s.id === activeServerId);
      if (server) {
        onServerConnect(server.isConnected, server.url);
      }
    } else {
      onServerConnect(false);
    }
  }, [activeServerId, servers, onServerConnect]);

  const handleServerConnect = (connected: boolean, serverUrl?: string) => {
    onServerConnect(connected, serverUrl);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">MCP Server Connection</h3>
        <div className="flex items-center gap-2">
          <ServerSelector 
            onServerConnect={handleServerConnect}
            onEditServer={(server) => {
              setServerToEdit(server);
              setIsModalOpen(true);
            }}
            onAddServer={() => {
              setServerToEdit(undefined);
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      {activeServerId && (
        <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-4">
          <p className="text-sm">
            {servers.find(s => s.id === activeServerId)?.isConnected 
              ? "✅ Connected to MCP server" 
              : "❌ Not connected to MCP server"}
          </p>
        </div>
      )}

      <ServerConnectionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        serverToEdit={serverToEdit}
      />
    </div>
  );
}
