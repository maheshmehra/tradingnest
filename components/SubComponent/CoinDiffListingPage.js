import Config from "@/utils/Config"
import { useState, useEffect } from "react"
import { GetBinanceCoinsList } from "../apis/binance_apis/GetBinanceCoinsList"
import { GetWazrixCoinsPrice } from "../apis/wazrix_apis/GetWazrixCoinPrice"
import { GetWazrixCoinsList } from "../apis/wazrix_apis/GetWazrixCoinsList"

export default function CoinDifferenceListing(props) {
    // states 
    let [tds, setTDS] = useState(0.01)
    let [wazrixUSDTPrice, setWazrixUSDTPrice] = useState(87.30)
    let [portfolioPrice, setPortfolioPrice] = useState(100000)
    let [priceDiffList, setPriceDiffList] = useState([])
    let [isReverseCalculationEnabled, setIsReverseCalculationEnabled] = useState(false)

    // function for get price list
    let getPriceList = async () => {

        // getting wazrix usdt price
        let wazrixRes = await GetWazrixCoinsPrice(props, 'usdtinr')

        if (wazrixRes && wazrixRes.bidPrice) {
            setWazrixUSDTPrice(parseFloat(wazrixRes.bidPrice))
        }
        else {
            setWazrixUSDTPrice(parseFloat(Config.defaultWazrixUSDTPrice))
        }

        // getting binance price list
        let binanceResponse = await GetBinanceCoinsList()
        let tempBinanceList = []
        let tempWazrixList = []

        if (Array.isArray(binanceResponse)) {
            binanceResponse.map((element) => {
                if (element.symbol.endsWith('USDT')) {
                    tempBinanceList.push(element)
                }
            })
        }
        else {
            return
        }

        // getting wazrix price list
        let wazrixResponse = await GetWazrixCoinsList()

        if (Array.isArray(wazrixResponse)) {
            wazrixResponse.map((element) => {
                if (element.quoteAsset.toUpperCase() === 'INR') {
                    tempWazrixList.push(element)
                }
            })
        }
        else {
            return
        }

        // getting inr list
        if (tempWazrixList && tempWazrixList.length > 0 && tempBinanceList && tempBinanceList.length > 0) {
            let tempPriceDiffList = []
            for (let binanceIndex in tempBinanceList) {
                let coinName = tempBinanceList[binanceIndex].symbol.split('USDT')[0]

                let wazrixCoin = tempWazrixList.find((element) => element.baseAsset.toUpperCase() === coinName)

                if (wazrixCoin) {
                    let binanceCoinPrice = parseFloat(tempBinanceList[binanceIndex].askPrice)
                    let wazrixUsdt = portfolioPrice / wazrixUSDTPrice
                    let purchasedCoin = wazrixUsdt / binanceCoinPrice
                    let wazrixSellPrice = purchasedCoin * parseFloat(wazrixCoin.bidPrice)
                    let priceDiff = (wazrixSellPrice - wazrixSellPrice * tds) - wazrixUsdt * wazrixUSDTPrice

                    if (isFinite(priceDiff) && priceDiff > 0) {
                        let priceDiffElement =
                        {
                            coinName: wazrixCoin.baseAsset.toUpperCase(),
                            currency: 'INR',
                            wazrixPrice: wazrixCoin.lastPrice,
                            binancePrice: tempBinanceList[binanceIndex].lastPrice,
                            priceDifference: priceDiff
                        }

                        tempPriceDiffList.push(priceDiffElement)
                    }
                }
            }

            setPriceDiffList(tempPriceDiffList)
        }


    }

    // function for reverse calculation
    let getReversePriceList = async () => {

        // getting wazrix usdt price
        let wazrixRes = await GetWazrixCoinsPrice(props, 'usdtinr')

        if (wazrixRes && wazrixRes.bidPrice) {
            setWazrixUSDTPrice(parseFloat(wazrixRes.bidPrice))
        }
        else {
            setWazrixUSDTPrice(parseFloat(Config.defaultWazrixUSDTPrice))
        }

        // getting binance price list
        let binanceResponse = await GetBinanceCoinsList()
        let tempBinanceList = []
        let tempWazrixList = []

        if (Array.isArray(binanceResponse)) {
            binanceResponse.map((element) => {
                if (element.symbol.endsWith('USDT')) {
                    tempBinanceList.push(element)
                }
            })
        }
        else {
            return
        }

        // getting wazrix price list
        let wazrixResponse = await GetWazrixCoinsList()

        if (Array.isArray(wazrixResponse)) {
            wazrixResponse.map((element) => {
                if (element.quoteAsset.toUpperCase() === 'INR') {
                    tempWazrixList.push(element)
                }
            })
        }
        else {
            return
        }

        if (tempWazrixList && tempWazrixList.length > 0 && tempBinanceList && tempBinanceList.length > 0) {
            let tempPriceDiffList = []
            for (let binanceIndex in tempBinanceList) {
                let coinName = tempBinanceList[binanceIndex].symbol.split('USDT')[0]

                let wazrixCoin = tempWazrixList.find((element) => element.baseAsset.toUpperCase() === coinName)

                if (wazrixCoin) {
                    let binanceCoinPrice = parseFloat(tempBinanceList[binanceIndex].bidPrice)
                    let wazrixBuyCoin = portfolioPrice / parseFloat(wazrixCoin.askPrice)
                    let priceDiff = binanceCoinPrice * wazrixBuyCoin
                    priceDiff = priceDiff * wazrixUSDTPrice
                    priceDiff = (priceDiff - priceDiff * tds) - portfolioPrice

                    if (isFinite(priceDiff) && priceDiff > 0) {
                        let priceDiffElement =
                        {
                            coinName: wazrixCoin.baseAsset.toUpperCase(),
                            currency: 'INR',
                            wazrixPrice: wazrixCoin.lastPrice,
                            binancePrice: tempBinanceList[binanceIndex].lastPrice,
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
                    await getReversePriceList()
                }, Config.apiCallTime)

                return () => {
                    clearInterval(interval)
                }

            }
            else {

                let interval = setInterval(async () => {
                    await getPriceList()
                }, Config.apiCallTime)

                return () => {
                    clearInterval(interval)
                }

            }
        }
    }, [isReverseCalculationEnabled])

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
                                <button onClick={async (e) => await changeFilter(e)} className={'btn btn-primary'}>Search</button>
                                &nbsp;<button onClick={async (e) => await clearFilter(e)} className={'btn btn-primary ml-1'}>Clear Filter</button>
                                &nbsp;<button onClick={async (e) => {
                                    if (isReverseCalculationEnabled) {
                                        setPriceDiffList([])
                                        setIsReverseCalculationEnabled(false)
                                    }
                                    else {
                                        setPriceDiffList([])
                                        setIsReverseCalculationEnabled(true)
                                    }
                                }} className={isReverseCalculationEnabled ? 'btn btn-danger ml-1' : 'btn btn-primary ml-1'}>Rev Cal</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'card card-primary mt-2'}>
                    <div className={'card-header bg-danger text-light font-weight-bold'}>
                        Coins List
                    </div>
                    <div className={'card-body table-responsive p-0'}>
                        <table className={'table table-bordered table-striped overflow-auto'}>
                            <thead>
                                <tr>
                                    <th>Coin Name</th>
                                    <th>Difference INR</th>
                                    <th>Currency</th>
                                    <th>Wazrix Price</th>
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
                                                        <th className={'text-primary'}>{element && element.wazrixPrice ? element.wazrixPrice : ''}</th>
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