<br/>

<p align="center">
  <a href="https://www.wepin.io/">
      <picture>
        <source media="(prefers-color-scheme: dark)">
        <img alt="wepin logo" src="https://github.com/WepinWallet/wepin-web-sdk-v1/blob/main/assets/wepin_logo_color.png?raw=true" width="250" height="auto">
      </picture>
</a>
</p>

<br>


# @wepin/sdk-js

[![npm version](https://img.shields.io/npm/v/@wepin/sdk-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/sdk-js) [![npm downloads](https://img.shields.io/npm/dt/@wepin/sdk-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/sdk-js)

The Wepin SDK is designed for use in both Web environments. This package is exclusively available for use in web environments.


## ⏩ Get App ID and Key
After signing up for [Wepin Workspace](https://workspace.wepin.io/), go to the development tools menu and enter the information for each app platform to receive your App ID and App Key.


## ⏩ Installation
To install the WepinSDK, you can use npm or yarn:
```bash
npm install @wepin/sdk-js
```
or
```bash
yarn add @wepin/sdk-js
```

## ⏩ Import SDK
```js
import { WepinSDK } from '@wepin/sdk-js'
```

## ⏩ Initialize
Create a new instance of `WepinSDK` and initialize it with your application's ID and key:
```js
const wepinSdk = new WepinSDK({
    appId: 'your-wepin-app-id',
    appKey: 'your-wepin-api-key',
})
```

### init
```js
await wepinSdk.init(attributes?)
```

#### Parameters
- `attributes` \<IWepinSDKAttributes> __optional__
    - `type`: This determines how the widget is displayed when Wepin is initiated. The default value is `'hide'`, but you can also set it to `'float'`.
    - `defaultLanguage`: This sets the language displayed on the widget. The default value is `'ko'`, but you can also set it to `'en'`.
    - `defaultCurrency`: This sets the currency displayed on the widget. The default value is `'KRW'`.
    - `loginProviders`:  __optional__ An array of login providers to configure the widget. 
      - If not provided, all available login providers will be displayed on the widget. 
      - If an empty array is provided, only the email login function is available. (from version `v0.0.3`)

#### Example
```js
await wepinSdk.init({
    type: 'hide',
    defaultLanguage: 'ko',
    defaultCurrency: 'KRW',
})

// google, apple login
await wepinSdk.init({
    type: 'hide',
    defaultLanguage: 'ko',
    defaultCurrency: 'KRW',
    loginProviders: ['google', 'apple']
})

// only email login
await wepinSdk.init({
    type: 'hide',
    defaultLanguage: 'ko',
    defaultCurrency: 'KRW',
    loginProviders: []
})
```
### isInitialized
```js
wepinSdk.isInitialized()
```
The `isInitialized()` method checks Wepin SDK is initialized.

#### Returns
- \<boolean>
    - true if Wepin SDK is already initialized.

### changeLanguage
```javascript
wepinSdk.changeLanguage({language, currency})
```

Change the language and currency of the widget.

#### Parameters
- `language` \<string> - The language to be displayed on the widget. Currently, only `'ko'` and `'en'` are supported.
- `currency` \<string> - The currency to be displayed on the widget.

#### Returns
- void

#### Example

```javascript
wepinSdk.changeLanguage({
   currency: 'KRW',
   language: 'ko'
})
```

## ⏩ Method
Methods can be used after initialization of Wepin SDK.

### getStatus
```javascript
await wepinSdk.getStatus()
```

Returns lifecycle of wepin.

#### Parameters
- void

#### Returns
- Promise\<WepinLifeCycle>
  - The lifecycle of the wepin is defined as follows.
     - `'not_initialized`': if wepin is not initialized
     - `'initializing'`: if wepin is initializing
     - `'initialized'`: if wepin is initialized
     - `'before_login'`: if wepin is initialized but the user is not logged in
     - `'login'`: if the user is logged in
     - `'login_before_register'`: if the user is email logged in but the user is NOT registered in wepin 

#### Example

```javascript
const status = await wepinSdk.getStatus()
```

### openWidget
```javascript
await wepinSdk.openWidget()
```

The `openWidget()` method shows Wepin widget. If a user is not logged in, Wepin widget will show login page.

#### Parameters
- void

#### Returns
- Promise \<void>

#### Example

```javascript
await wepinSdk.openWidget()
```

### closeWidget
```javascript
wepinSdk.closeWidget()
```

The `closeWidget()` method closes Wepin widget.

#### Parameters
- void

#### Returns
- void

#### Example

```javascript
wepinSdk.closeWidget()
```

### loginWithUI
```javascript
await wepinSdk.loginWithUI({email}?)
```

The `loginWithUI()` method returns the information of the user who is logged in. If no user is logged in, the Wepin widget will display a login page. To perform a login without the widget, use the `loginWepin()` method from `@wepin/login-js` instead.


#### Parameters

- `email` \<string> __optional__
  - The `email` parameter allows users to log in using the specified email address, providing access to the login service.

#### Returns
- Promise\<IWepinUser>
  - status \<'success'|'fail'>
  - userInfo \<object> __optional__
    - userId \<string>
    - email \<string>
    - provider \<'google'|'apple'|'naver'|'discord'|'email'|'external_token'>
    - use2FA \<boolean>
  - userStatus: \<object> - The user's status of wepin login. including:
    - loginStatus: \<'complete' | 'pinRequired' | 'registerRequired'> - If the user's loginStatus value is not complete, it must be registered in the wepin.
    - pinRequired?: <boolean> 
  - walletId \<string>

#### Example

```javascript
//without email
const userInfo = await wepinSdk.loginWithUI()
//with email
const userInfo = await wepinSdk.loginWithUI({email})
```
- response
```json
{
    "status": "success",
      "userInfo": {
        "userId": "120349034824234234",
        "email": "abc@gmail.com",
        "provider": "google",
        "use2FA": true,
      },
}
```

### register
```javascript
await wepinSdk.register()
```

Register the user with Wepin.
After joining and logging in, the Register page of the Wepin widget opens and registers (wipe and account creation) the Wepin service.
Available only if the life cycle of the WepinSDK is `login_before_register`.
After calling the `loginWepin()` method in `@wepin/login-js`, if the loginStatus value in the userStatus is not 'complete', this method must be called. 

#### Parameters
- void

#### Returns
- Promise\<IWepinUser>
  - status \<'success'|'fail'>
  - userInfo \<object> __optional__
    - userId \<string>
    - email \<string>
    - provider \<'google'|'apple'|'naver'|'discord'|'email'|'external_token'>
    - use2FA \<boolean>
  - userStatus: \<object> - The user's status of wepin login. including:
    - loginStatus: \<'complete' | 'pinRequired' | 'registerRequired'> - If the user's loginStatus value is not complete, it must be registered in the wepin.
    - pinRequired?: <boolean> 
  - walletId \<string>

#### Exception

#### Example

```javascript
const userInfo = await wepinSdk.register()
```
  
### logout
```js
await wepinSdk.logout()
```
The `logout()` method performs a wepin logout.
#### Parameters
- void

#### Returns
- Promise \<void>

### getAccounts

```js
await wepinSdk.getAccounts()
await wepinSdk.getAccounts(options?)
```
The `getAccounts()` method returns user accounts. It is recommended to use `getAccounts()` method without argument to get all user accounts. It can be only usable after widget login.
##### Parameters
- options:
  - networks: \<Array> __optional__ A list of network names to filter the accounts.
    - network \<string> __optional__
  - withEoa: \<boolean> __optional__ If AA accounts are included, whether to include EOA accounts

#### Returns
- Promise \<Account[]> - A promise that resolves to an array of the user's accounts.
  - address \<string>
  - network \<string>
  - contract \<string> __optional__ token contract address. 
  - isAA \<boolean> __optional__ Whether it is aa account or not

#### Example
```js
const result = await wepinSdk.getAccounts({
  networks: ['Ethereum'], 
  withEoa: true
})
```
- response
```json
[
  {
    "address": "0x0000001111112222223333334444445555556666",
    "network": "Ethereum",
  },
  {
    "address": "0x0000001111112222223333334444445555556666",
    "network": "Ethereum",
    "contract": "0x777777888888999999000000111111222222333333",
  },
  {
    "address": "0x4444445555556666000000111111222222333333",
    "network": "Ethereum",
    "isAA": true,
  },
]
```



### getBalance
```js
await wepinSdk.getBalance(accounts)
await wepinSdk.getBalance()
```

It returns the account's balance information. It can be only usable after widget login. It use `getBalance()` method without argument to get all user accounts.

#### Parameters
- accounts \<Account[]> __optional__
  - network \<string>
  - address \<string>
  - isAA \<boolean> __optional__ Whether it is aa account or not
  
#### Returns
- Promise \<AccountBalanceInfo[]>
  - network \<string>
  - address \<string>
  - symbol \<string> - symbol of account
  - balance \<string> - balance of account
  - tokens \<Array\<TokenBalanceInfo>> - token balance information for account
    - symbol \<string> - token symbol
    - balance \<string> - token balance
    - contract \<string> - token contract address

#### Example
```js
const result = await wepinSdk.getBalance([{
  address: '0x0000001111112222223333334444445555556666',
  network: 'Ethereum',
}])
```
- response
```json
[
    {
        "network": "Ethereum",
        "address": "0x0000001111112222223333334444445555556666",
        "symbol": "ETH",
        "balance": "1.1",
        "tokens":[
            {
                "contract": "0x123...213",
                "symbol": "TEST",
                "balance": "10"
            },
        ]
    }
]
```

### send
```js
await wepinSdk.send({account, txData?})
```

It returns the sent transaction id information. It can be only usable after widget login.

#### Parameters
- account \<Account>
  - network \<string>
  - address \<string>
- txData \<object> __optional__
  - to \<string>
  - amount \<string>

#### Returns
- Promise \<object>
  - txId \<string> 

#### Example
```js
const result = await wepinSdk.send({
    account: {
        address: '0x0000001111112222223333334444445555556666',
        network: 'Ethereum',
    },
    txData: {
        to: '0x9999991111112222223333334444445555556666',
        amount: '0.1',
    }
})
```
- response
```json
{
    "txId": "0x76bafd4b700ed959999d08ab76f95d7b6ab2249c0446921c62a6336a70b84f32"
}
```

### finalize
```js
wepinSdk.finalize()
```

The `finalize()` method finalizes the Wepin SDK.

#### Parameters
 - void
 - 
#### Returns
 - void

#### Example
```js
wepinSdk.finalize()
```
