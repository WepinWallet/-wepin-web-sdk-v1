import type { LoginProviders } from './LoginProviders';
export type providerType = LoginProviders | 'email' | 'external_token';
export interface IWepinUser {
    status: 'success' | 'fail';
    userInfo?: UserInfo;
    walletId?: string;
    userStatus?: UserStatus;
    token?: UserToken;
}
interface UserToken {
    accessToken: string;
    refreshToken: string;
}
interface UserStatus {
    loginStatus: 'complete' | 'pinRequired' | 'registerRequired';
    pinRequired?: boolean;
}
interface UserInfo {
    userId: string;
    email: string;
    provider: providerType;
    use2FA: boolean;
}
export {};
