export const getApiResult = async (url, moduleName, parameter = {}) => {
    const body = JSON.stringify({ moduleName, parameter })
    const baseURL = "http://localhost:3030/pipi/"
    const result = await fetch(baseURL + url, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body
    })
    const data = await result.json()
    return data
}