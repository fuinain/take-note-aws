/**
 * Interface cho việc tạo KeyStore mới
 */
export interface ICreateKeyStore {
  user_id: number;
  public_key: string;
  private_key: string;
  refresh_token: string;
}

/**
 * Interface cho việc update KeyStore
 */
export interface IUpdateKeyStoreData {
  public_key?: string;
  private_key?: string;
  refresh_token?: string;
  refresh_tokens_used?: any | null;
}

