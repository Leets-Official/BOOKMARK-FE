export interface KakaoLoginResponse {
  userId: number;
  profileImage: string;
  jwtAccessToken: string;
  jwtRefreshToken: string;
}

export interface ReissueRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
