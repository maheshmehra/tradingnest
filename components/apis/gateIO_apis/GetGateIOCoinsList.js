export async function GetGateIOCoinsList(props)
{
    try {
        let response = await fetch('https://api.gateio.ws/api/v4/spot/tickers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, multipart/mixed'
            },
        })

        let finalResponse = await response.json()

        return finalResponse
    }
    catch(exception) {
        console.log(exception)
        return null
    }
}