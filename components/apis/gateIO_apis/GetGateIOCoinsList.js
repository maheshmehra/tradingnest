import Config from "@/utils/Config";

export async function GetGateIOCoinsList(props)
{
    try {
        let response = await fetch(Config[process.env.NODE_ENV].HttpUrl + '/api/v4/spot/tickers?exchange=gateio', {
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