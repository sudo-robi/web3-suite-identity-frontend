import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { DIDManagement } from './pages/DIDManagement';
import { CredentialWallet } from './pages/CredentialWallet';
import { KYCVerification } from './pages/KYCVerification';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/did" element={<DIDManagement />} />
          <Route path="/credentials" element={<CredentialWallet />} />
          <Route path="/kyc" element={<KYCVerification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
