import { useState } from 'react';
import { PlusCircle, Server, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { useMCPServerStore } from '@/services/mcpServerStore';
import { MCPClientService } from '@/services/mcpClient';

interface ServerSelectorProps {
  onServerConnect: (connected: boolean, serverUrl?: string) => void;
}

export function ServerSelector({ onServerConnect }: ServerSelectorProps) {
  const { servers, activeServerId, setActiveServer, removeServer, setServerConnectionStatus } = useMCPServerStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [serverToEdit, setServerToEdit] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleServerSelect = async (serverId: string) => {
    setActiveServer(serverId);
    
    // Connect to the selected server
    const server = servers.find(s => s.id === serverId);
    if (server) {
      setIsConnecting(true);
      try {
        const mcpClient = new MCPClientService(server.url);
        const connected = await mcpClient.connect();
        setServerConnectionStatus(serverId, connected);
        onServerConnect(connected, server.url);
      } catch (error) {
        console.error("Failed to connect to server:", error);
        setServerConnectionStatus(serverId, false);
        onServerConnect(false);
      } finally {
        setIsConnecting(false);
      }
    }
  };
  
  const handleEditServer = (serverId: string) => {
    setServerToEdit(serverId);
    setIsAddModalOpen(true);
  };
  
  const handleDeleteServer = (serverId: string) => {
    removeServer(serverId);
  };
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Select
          value={activeServerId || ''}
          onValueChange={handleServerSelect}
          disabled={isConnecting}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select MCP Server" />
          </SelectTrigger>
          <SelectContent>
            {servers.map(server => (
              <SelectItem key={server.id} value={server.id}>
                <div className="flex items-center gap-2">
                  <Server className={`h-4 w-4 ${server.isConnected ? 'text-green-500' : 'text-gray-400'}`} />
                  <span>{server.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setServerToEdit(null);
            setIsAddModalOpen(true);
          }}
          title="Add MCP Server"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
        
        {activeServerId && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEditServer(activeServerId)}
              title="Edit Server"
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDeleteServer(activeServerId)}
              title="Remove Server"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      {/* We'll implement the ServerConnectionModal in a separate file */}
    </div>
  );
}
