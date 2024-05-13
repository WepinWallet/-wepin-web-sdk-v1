import { CreateWepinMiddlewareOptions } from '../types/wepinMiddlewareOptions';
import { InvalidatedJsonRpcRequest } from '../types/EIP1193';

/**
 * params: [address, stringified typed message]
 */
export declare const signTypedData: ({ wepinProvider, network, version, }: CreateWepinMiddlewareOptions & {
    version: 'V1' | 'V3' | 'V4';
}) => (req: InvalidatedJsonRpcRequest, res: any, next: any, end: any) => void;
