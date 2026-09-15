import { Link, useLocation } from 'react-router-dom';
import { Shield, CreditCard, FileCheck, LayoutDashboard } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { Button } from './common/Button';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/did', label: 'DIDs', icon: Shield },
  { path: '/credentials', label: 'Credentials', icon: CreditCard },
  { path: '/kyc', label: 'KYC', icon: FileCheck },
];

export function Header() {
  const location = useLocation();
  const { connected, address, connect, disconnect } = useWallet();

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7 text-stellar-500" />
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Web3 Identity</h1>
              <p className="text-[10px] text-gray-500 leading-none">Stellar Suite</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-stellar-500/20 text-stellar-400'
                      : 'text-gray-400 hover:bg-surface-light hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            {connected ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-mono hidden sm:block" title={address || ''}>
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <Button variant="secondary" size="sm" onClick={disconnect}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={connect}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
