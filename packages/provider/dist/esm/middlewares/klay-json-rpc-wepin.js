import{createScaffoldMiddleware as e}from"json-rpc-engine";import{requestAccounts as r}from"../methods/requestAccounts.js";import{sendTransaction as n}from"../methods/sendTransaction.js";import{sign as i}from"../methods/sign.js";import{signTransaction as o}from"../methods/signTransaction.js";import{signTypedData as t}from"../methods/signTypedData.js";import{switchEthereumChain as s}from"../methods/switchEthereumChain.js";export var createWepinMiddleware=function(a){var w=a.wepinProvider,d=a.network;return e({eth_requestAccounts:r({wepinProvider:w,network:d}),eth_accounts:r({wepinProvider:w,network:d}),eth_signTransaction:o({wepinProvider:w,network:d}),eth_sendTransaction:n({wepinProvider:w,network:d}),eth_signTypedData_v1:t({wepinProvider:w,network:d,version:"V1"}),eth_signTypedData_v3:t({wepinProvider:w,network:d,version:"V3"}),eth_signTypedData_v4:t({wepinProvider:w,network:d,version:"V4"}),eth_sign:i({wepinProvider:w,network:d,isPersonal:!1}),klay_requestAccounts:r({wepinProvider:w,network:d}),klay_accounts:r({wepinProvider:w,network:d}),klay_signTransaction:o({wepinProvider:w,network:d}),klay_sendTransaction:n({wepinProvider:w,network:d}),klay_signTypedData_v1:t({wepinProvider:w,network:d,version:"V1"}),klay_signTypedData_v3:t({wepinProvider:w,network:d,version:"V3"}),klay_signTypedData_v4:t({wepinProvider:w,network:d,version:"V4"}),klay_sign:i({wepinProvider:w,network:d,isPersonal:!1}),personal_sign:i({wepinProvider:w,network:d,isPersonal:!0}),wallet_switchEthereumChain:s({wepinProvider:w,network:d})})};