import CommonStyleSheet from "@/components/common/CommonStyleSheet"
import SessionBox from "@/components/SessionComponent/SessionBox"

export default function BinancePrice()
{
    return (
        <>
            <CommonStyleSheet title={'Binance Price'}/>
            <SessionBox page={'binancePrice'}/>
        </>
    )
}