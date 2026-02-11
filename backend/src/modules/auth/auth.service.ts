import { ApiResponse } from './../../common/dto/api-response.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { createKeyPair } from 'src/common/utils/auth.util';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, full_name } = registerUserDto;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Tạo user mới
    const newUser = await this.authRepository.register({
      email,
      password_hash,
      full_name,
    });

    if (newUser) {
      // Tạo cặp khóa để lưu vô key store
      const { publicKey, privateKey } = createKeyPair();
      console.log(publicKey, privateKey);
    }
    
    // Sử dụng ApiResponse wrapper
    return ApiResponse.created(
      new UserResponseEntity(newUser),
      'Đăng ký thành công',
    );
  }
}
