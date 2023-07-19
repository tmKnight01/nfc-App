import intance from "services";



// get asset 
export const getProfileAsset = (data: Record<string, unknown>) => intance.post('/api/v0.1/asset', {
    headers: { "Content-Type": 'application/json', "Accept": "application/jsons" },
    data
});