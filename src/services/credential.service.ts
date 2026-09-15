import api from './api';
import { Credential, APIResponse } from '../types';

export const credentialService = {
  async issue(
    issuer: string,
    subject: string,
    credentialType: string,
    claims: string,
    signature: string,
    expiresAt?: number
  ): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.post('/credentials/issue', {
      issuer,
      subject,
      credential_type: credentialType,
      claims,
      signature,
      expires_at: expiresAt,
    });
    return response.data;
  },

  async get(credentialId: string): Promise<APIResponse<Credential>> {
    const response = await api.get(`/credentials/${credentialId}`);
    return response.data;
  },

  async verify(credentialId: string): Promise<APIResponse<{ valid: boolean }>> {
    const response = await api.post(`/credentials/${credentialId}/verify`);
    return response.data;
  },

  async revoke(credentialId: string, caller: string): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.post(`/credentials/${credentialId}/revoke`, { caller });
    return response.data;
  },

  async getByIssuer(issuer: string): Promise<APIResponse<string[]>> {
    const response = await api.get(`/credentials/issuer/${issuer}`);
    return response.data;
  },

  async getBySubject(subject: string): Promise<APIResponse<string[]>> {
    const response = await api.get(`/credentials/subject/${subject}`);
    return response.data;
  },
};
