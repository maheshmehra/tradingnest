import Config from "@/utils/Config";

export async function GetKuCoinsList(props)
{
    try {
        let response = await fetch(Config[process.env.NODE_ENV].HttpUrl + '/api/v1/market/allTickers?exchange=kucoin', {
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