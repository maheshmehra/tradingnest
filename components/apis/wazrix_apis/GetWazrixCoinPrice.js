export async function GetWazrixCoinsPrice(props, symbol = 'usdtinr')
{
    try {
        let response = await fetch('https://api.wazirx.com/sapi/v1/ticker/24hr?symbol='+symbol, {
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