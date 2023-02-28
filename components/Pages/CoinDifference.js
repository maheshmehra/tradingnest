import { useState } from "react"
import CoinDifferenceListing from "../SubComponent/CoinDiffListingPage"

export default function CoinDifference(props)
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
                <CoinDifferenceListing/>
            }        
        </>
    )
}