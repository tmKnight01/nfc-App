import intance from 'services';
import DeviceInfo from 'react-native-device-info';
import { sha3_512 } from 'js-sha3';

export interface AssetItem {
    t: string; // mime type of asset: image/jpeg, image/png, video/mp4
    b: string; // content of digital asset  base64 or Url
}

interface asssetResponse {
    n: number; // number of asset exists in our member system
    m: string; //
    v: number; //  Server side configuration version number. If any configurable items have been changed and updated in server, this number will be incremented and pass back to client Android App.
    d: Array<AssetItem>;
}

let X_API_KEY = "";

DeviceInfo.getAndroidId().then(androidId => {
    if (androidId) X_API_KEY = sha3_512(androidId);
}).catch(err => {
    console.log('getAndroidId Error:', err);
})

// get asset
export const getProfileAsset = (
    data: Record<string, unknown>,
    apiKey: string,
): Promise<asssetResponse> =>
    intance.post('/api/v0.2/asset', data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: apiKey,
            "x-api-key": X_API_KEY
        },
    });


interface language {
    en: string,
    cn: string,
    tw: string

}



interface ConfigResponse {
    version: number,
    merchant_logo: string;
    disclaimer_page: language;
    member_error_page: language;
    timeout: number;
}

interface ApiKeyResponse {
    authkey: string
}


// register -landing
export const getRegisterLanding = (): Promise<ApiKeyResponse> =>
    intance.post('/api/v0.2/landing', {}, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-api-key": X_API_KEY
        }
    });

// Get configurable items
export const setConfigurable = (
    apiKey: string,
): Promise<ConfigResponse> =>
    intance.post('/api/v0.2/config', {}, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: apiKey,
            'x-api-key': X_API_KEY,
        },
    });
