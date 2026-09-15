import { useState, useEffect } from 'react';
import { Plus, Check, X, Eye } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { Loading } from '../components/common/Loading';
import { useWallet } from '../hooks/useWallet';
import { credentialService } from '../services/credential.service';
import { Credential } from '../types';

export function CredentialWallet() {
  const { address } = useWallet();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  useEffect(() => {
    if (address) {
      loadCredentials();
    }
  }, [address]);

  const loadCredentials = async () => {
    setLoading(true);
    try {
      // Mock data for demo
      setCredentials([
        {
          credential_id: 'cred123...',
          issuer: 'GBX...EXAMPLE',
          subject: address || '',
          credential_type: 'ProofOfIdentity',
          claims: '{"name": "Alice", "dob": "1990-01-01"}',
          issued_at: Date.now() / 1000 - 86400 * 30,
          expires_at: Date.now() / 1000 + 86400 * 335,
          revoked: false,
          signature: 'sig...',
        },
      ]);
    } catch (error) {
      console.error('Failed to load credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (credId: string) => {
    try {
      const result = await credentialService.verify(credId);
      alert(result.data?.valid ? 'Credential is valid!' : 'Credential is invalid!');
    } catch (error) {
      console.error('Failed to verify credential:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Credential Wallet</h1>
        <p className="text-gray-400 mt-2">View and manage your verifiable credentials</p>
      </div>

      {loading && <Loading text="Loading credentials..." />}

      {!loading && credentials.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-400">No credentials found in your wallet.</p>
        </Card>
      )}

      {!loading && credentials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {credentials.map((cred) => (
            <Card key={cred.credential_id} className="relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{cred.credential_type}</span>
                  <StatusBadge status={cred.revoked ? 'inactive' : 'active'} />
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">
                    <span className="text-gray-500">Issuer:</span>{' '}
                    <span className="font-mono text-xs">{cred.issuer.slice(0, 12)}...</span>
                  </p>
                  <p className="text-gray-400">
                    <span className="text-gray-500">Issued:</span>{' '}
                    {new Date(cred.issued_at * 1000).toLocaleDateString()}
                  </p>
                  {cred.expires_at && (
                    <p className="text-gray-400">
                      <span className="text-gray-500">Expires:</span>{' '}
                      {new Date(cred.expires_at * 1000).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="secondary" onClick={() => setSelectedCred(cred)}>
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button size="sm" onClick={() => handleVerify(cred.credential_id)}>
                    <Check className="w-4 h-4" />
                    Verify
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedCred && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Credential Details</h3>
              <button onClick={() => setSelectedCred(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <p className="text-white">{selectedCred.credential_type}</p>
              </div>
              <div>
                <p className="text-gray-500">Claims</p>
                <pre className="bg-surface-light p-2 rounded text-xs text-gray-300 overflow-auto">
                  {JSON.stringify(JSON.parse(selectedCred.claims), null, 2)}
                </pre>
              </div>
              <div>
                <p className="text-gray-500">Credential ID</p>
                <p className="font-mono text-xs text-stellar-400">{selectedCred.credential_id}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
