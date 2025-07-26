export interface KakaoLoginResponse {
  userId: number;
  profileImage: string;
  jwtAccessToken: string;
  jwtRefreshToken: string;
}
