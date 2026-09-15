export interface DID {
  did_id: string;
  owner: string;
  document: string;
  created_at: number;
  updated_at: number;
  active: boolean;
}

export interface Credential {
  credential_id: string;
  issuer: string;
  subject: string;
  credential_type: string;
  claims: string;
  issued_at: number;
  expires_at: number | null;
  revoked: boolean;
  signature: string;
}

export enum KYCLevel {
  Unverified = 0,
  Basic = 1,
  Enhanced = 2,
  Institutional = 3,
}

export enum KYCStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Expired = 3,
}

export interface KYCRecord {
  did_id: string;
  level: KYCLevel;
  verifier: string;
  verified_at: number;
  expires_at: number;
  data_hash: string;
  status: KYCStatus;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}
