import { WidgetFrame } from './widget/WidgetFrame';
import { WidgetWindow } from './widget/WidgetWindow';

export interface IWepinModal {
    platformType: 'web' | 'ios' | 'android';
    domain: string;
    openAuthBrowser(url: string, EL: (event: MessageEvent<any>) => void): Promise<WidgetWindow>;
    openModal(url: string, EL: (event: MessageEvent<any>) => void, options?: {
        isHide?: boolean;
    }): Promise<WidgetFrame>;
    closeAuthBrowser(): void;
    closeModal(): void;
}
