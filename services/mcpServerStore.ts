import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MCPServer {
  id: string;
  name: string;
  url: string;
  authType: 'none' | 'oauth' | 'token';
  authData?: {
    token?: string;
    clientId?: string;
    clientSecret?: string;
  };
  isConnected: boolean;
}

interface MCPServerState {
  servers: MCPServer[];
  activeServerId: string | null;
  addServer: (server: Omit<MCPServer, 'id' | 'isConnected'>) => void;
  updateServer: (id: string, updates: Partial<MCPServer>) => void;
  removeServer: (id: string) => void;
  setActiveServer: (id: string | null) => void;
  setServerConnectionStatus: (id: string, isConnected: boolean) => void;
}

export const useMCPServerStore = create<MCPServerState>()(
  persist(
    (set) => ({
      servers: [],
      activeServerId: null,
      
      addServer: (server) => set((state) => ({
        servers: [...state.servers, { 
          ...server, 
          id: crypto.randomUUID(),
          isConnected: false
        }]
      })),
      
      updateServer: (id, updates) => set((state) => ({
        servers: state.servers.map(server => 
          server.id === id ? { ...server, ...updates } : server
        )
      })),
      
      removeServer: (id) => set((state) => ({
        servers: state.servers.filter(server => server.id !== id),
        activeServerId: state.activeServerId === id ? null : state.activeServerId
      })),
      
      setActiveServer: (id) => set({ activeServerId: id }),
      
      setServerConnectionStatus: (id, isConnected) => set((state) => ({
        servers: state.servers.map(server => 
          server.id === id ? { ...server, isConnected } : server
        )
      }))
    }),
    {
      name: 'mcp-servers-storage'
    }
  )
);
