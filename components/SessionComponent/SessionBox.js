import NavHeader from "../Pages/NavHeader";
import Wazrix from "../Pages/Wazrix";
import Binance from "../Pages/Binance"
import CoinDifference from "../Pages/CoinDifference";

export default function SessionBox(props)
{
    return (
        <>
            <NavHeader/>
            {
                props.page === 'wazrix'
                ?
                <Wazrix/>
                :
                props.page === 'binancePrice'
                ?
                <Binance/>
                :
                props.page === 'priceDifference'
                ?
                <CoinDifference/>
                :
                <></>
            }
        </>
    )
}