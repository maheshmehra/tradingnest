import { useState } from "react"
import WazrixListingPage from "../SubComponent/WazrixListingPage"

export default function Wazrix(props)
{
    // states
    let [openWazrixDetailPage, setOpenWazrixDetailPage] = useState(false)

    return (
        <>
            {
                openWazrixDetailPage
                ?
                <></>
                :
                <WazrixListingPage/>
            }        
        </>
    )
}