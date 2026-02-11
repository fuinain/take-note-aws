import { UserStatus } from '@prisma/client';

/**
 * Interface cho việc tạo User mới
 */
export interface ICreateUserData {
  email: string;
  password_hash: string;
  full_name?: string | null;
  status?: UserStatus;
}

/**
 * Interface cho việc update User
 */
export interface IUpdateUserData {
  email?: string;
  password_hash?: string;
  full_name?: string | null;
  status?: UserStatus;
}
