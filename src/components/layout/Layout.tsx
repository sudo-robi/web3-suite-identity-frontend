import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, CreditCard, FileCheck, LayoutDashboard } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { Button } from '../common/Button';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/did', label: 'DIDs', icon: Shield },
  { path: '/credentials', label: 'Credentials', icon: CreditCard },
  { path: '/kyc', label: 'KYC', icon: FileCheck },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { connected, address, connect, disconnect } = useWallet();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-gray-800 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-stellar-500">Web3 Identity</h1>
          <p className="text-xs text-gray-500">Stellar Suite</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-stellar-500/20 text-stellar-400'
                    : 'text-gray-400 hover:bg-surface-light hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connection */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          {connected ? (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 truncate" title={address || ''}>
                {address?.slice(0, 8)}...{address?.slice(-8)}
              </p>
              <Button variant="secondary" size="sm" onClick={disconnect} className="w-full">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={connect} className="w-full">
              Connect Wallet
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
