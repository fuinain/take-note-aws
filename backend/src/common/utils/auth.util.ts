import * as crypto from 'crypto';
import { sign } from 'jsonwebtoken';

/**
 * Tạo cặp khóa (public key & private key)
 * @returns {publicKey: string, privateKey: string}
 */
export function createKeyPair(): {
  publicKey: string;
  privateKey: string;
} {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Key size
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return {
    publicKey,
    privateKey,
  };
}

/**
 * 
 * @param payload 
 * @param publicKey 
 * @param privateKey 
 * @returns 
 */
export function createTokenPair(
  payload: any,
  publicKey: string,
  privateKey: string,
): {
  accessToken: string;
  refreshToken: string;
} {
  // Access Token - expire trong 15 phút
  const accessToken = sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '15m',
  });

  // Refresh Token - expire trong 7 ngày
  const refreshToken = sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '7d',
  });

  return {
    accessToken,
    refreshToken,
  };
}
