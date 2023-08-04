import intance from "services";


// get asset 
export const getProfileAsset = (data: Record<string, unknown>) => intance.post('/api/v0.1/asset', {
    headers: { "Content-Type": 'application/json', "Accept": "application/json" },
    data
});



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