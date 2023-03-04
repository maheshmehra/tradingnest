import Config from "@/utils/Config"
import { useState, useEffect } from "react"
import { GetGateIOCoinsList } from "../apis/gateIO_apis/GetGateIOCoinsList"
import { GetKuCoinsList } from "../apis/kucoin_apis/GetKuCoinsList"
import { GetWazrixCoinsPrice } from "../apis/wazrix_apis/GetWazrixCoinPrice"

export default function CoinDiffKuCoinGateIO(props) {
    // states
    let [wazrixUSDTPrice, setWazrixUSDTPrice] = useState(87.30)
    let [portfolioPrice, setPortfolioPrice] = useState(100000)
    let [priceDiffList, setPriceDiffList] = useState([])
    let [isReverseCalculationEnabled, setIsReverseCalculationEnabled] = useState(false)
    let [totalFeeUSDT, setTotalFeeUSDT] = useState(15)

    // function for difference from binance to kucoin
    let getDiffPriceList = async () => {

        // getting wazrix usdt price
        let wazrixRes = await GetWazrixCoinsPrice(props, 'usdtinr')

        if (wazrixRes && wazrixRes.bidPrice) {
            setWazrixUSDTPrice(parseFloat(wazrixRes.bidPrice))
        }
        else {
            setWazrixUSDTPrice(parseFloat(Config.defaultWazrixUSDTPrice))
        }

        let tempGateIOCoinList = []
        let tempKuCoinList = []

        // getting kucoin price list
        let kucoinResponse = await GetKuCoinsList()

        if (kucoinResponse && kucoinResponse.code === '200000' && kucoinResponse.data && kucoinResponse.data.ticker && Array.isArray(kucoinResponse.data.ticker)) {
            const tempKuCoinListArr = kucoinResponse.data.ticker
            tempKuCoinListArr.map((element) => {
                if (element.symbol.endsWith('USDT')) {
                    tempKuCoinList.push(element)
                }
            })
        }
        else {
            return
        }

        // getting kucoin price list
        let gateIOResponse = await GetGateIOCoinsList()

        if (Array.isArray(gateIOResponse)) {
            gateIOResponse.map((element) => {
                if (element.currency_pair.endsWith('USDT')) {
                    tempGateIOCoinList.push(element)
                }
            })
        }
        else {
            return
        }

        // calculating price difference
        if (tempGateIOCoinList && tempGateIOCoinList.length > 0 && tempKuCoinList && tempKuCoinList.length > 0) {
            let tempPriceDiffList = []
            for (let index in tempGateIOCoinList) {
                let coinName = tempGateIOCoinList[index].currency_pair.split('_USDT')[0]

                let kuCoinData = tempKuCoinList.find((element) => element.symbol.toUpperCase() === (coinName + '-USDT'))

                if (kuCoinData) {
                    // kucoin
                    let kuCoinPrice = parseFloat(kuCoinData.sell)
                    let wazrixUsdt = portfolioPrice / wazrixUSDTPrice
                    let kuCoinPurchasedCoins = wazrixUsdt / kuCoinPrice

                    // gateio
                    let gateIOPrice = parseFloat(tempGateIOCoinList[index].highest_bid)
                    let gateIOUSDT = (gateIOPrice * kuCoinPurchasedCoins)
                    let priceDiff = ((gateIOUSDT - totalFeeUSDT) - wazrixUsdt) * wazrixUSDTPrice

                    if (isFinite(priceDiff) && priceDiff > 0) {
                        let priceDiffElement =
                        {
                            coinName: kuCoinData.symbol.toUpperCase(),
                            currency: 'INR',
                            kuCoinPrice: kuCoinData.last,
                            gateIoPrice: tempGateIOCoinList[index].last,
                            priceDifference: priceDiff
                        }

                        tempPriceDiffList.push(priceDiffElement)
                    }
                }
            }
            setPriceDiffList(tempPriceDiffList)
        }
    }

    // function to calculate reverse calculation
    let getRevPriceDifference = async () => {
        // getting wazrix usdt price
        let wazrixRes = await GetWazrixCoinsPrice(props, 'usdtinr')

        if (wazrixRes && wazrixRes.bidPrice) {
            setWazrixUSDTPrice(parseFloat(wazrixRes.bidPrice))
        }
        else {
            setWazrixUSDTPrice(parseFloat(Config.defaultWazrixUSDTPrice))
        }

        let tempGateIOCoinList = []
        let tempKuCoinList = []

        // getting kucoin price list
        let kucoinResponse = await GetKuCoinsList()

        if (kucoinResponse && kucoinResponse.code === '200000' && kucoinResponse.data && kucoinResponse.data.ticker && Array.isArray(kucoinResponse.data.ticker)) {
            const tempKuCoinListArr = kucoinResponse.data.ticker
            tempKuCoinListArr.map((element) => {
                if (element.symbol.endsWith('USDT')) {
                    tempKuCoinList.push(element)
                }
            })
        }
        else {
            return
        }

        // getting kucoin price list
        let gateIOResponse = await GetGateIOCoinsList()

        if (Array.isArray(gateIOResponse)) {
            gateIOResponse.map((element) => {
                if (element.currency_pair.endsWith('USDT')) {
                    tempGateIOCoinList.push(element)
                }
            })
        }
        else {
            return
        }

        // calculating price difference
        if (tempGateIOCoinList && tempGateIOCoinList.length > 0 && tempKuCoinList && tempKuCoinList.length > 0) {
            let tempPriceDiffList = []
            for (let index in tempGateIOCoinList) {
                let coinName = tempGateIOCoinList[index].currency_pair.split('_USDT')[0]

                let kuCoinData = tempKuCoinList.find((element) => element.symbol.toUpperCase() === (coinName + '-USDT'))

                if (kuCoinData) {
                    // gateio 
                    let gateIOPrice = parseFloat(tempGateIOCoinList[index].lowest_ask)
                    let wazrixUsdt = portfolioPrice / wazrixUSDTPrice
                    let kuCoinPurchasedCoins = wazrixUsdt / gateIOPrice



                    // kucoin
                    let kuCoinPrice = parseFloat(kuCoinData.buy)
                    let kuCoinUSDT = (kuCoinPrice * kuCoinPurchasedCoins)
                    let priceDiff = ((kuCoinUSDT - totalFeeUSDT) - wazrixUsdt) * wazrixUSDTPrice

                    if (isFinite(priceDiff) && priceDiff > 0) {
                        let priceDiffElement =
                        {
                            coinName: kuCoinData.symbol.toUpperCase(),
                            currency: 'INR',
                            kuCoinPrice: kuCoinData.last,
                            gateIoPrice: tempGateIOCoinList[index].last,
                            priceDifference: priceDiff
                        }

                        tempPriceDiffList.push(priceDiffElement)
                    }
                }
            }
            setPriceDiffList(tempPriceDiffList)
        }
    }

    useEffect(() => {

        if (Config.apiCallTime > 0) {
            if (isReverseCalculationEnabled) {
                let interval = setInterval(async () => {
                    await getRevPriceDifference()
                }, Config.apiCallTime)

                return () => {
                    clearInterval(interval)
                }
            }
            else {
                let interval = setInterval(async () => {
                    await getDiffPriceList()
                }, Config.apiCallTime)

                return () => {
                    clearInterval(interval)
                }
            }
        }
    }, [isReverseCalculationEnabled])

    // returning html
    return (
        <section className={'content'}>
            <div className={'container-fluid'}>
                <div className={'card'}>
                    <div className={'card-header bg-primary text-light font-weight-bold'}>
                        Filters
                    </div>
                    <div className={'card-body'}>
                        <div className={'row'}>
                            <div className={'col-md-3'}>
                                <div className={'form-group'}>
                                    <label htmlFor="exampleInput1"> Coin Name</label>
                                    <input className={'form-control'} type={'text'} placeholder={'Coin Name'}
                                    // value={tempCoin}
                                    // onChange={(e) => {
                                    //     setTempCoin(e.currentTarget.value)
                                    // }}
                                    />
                                </div>
                            </div>

                            <div className={'col-md-3'}>
                                <div className={'form-group'}>
                                    <label htmlFor="exampleInput1"> Currency</label>
                                    <select className={'form-control'}
                                    // value={tempShowPair}
                                    // onChange={(e) => {
                                    //     setTempShowPair(e.currentTarget.value)
                                    // }}
                                    >
                                        <option value={''}>All</option>
                                        <option value={'inr'}>INR</option>
                                        <option value={'usdt'}>USDT</option>
                                        <option value={'btc'}>BTC</option>
                                        <option value={'wrx'}>WRX</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-md-12'}>
                                {/* <button onClick={async (e) => await changeFilter(e)} className={'btn btn-primary'}>Search</button> */}
                                {/* <button onClick={async (e) => await clearFilter(e)} className={'btn btn-primary ml-2'}>Clear Filter</button> */}
                                <button onClick={async (e) => {
                                    if (isReverseCalculationEnabled) {
                                        setPriceDiffList([])
                                        setIsReverseCalculationEnabled(false)
                                    }
                                    else {
                                        setPriceDiffList([])
                                        setIsReverseCalculationEnabled(true)
                                    }
                                }} className={isReverseCalculationEnabled ? 'btn btn-danger ml-2' : 'btn btn-primary ml-2'}>Reverse Calculation</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'card card-primary mt-2'}>
                    <div className={'card-header bg-danger text-light font-weight-bold'}>
                        Coins List
                    </div>
                    <div className={'card-body table-responsive p-0'}>
                        <table className={'table table-bordered table-striped'}>
                            <thead>
                                <tr>
                                    <th>Coin Name</th>
                                    <th>Difference INR</th>
                                    <th>Currency</th>
                                    <th>KuCoin Price</th>
                                    <th>GateIO Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    priceDiffList && priceDiffList.length > 0
                                        ?
                                        priceDiffList.map((element, key) => {
                                            if (element.priceDifference > 0) {
                                                return (
                                                    <tr key={key}>
                                                        <th className={'text-primary'}>{element && element.coinName ? element.coinName.toUpperCase() : ''}</th>
                                                        <th className={element.priceDifference >= 0 ? 'text-success' : 'text-danger'}>{element && element.priceDifference ? element.priceDifference.toFixed(2) : ''}</th>
                                                        <th className={'text-info'}>{element && element.currency ? element.currency.toUpperCase() : ''}</th>
                                                        <th className={'text-success'}>{element && element.kuCoinPrice ? element.kuCoinPrice : ''}</th>
                                                        <th className={'text-danger'}>{element && element.gateIoPrice ? element.gateIoPrice : ''}</th>
                                                    </tr>
                                                )
                                            }
                                        })
                                        :
                                        <></>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}