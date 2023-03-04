import { useState } from "react"
import CoinDiffBinanceGateIOListingPage from "../SubComponent/CoinDiffBinanceGateIOListingPage"

export default function CoinDiffBinanceGateIO(props) {
    // states
    let [openDiffDetails, setopenDiffDetails] = useState(false)

    return (
        <>
            {
                openDiffDetails
                ?
                <></>
                :
                <CoinDiffBinanceGateIOListingPage/>
            }        
        </>
    )
}