import { Platform } from '@wepin/common';
import { IUserInfo, IWepinToken, LocalStorageData, LocalStorageKey, LocalStorageType } from './storage';
export interface IWepinStorage {
    platform: keyof typeof Platform;
    getLocalStorageEnabled(): boolean;
    setAllLocalStorage(appId: string, value: LocalStorageType): Promise<void>;
    setLocalStorage(appId: string, name: LocalStorageKey, value: LocalStorageData): Promise<void>;
    getLocalStorage<T>(appId: string, name: LocalStorageKey): Promise<T | undefined>;
    getAllLocalStorage(appId: string): Promise<LocalStorageType | undefined>;
    clearLocalStorage(appId: string, name: LocalStorageKey): Promise<void>;
    clearAllLocalStorage(appId: string): Promise<void>;
    setLoginUserLocalStorage(appId: string, request: {
        provider: string;
        token: {
            idToken: string;
            refreshToken: string;
        };
    }, response: any): Promise<{
        userInfo: IUserInfo;
        connectUser: IWepinToken;
    }>;
}
