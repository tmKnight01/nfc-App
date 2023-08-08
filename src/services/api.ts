import intance from "services";



export interface AssetItem {
    t: string, // mime type of asset: image/jpeg, image/png, video/mp4
    b: string, // content of digital asset  base64 or Url
}

interface asssetResponse {
    n: number,// number of asset exists in our member system 
    m: string, // 
    v: number, //  Server side configuration version number. If any configurable items have been changed and updated in server, this number will be incremented and pass back to client Android App.
    d: Array<AssetItem>

}



// get asset 
export const getProfileAsset = (data: Record<string, unknown>, apiKey: string): Promise<asssetResponse> => intance.post('/api/v0.1/asset',
    data,
    {
        headers: {
            "Content-Type": 'application/json', "Accept": "application/json", "Authorization": apiKey
        }
    }

);



interface landingResponse {
    apiKey: string,
    endpoint: string,
    disclaimer_page: string,
    member_error_page: string,
    timeout: number
}

// register -landing  
export const getRegisterLanding = (data: Record<string, unknown>): Promise<landingResponse> => intance.post('/api/v0.1/landing', {
    ...data
})