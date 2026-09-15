import api from './api';
import { DID, APIResponse } from '../types';

export const didService = {
  async create(owner: string, document: string): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.post('/did', { owner, document });
    return response.data;
  },

  async resolve(didId: string): Promise<APIResponse<DID>> {
    const response = await api.get(`/did/${didId}`);
    return response.data;
  },

  async update(didId: string, caller: string, newDocument: string): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.put(`/did/${didId}`, { caller, new_document: newDocument });
    return response.data;
  },

  async deactivate(didId: string, caller: string): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.delete(`/did/${didId}`, { params: { caller } });
    return response.data;
  },

  async transfer(didId: string, caller: string, newOwner: string): Promise<APIResponse<{ tx_hash: string }>> {
    const response = await api.post(`/did/${didId}/transfer`, { caller, new_owner: newOwner });
    return response.data;
  },

  async isActive(didId: string): Promise<APIResponse<{ active: boolean }>> {
    const response = await api.get(`/did/check/${didId}`);
    return response.data;
  },
};
