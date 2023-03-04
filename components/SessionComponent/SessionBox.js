import NavHeader from "../Pages/NavHeader";
import Wazrix from "../Pages/Wazrix";
import Binance from "../Pages/Binance"
import CoinDifference from "../Pages/CoinDifference";
import CoinDiffBinanceKucoin from "../Pages/CoinDiffBinanceKucoin";
import KuCoinGateIODiff from "../Pages/KuCoinGateIODiff";
import CoinDiffBinanceGateIO from "../Pages/CoinDiffBinanceGateIO";

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
                props.page === 'binanceKuCoinDiff'
                ?
                <CoinDiffBinanceKucoin/>
                :
                props.page === 'KucoinGateIODiff'
                ?
                <KuCoinGateIODiff/>
                :
                props.page === 'BinanceGateIODiff'
                ?
                <CoinDiffBinanceGateIO/>
                :
                <></>
            }
        </>
    )
}