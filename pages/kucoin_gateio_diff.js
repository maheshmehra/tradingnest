import CommonStyleSheet from "@/components/common/CommonStyleSheet";
import SessionBox from "@/components/SessionComponent/SessionBox";

export default function()
{
    return(
        <>
            <CommonStyleSheet title={'KuCoin GateIO'}/>
            <SessionBox page={'KucoinGateIODiff'}/>
        </>
    )
}