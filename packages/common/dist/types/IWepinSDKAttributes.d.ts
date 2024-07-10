import { LoginProviders } from './LoginProviders';
export interface IWepinSDKAttributes {
    /**
     * This determines how the widget is displayed when Wepin is initiated. The default value is 'hide' and currently, only 'hide' is supported.
     */
    type?: string;
    /**
     * This sets the language displayed on the widget. The default value is 'ko', but you can also set it to 'en'.
     */
    defaultLanguage?: string;
    /**
     * This sets the currency displayed on the widget. The default value is 'KRW', but you can also set it to 'USD'.
     */
    defaultCurrency?: string;
    /**
     * An array of login providers to configure the widget.
     * - If not provided, all available login providers will be displayed on the widget.
     * - If an empty array is provided, only the email login function is available. (from version v0.0.3)
     */
    loginProviders?: Array<LoginProviders>;
}
