import{createScaffoldMiddleware as r}from"json-rpc-engine";import{connect as n}from"../methods/connect.js";import{sign as e}from"../methods/sign.js";import{solanaSendTransaction as o}from"../methods/solanaSendTransaction.js";import{solanaSignTransaction as i}from"../methods/solanaSignTransaction.js";import{switchEthereumChain as t}from"../methods/switchEthereumChain.js";export var createWepinMiddleware=function(s){var a=s.wepinProvider,m=s.network;return r({connect:n({wepinProvider:a,network:m}),signTransaction:i({wepinProvider:a,network:m}),signAndSendTransaction:o({wepinProvider:a,network:m}),signMessage:e({wepinProvider:a,network:m,isPersonal:!1}),changeNetwork:t({wepinProvider:a,network:m})})};