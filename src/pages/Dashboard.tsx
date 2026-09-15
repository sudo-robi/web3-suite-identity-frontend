import { useState, useEffect } from 'react';
import { Shield, CreditCard, FileCheck, TrendingUp } from 'lucide-react';
import { Card } from '../components/common/Card';
import { useWallet } from '../hooks/useWallet';
import { didService } from '../services/did.service';
import { credentialService } from '../services/credential.service';
import { kycService } from '../services/kyc.service';

export function Dashboard() {
  const { address, connected } = useWallet();
  const [stats, setStats] = useState({
    dids: 0,
    credentials: 0,
    kycStatus: 'Unknown',
  });

  useEffect(() => {
    if (connected && address) {
      loadStats();
    }
  }, [connected, address]);

  const loadStats = async () => {
    try {
      // In a real app, you'd fetch actual counts
      // This is a demo with mock data
      setStats({
        dids: 2,
        credentials: 5,
        kycStatus: 'Enhanced',
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const statCards = [
    { label: 'Your DIDs', value: stats.dids, icon: Shield, color: 'text-stellar-500' },
    { label: 'Credentials', value: stats.credentials, icon: CreditCard, color: 'text-purple-500' },
    { label: 'KYC Level', value: stats.kycStatus, icon: FileCheck, color: 'text-green-500' },
    { label: 'Network', value: 'Testnet', icon: TrendingUp, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Manage your decentralized identity on Stellar
        </p>
      </div>

      {!connected ? (
        <Card className="text-center py-12">
          <Shield className="w-16 h-16 text-stellar-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 mb-6">
            Connect your Freighter wallet to manage your identity
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-surface-light ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Recent Activity">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
                  <span className="text-sm text-gray-300">DID Created</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
                  <span className="text-sm text-gray-300">Credential Issued</span>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
                  <span className="text-sm text-gray-300">KYC Approved</span>
                  <span className="text-xs text-gray-500">3 days ago</span>
                </div>
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="space-y-3">
                <a
                  href="/did"
                  className="flex items-center gap-3 p-3 bg-surface-light rounded-lg hover:bg-stellar-500/20 transition-colors"
                >
                  <Shield className="w-5 h-5 text-stellar-500" />
                  <span className="text-sm text-gray-300">Create New DID</span>
                </a>
                <a
                  href="/credentials"
                  className="flex items-center gap-3 p-3 bg-surface-light rounded-lg hover:bg-purple-500/20 transition-colors"
                >
                  <CreditCard className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-300">Issue Credential</span>
                </a>
                <a
                  href="/kyc"
                  className="flex items-center gap-3 p-3 bg-surface-light rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  <FileCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-300">Submit KYC</span>
                </a>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
