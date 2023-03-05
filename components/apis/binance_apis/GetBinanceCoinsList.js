import Config from "@/utils/Config";

export async function GetBinanceCoinsList(props)
{
    try {
        let response = await fetch(Config[process.env.NODE_ENV].HttpUrl+'/api/v3/ticker/24hr?exchange=binance', {
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