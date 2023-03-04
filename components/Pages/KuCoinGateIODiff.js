import { useState } from "react"
import CoinDiffKuCoinGateIO from "../SubComponent/CoinDiffKuCoinDateIOListingPage"

export default function KuCoinGateIODiff(props)
{
    // states
    let [openDiffDetails, setopenDiffDetails] = useState(false)

    return (
        <>
            {
                openDiffDetails
                ?
                <></>
                :
                <CoinDiffKuCoinGateIO/>
            }        
        </>
    )
}