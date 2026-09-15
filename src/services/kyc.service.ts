import api from './api';
import { KYCRecord, KYCLevel, APIResponse } from '../types';

export const kycService = {
  async submit(
    applicant: string,
    didId: string,
    level: KYCLevel,
    dataHash: string
  ): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.post('/kyc/submit', {
      applicant,
      did_id: didId,
      level,
      data_hash: dataHash,
    });
    return response.data;
  },

  async approve(
    applicant: string,
    verifier: string,
    dataHash: string
  ): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.post('/kyc/approve', {
      applicant,
      verifier,
      data_hash: dataHash,
    });
    return response.data;
  },

  async reject(
    applicant: string,
    verifier: string,
    reason: string
  ): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.post('/kyc/reject', {
      applicant,
      verifier,
      reason,
    });
    return response.data;
  },

  async getStatus(address: string): Promise<APIResponse<KYCRecord>> {
    const response = await api.get(`/kyc/status/${address}`);
    return response.data;
  },

  async isVerified(address: string, level: KYCLevel): Promise<APIResponse<{ verified: boolean }>> {
    const response = await api.get(`/kyc/verify/${address}`, { params: { level } });
    return response.data;
  },
};
