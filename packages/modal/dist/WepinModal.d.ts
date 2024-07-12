import { IWepinModal } from './IWepinModal';
import { WidgetFrame } from './widget/WidgetFrame';
import { WidgetWindow } from './widget/WidgetWindow';
export declare class WepinModal implements IWepinModal {
    platformType: "web";
    domain: string;
    private _modalWindow;
    private _modalFrame;
    constructor();
    openAuthBrowser(url: string, EL: (event: MessageEvent<any>) => void): Promise<WidgetWindow>;
    openModal(url: string, EL: (event: MessageEvent<any>) => void, options?: {
        isHide?: boolean;
    }): Promise<WidgetFrame>;
    closeAuthBrowser(): Promise<void>;
    closeModal(): Promise<void>;
}
