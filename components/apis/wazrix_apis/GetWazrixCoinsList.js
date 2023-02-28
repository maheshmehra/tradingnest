export async function GetWazrixCoinsList(props)
{
    try {
        let response = await fetch('https://api.wazirx.com/sapi/v1/tickers/24hr', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, multipart/mixed'
            }
        })

        let finalResponse = await response.json()

        return finalResponse
    }
    catch(exception) {
        console.log(exception)
        return null
    }
}