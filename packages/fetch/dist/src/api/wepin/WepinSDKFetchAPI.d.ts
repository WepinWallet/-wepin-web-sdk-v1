import { default as APIRequest } from '../APIRequest';
import { default as APIResponse } from '../APIResponse';
import { URLParams, Headers, RequestData } from '../APITypes';
import { default as FetchAPI } from '../FetchAPI';
import { default as InterfaceAPI } from '../InterfaceAPI';
import { WepinFetch } from '../../WepinFetch';

declare class WepinSDKFetchAPI extends FetchAPI implements InterfaceAPI {
    baseUrl: string;
    private params;
    constructor(baseUrl: string, params: {
        appId: string;
        appKey: string;
        domain: string;
        sdk: {
            version: string;
            type: string;
        };
        wepinFetch?: WepinFetch;
    });
    send<THeaders extends Headers | undefined, TData extends RequestData, TURLParams extends URLParams, TAPIRequest extends APIRequest<THeaders, TData, TURLParams>, TAPIResponse extends APIResponse<unknown, any, TAPIRequest>>(request: TAPIRequest, middlewareOptions?: any): Promise<TAPIResponse>;
    private setToken;
    private requestCallback;
    private responseCallback;
}
export default WepinSDKFetchAPI;
