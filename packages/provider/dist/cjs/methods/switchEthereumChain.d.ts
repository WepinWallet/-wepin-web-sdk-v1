import { InvalidatedJsonRpcRequest } from '../types/EIP1193.js';
import { CreateWepinMiddlewareOptions } from '../types/wepinMiddlewareOptions.js';
export declare const switchEthereumChain: ({ wepinProvider, network }: CreateWepinMiddlewareOptions) => (req: InvalidatedJsonRpcRequest, res: any, next: any, end: any) => any;
