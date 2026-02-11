/**
 * Interface cho việc tạo KeyStore mới
 */
export interface ICreateKeyStoreData {
  userId: number;
  public_key: string;
  private_key: string;
  refresh_token: string;
  refresh_tokens_used?: any | null;
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
