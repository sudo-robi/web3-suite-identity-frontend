import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { Loading } from '../components/common/Loading';
import { useWallet } from '../hooks/useWallet';
import { kycService } from '../services/kyc.service';
import { KYCRecord, KYCLevel, KYCStatus } from '../types';

const levelNames = ['Unverified', 'Basic', 'Enhanced', 'Institutional'];

export function KYCVerification() {
  const { address } = useWallet();
  const [record, setRecord] = useState<KYCRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<KYCLevel>(KYCLevel.Basic);

  useEffect(() => {
    if (address) {
      loadKYCStatus();
    }
  }, [address]);

  const loadKYCStatus = async () => {
    setLoading(true);
    try {
      const result = await kycService.getStatus(address || '');
      setRecord(result.data || null);
    } catch (error) {
      // No KYC record found
      setRecord(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!address) return;
    setSubmitting(true);
    try {
      await kycService.submit(
        address,
        'did:stellar:placeholder',
        selectedLevel,
        'hash-' + Date.now()
      );
      loadKYCStatus();
    } catch (error) {
      console.error('Failed to submit KYC:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { label: 'Submit Application', done: !!record },
    { label: 'Under Review', done: record?.status === KYCStatus.Approved },
    { label: 'Verified', done: record?.status === KYCStatus.Approved },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">KYC Verification</h1>
        <p className="text-gray-400 mt-2">Verify your identity to access premium features</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.done
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-surface-light text-gray-500'
                  }`}
                >
                  {step.done ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span className="text-xs text-gray-400 mt-2">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-600 mx-4" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {loading && <Loading text="Loading KYC status..." />}

      {!loading && !record && (
        <Card title="Submit KYC Application">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Verification Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[KYCLevel.Basic, KYCLevel.Enhanced, KYCLevel.Institutional].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedLevel === level
                        ? 'border-stellar-500 bg-stellar-500/20 text-stellar-400'
                        : 'border-gray-700 bg-surface-light text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {levelNames[level]}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleSubmit} loading={submitting}>
              Submit Application
            </Button>
          </div>
        </Card>
      )}

      {!loading && record && (
        <Card title="KYC Status">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-lg ${
                  record.status === KYCStatus.Approved
                    ? 'bg-green-500/20 text-green-400'
                    : record.status === KYCStatus.Pending
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {record.status === KYCStatus.Approved ? (
                  <CheckCircle className="w-8 h-8" />
                ) : record.status === KYCStatus.Pending ? (
                  <Clock className="w-8 h-8" />
                ) : (
                  <XCircle className="w-8 h-8" />
                )}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">
                  {record.status === KYCStatus.Approved
                    ? 'Verified'
                    : record.status === KYCStatus.Pending
                    ? 'Pending Review'
                    : 'Rejected'}
                </p>
                <p className="text-sm text-gray-400">
                  Level: {levelNames[record.level]}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Submitted</p>
                <p className="text-white">
                  {record.verified_at
                    ? new Date(record.verified_at * 1000).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Expires</p>
                <p className="text-white">
                  {record.expires_at
                    ? new Date(record.expires_at * 1000).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
