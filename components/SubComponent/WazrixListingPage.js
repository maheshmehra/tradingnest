import { useEffect, useState } from "react"
import { GetWazrixCoinsList } from "../apis/wazrix_apis/GetWazrixCoinsList"
import Config from "../../utils/Config"
import LoadingScreen from "@/components/Modals/LoadingScreen";

export default function WazrixListingPage(props) {
    // states
    let [showAnimator, setShowAnimator] = useState(true)
    let [coinsList, setCoinsList] = useState([])
    let [showPair, setShowPair] = useState('')
    let [tempShowPair, setTempShowPair] = useState('')
    let [tempCoin, setTempCoin] = useState('')
    let [coin, setCoin] = useState('')

    // function for get wazrix coins data
    let getWazrixCoinsList = async () => {
        let response = await GetWazrixCoinsList()

        if (Array.isArray(response)) {
            setCoinsList(response)
        }

        if(showAnimator)
        {
            setShowAnimator(false)
        }
    }

    // function for clear filter
    let clearFilter = async (e) => {
        e.preventDefault()
        await setShowPair('')
        await setCoin('')
        await setTempCoin('')
        await setTempShowPair('')
        await setShowPair(tempShowPair)
        await setCoin(tempCoin)
    }

    useEffect(() => {
        if (Config.apiCallTime > 0) {
            let interval = setInterval(async () => {
                await getWazrixCoinsList()
            }, Config.apiCallTime)

            return () => {
                clearInterval(interval)
            }
        }
    }, [])

    return (
        <section className={'content'}>
            <div className={!showAnimator ? 'container-fluid showAnimator' : 'container-fluid hideAnimator'}>
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
                                        value={tempCoin}
                                        onChange={(e) => {
                                            setTempCoin(e.currentTarget.value)
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={'col-md-3'}>
                                <div className={'form-group'}>
                                    <label htmlFor="exampleInput1"> Currency</label>
                                    <select className={'form-control'}
                                        value={tempShowPair}
                                        onChange={(e) => {
                                            setTempShowPair(e.currentTarget.value)
                                        }}
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
                                &nbsp;<button onClick={async (e) => await clearFilter(e)} className={'btn btn-primary'}>Clear Filter</button>
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
                                    <th>Currency</th>
                                    <th>Price</th>
                                    <th>Volume</th>
                                    <th>Buying Price</th>
                                    <th>Selling Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    coinsList && coinsList.length > 0
                                        ?
                                        coinsList.map((element, key) => {
                                            return (
                                                <tr key={key} hidden={element && element.quoteAsset !== showPair && showPair !== '' || element.baseAsset !== coin.toLocaleLowerCase() && coin !== ''}>
                                                    <th className={'text-primary'}>{element && element.baseAsset ? element.baseAsset.toUpperCase() : ''}</th>
                                                    <th className={'text-info'}>{element && element.quoteAsset ? element.quoteAsset.toUpperCase() : ''}</th>
                                                    <th>{element && element.lastPrice ? element.lastPrice : ''}</th>
                                                    <th>{element && element.volume ? element.volume : ''}</th>
                                                    <th className={'text-success'}>{element && element.bidPrice ? element.bidPrice : ''}</th>
                                                    <th className={'text-danger'}>{element && element.askPrice ? element.askPrice : ''}</th>
                                                </tr>
                                            )
                                        })
                                        :
                                        <></>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <LoadingScreen showAnimator={showAnimator}/>
        </section>
    )
}