import { useState } from "react"
import BinanceListingPage from "../SubComponent/BinanceListingPage"

export default function Wazrix(props)
{
    // states
    let [openBinanceDetailPage, setOpenBinanceDetailPage] = useState(false)

    return (
        <>
            {
                openBinanceDetailPage
                ?
                <></>
                :
                <BinanceListingPage/>
            }        
        </>
    )
}