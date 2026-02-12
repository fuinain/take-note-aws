import { ApiResponse } from './../../common/dto/api-response.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { createKeyPair, createTokenPair } from 'src/common/utils/auth.util';
import { KeystoreService } from '../keystore/keystore.service';
import { IRegisterUser, ILoginUser } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly keyStoreService: KeystoreService,
  ) {}

  async register(registerUser: IRegisterUser) {
    const { email, password, full_name } = registerUser;

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

    // if (newUser) {
    //   // Tạo cặp khóa để lưu vô key store
    //   const { publicKey, privateKey } = createKeyPair();

    //   await this.keyStoreService.create({
    //     user_id: newUser.id,
    //     public_key: publicKey,
    //     private_key: privateKey,
    //   });
    // }

    // Sử dụng ApiResponse wrapper
    return ApiResponse.created(
      new UserResponseEntity(newUser),
      'Đăng ký thành công',
    );
  }

  async login(loginUser: ILoginUser) {
    const { email, password } = loginUser;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.authRepository.findByEmail(email);
    if (!existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Kiểm tra password có đúng không
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );
    if (!isPasswordValid) {
      throw new ConflictException('Có lỗi khi đăng nhập');
    }

    // Tạo cặp khóa để lưu vô key store
    const { publicKey, privateKey } = createKeyPair();

    const tokens = createTokenPair(
      { userId: existingUser.id, email },
      publicKey,
      privateKey,
    );
    if (!tokens) {
      throw new ConflictException('Không thể tạo tokens');
    }

    const keyStore = await this.keyStoreService.create({
      user_id: existingUser.id,
      public_key: publicKey,
      private_key: privateKey,
      refresh_token: tokens.refreshToken,
    });

    if (!keyStore) {
      throw new ConflictException('Không thể tạo key store');
    }

    // Sử dụng ApiResponse wrapper
    return ApiResponse.created(tokens, 'Đăng nhập thành công');
  }
}
