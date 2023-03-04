import { useState } from "react"
import CoinDiffBinKuListingPage from "../SubComponent/CoinDiffBinKuListingPage"

export default function CoinDiffBinanceKucoin(props) {
    // states
    let [openDiffDetails, setopenDiffDetails] = useState(false)

    return (
        <>
            {
                openDiffDetails
                ?
                <></>
                :
                <CoinDiffBinKuListingPage/>
            }        
        </>
    )
}