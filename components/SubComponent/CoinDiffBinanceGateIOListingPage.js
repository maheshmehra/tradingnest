import Config from "@/utils/Config"
import { useState, useEffect } from "react"
import { GetBinanceCoinsList } from "../apis/binance_apis/GetBinanceCoinsList"
import { GetGateIOCoinsList } from "../apis/gateIO_apis/GetGateIOCoinsList"
import { GetWazrixCoinsPrice } from "../apis/wazrix_apis/GetWazrixCoinPrice"

export default function CoinDiffBinanceGateIOListingPage(props) {
    // states
    let [wazrixUSDTPrice, setWazrixUSDTPrice] = useState(87.30)
    let [portfolioPrice, setPortfolioPrice] = useState(100000)
    let [priceDiffList, setPriceDiffList] = useState([])
    let [isReverseCalculationEnabled, setIsReverseCalculationEnabled] = useState(false)
    let [totalFeeUSDT, setTotalFeeUSDT] = useState(15)

    // function for difference from binance to kucoin
    let getDiffPriceList = async () => {

        if (isReverseCalculationEnabled) {
            return
        }

        // getting wazrix usdt price
        let wazrixRes = await GetWazrixCoinsPrice(props, 'usdtinr')

        if (wazrixRes && wazrixRes.bidPrice) {
            setWazrixUSDTPrice(parseFloat(wazrixRes.bidPrice))
        }
        else {
            setWazrixUSDTPrice(parseFloat(Config.defaultWazrixUSDTPrice))
        }

        let tempBinanceCoinList = []
        let tempGateIOCoinList = []

        // getting binance price list
        let binanceResponse = await GetBinanceCoinsList()

        if (Array.isArray(binanceResponse)) {
            binanceResponse.map((element) => {
                if (element.symbol.endsWith('USDT')) {
                    tempBinanceCoinList.push(element)
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
        if (tempBinanceCoinList && tempBinanceCoinList.length > 0 && tempGateIOCoinList && tempGateIOCoinList.length > 0) {
            let tempPriceDiffList = []
            for (let binanceIndex in tempBinanceCoinList) {
                let coinName = tempBinanceCoinList[binanceIndex].symbol.split('USDT')[0]

                let gateIOData = tempGateIOCoinList.find((element) => element.currency_pair.toUpperCase() === (coinName + '_USDT'))

                if (gateIOData) {
                    let binanceCoinPrice = parseFloat(tempBinanceCoinList[binanceIndex].askPrice)
                    let wazrixUsdt = portfolioPrice / wazrixUSDTPrice
                    let purchasedCoin = wazrixUsdt / binanceCoinPrice
                    let gateIOSellPrice = purchasedCoin * parseFloat(gateIOData.highest_bid)
                    let priceDiff = ((gateIOSellPrice - totalFeeUSDT) - wazrixUsdt) * wazrixUSDTPrice


                    if (isFinite(priceDiff) && priceDiff > 0) {
                        let priceDiffElement =
                        {
                            coinName: gateIOData.currency_pair.toUpperCase(),
                            currency: 'INR',
                            gateIOCoinPrice: gateIOData.last,
                            binancePrice: tempBinanceCoinList[binanceIndex].lastPrice,
                            priceDifference: priceDiff
                        }

                        tempPriceDiffList.push(priceDiffElement)
                    }

                }
            }

            setPriceDiffList(tempPriceDiffList)
        }
    }

    // reverse calculation
    let getRevPriceDifference = async () => {

        if (!isReverseCalculationEnabled) {
            return
        }

        // getting wazrix usdt price
        let wazrixRes = await GetWazrixCoinsPrice(props, 'usdtinr')

        if (wazrixRes && wazrixRes.bidPrice) {
            setWazrixUSDTPrice(parseFloat(wazrixRes.bidPrice))
        }
        else {
            setWazrixUSDTPrice(parseFloat(Config.defaultWazrixUSDTPrice))
        }

        let tempBinanceCoinList = []
        let tempGateIOCoinList = []

        // getting binance price list
        let binanceResponse = await GetBinanceCoinsList()

        if (Array.isArray(binanceResponse)) {
            binanceResponse.map((element) => {
                if (element.symbol.endsWith('USDT')) {
                    tempBinanceCoinList.push(element)
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
        if (tempBinanceCoinList && tempBinanceCoinList.length > 0 && tempGateIOCoinList && tempGateIOCoinList.length > 0) {
            let tempPriceDiffList = []
            for (let binanceIndex in tempBinanceCoinList) {
                let coinName = tempBinanceCoinList[binanceIndex].symbol.split('USDT')[0]

                let gateIOData = tempGateIOCoinList.find((element) => element.currency_pair.toUpperCase() === (coinName + '_USDT'))

                if (gateIOData) {
                    // kucoin 
                    let gateIOPrice = parseFloat(gateIOData.highest_bid)
                    let wazrixUsdt = portfolioPrice / wazrixUSDTPrice
                    let gateIOPurchasedPrice = wazrixUsdt / gateIOPrice

                    // binance
                    let binanceCoinPrice = parseFloat(tempBinanceCoinList[binanceIndex].bidPrice)
                    let priceDiff = (binanceCoinPrice * gateIOPurchasedPrice) - wazrixUsdt
                    priceDiff = (priceDiff - totalFeeUSDT) * wazrixUSDTPrice

                    let priceDiffElement =
                    {
                        coinName: gateIOData.currency_pair.toUpperCase(),
                        currency: 'INR',
                        gateIOCoinPrice: gateIOData.last,
                        binancePrice: tempBinanceCoinList[binanceIndex].lastPrice,
                        priceDifference: priceDiff
                    }

                    tempPriceDiffList.push(priceDiffElement)
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
                        <div className={'row mt-2'}>
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
                                    <th>GateIO Price</th>
                                    <th>Binance Price</th>
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
                                                        <th className={'text-success'}>{element && element.gateIOCoinPrice ? element.gateIOCoinPrice : ''}</th>
                                                        <th className={'text-danger'}>{element && element.binancePrice ? element.binancePrice : ''}</th>
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