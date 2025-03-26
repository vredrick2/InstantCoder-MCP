import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useMCPServerStore, MCPServer } from '@/services/mcpServerStore';

interface ServerConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serverToEdit?: MCPServer;
}

export function ServerConnectionModal({ 
  open, 
  onOpenChange,
  serverToEdit
}: ServerConnectionModalProps) {
  const { addServer, updateServer } = useMCPServerStore();
  
  const [formData, setFormData] = useState<{
    name: string;
    url: string;
    authType: 'none' | 'oauth' | 'token';
    token?: string;
  }>({
    name: serverToEdit?.name || '',
    url: serverToEdit?.url || '',
    authType: serverToEdit?.authType || 'none',
    token: serverToEdit?.authData?.token || '',
  });
  
  const handleSubmit = () => {
    if (serverToEdit) {
      updateServer(serverToEdit.id, {
        name: formData.name,
        url: formData.url,
        authType: formData.authType,
        authData: formData.authType === 'token' ? { token: formData.token } : undefined
      });
    } else {
      addServer({
        name: formData.name,
        url: formData.url,
        authType: formData.authType,
        authData: formData.authType === 'token' ? { token: formData.token } : undefined
      });
    }
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {serverToEdit ? 'Edit MCP Server' : 'Add MCP Server'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="col-span-3"
              placeholder="My MCP Server"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">URL</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="col-span-3"
              placeholder="https://example.com/mcp"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Auth Type</Label>
            <RadioGroup
              value={formData.authType}
              onValueChange={(value) => setFormData({
                ...formData, 
                authType: value as 'none' | 'oauth' | 'token'
              })}
              className="col-span-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="auth-none" />
                <Label htmlFor="auth-none">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="token" id="auth-token" />
                <Label htmlFor="auth-token">API Token</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oauth" id="auth-oauth" disabled />
                <Label htmlFor="auth-oauth" className="opacity-50">OAuth (Coming Soon)</Label>
              </div>
            </RadioGroup>
          </div>
          
          {formData.authType === 'token' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token" className="text-right">Token</Label>
              <Input
                id="token"
                value={formData.token || ''}
                onChange={(e) => setFormData({...formData, token: e.target.value})}
                className="col-span-3"
                type="password"
                placeholder="Your API token"
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {serverToEdit ? 'Save Changes' : 'Add Server'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
