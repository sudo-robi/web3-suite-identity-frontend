import { useState, useEffect } from 'react';
import { Plus, Search, ArrowRightLeft, Trash2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { Loading } from '../components/common/Loading';
import { useWallet } from '../hooks/useWallet';
import { didService } from '../services/did.service';
import { DID } from '../types';

export function DIDManagement() {
  const { address } = useWallet();
  const [dids, setDids] = useState<DID[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newDoc, setNewDoc] = useState('');

  useEffect(() => {
    if (address) {
      loadDIDs();
    }
  }, [address]);

  const loadDIDs = async () => {
    setLoading(true);
    try {
      // In production, you'd fetch DIDs from an index endpoint
      // For now, we'll show mock data
      setDids([
        {
          did_id: 'abc123...',
          owner: address || '',
          document: 'https://example.com/did/1',
          created_at: Date.now() / 1000 - 86400,
          updated_at: Date.now() / 1000,
          active: true,
        },
      ]);
    } catch (error) {
      console.error('Failed to load DIDs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!address || !newDoc) return;
    setLoading(true);
    try {
      await didService.create(address, newDoc);
      setNewDoc('');
      setShowCreate(false);
      loadDIDs();
    } catch (error) {
      console.error('Failed to create DID:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">DID Management</h1>
          <p className="text-gray-400 mt-2">Create and manage your decentralized identifiers</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4" />
          Create DID
        </Button>
      </div>

      {showCreate && (
        <Card title="Create New DID">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                DID Document URL
              </label>
              <input
                type="text"
                value={newDoc}
                onChange={(e) => setNewDoc(e.target.value)}
                placeholder="https://example.com/did/your-document"
                className="w-full px-4 py-2 bg-surface-light border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-stellar-500"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate} loading={loading}>
                Create
              </Button>
              <Button variant="secondary" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {loading && <Loading text="Loading DIDs..." />}

      {!loading && dids.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-400">No DIDs found. Create your first DID to get started.</p>
        </Card>
      )}

      {!loading && dids.length > 0 && (
        <div className="space-y-4">
          {dids.map((did) => (
            <Card key={did.did_id}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-stellar-400">{did.did_id}</span>
                    <StatusBadge status={did.active ? 'active' : 'inactive'} />
                  </div>
                  <p className="text-xs text-gray-500">{did.document}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(did.created_at * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
