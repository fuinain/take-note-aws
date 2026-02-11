import { Exclude } from 'class-transformer';

/**
 * Base KeyStore Entity - Đại diện cho KeyStore trong database
 * Chứa tất cả fields, không exclude gì
 */
export class KeyStoreEntity {
  id: number;
  userId: number;
  public_key: string;
  private_key: string;
  refresh_token: string;
  refresh_tokens_used: any | null; // JSON type
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<KeyStoreEntity>) {
    Object.assign(this, partial);
  }
}

/**
 * KeyStore Response Entity - Dùng cho API responses
 * Kế thừa từ KeyStoreEntity và exclude sensitive fields
 */
export class KeyStoreResponseEntity extends KeyStoreEntity {
  @Exclude()
  declare private_key: string; // Exclude private key

  @Exclude()
  declare refresh_token: string; // Exclude refresh token

  @Exclude()
  declare refresh_tokens_used: any | null; // Exclude used tokens

  constructor(partial: Partial<KeyStoreEntity>) {
    super(partial);
  }
}
