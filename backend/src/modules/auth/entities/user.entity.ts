import { Exclude } from 'class-transformer';
import { UserStatus } from '@prisma/client';

/**
 * Base User Entity - Đại diện cho User trong database
 * Chứa tất cả fields, không exclude gì
 */
export class UserEntity {
  id: number;
  email: string;
  full_name: string | null;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
  password_hash: string; // Không exclude ở đây

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

/**
 * User Response Entity - Dùng cho API responses
 * Kế thừa từ UserEntity và exclude sensitive fields
 */
export class UserResponseEntity extends UserEntity {
  @Exclude()
  declare password_hash: string; // declare để override decorator

  constructor(partial: Partial<UserEntity>) {
    super(partial);
  }
}
