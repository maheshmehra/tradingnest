export async function GetBinanceCoinsList(props)
{
    try {
        let response = await fetch(process.env.REACT_APP_API_PROXY+'/ticker/24hr', {
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