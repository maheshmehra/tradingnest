import Link from "next/link";
import { useRouter } from "next/router";

export default function NavHeader(props) {
    // router
    let router = useRouter()

    return (
        <>
            <nav className={'navbar navbar-expand-lg navbar-light bg-light mb-2'}>
                <div className={'container-fluid'}>
                    <a className={'navbar-brand'} href="#"><span className={'text-danger font-weight-bold'}>Trading</span><span className={'text-primary font-weight-bold'}>Nest</span></a>
                    <button className={'navbar-toggler'} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">
                        <span className={'navbar-toggler-icon'}></span>
                    </button>
                    <div className={'collapse navbar-collapse'} id="navbarNavDropdown">
                        <ul className={'navbar-nav'}>
                            <li className={'nav-item'}>
                                <Link href={'/'} className={router.route === '/' ? 'nav-link active text-primary' : 'nav-link'}>
                                    Wazrix Price
                                </Link>

                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/binance_price'} className={router.route === '/binance_price' ? 'nav-link active text-primary' : 'nav-link'}>
                                    Binance Price
                                </Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/price_difference'} className={router.route === '/price_difference' ? 'nav-link active text-primary' : 'nav-link'}>
                                    Price Difference
                                </Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/binance_kucoin_diff'} className={router.route === '/binance_kucoin_diff' ? 'nav-link active text-primary' : 'nav-link'}>
                                    Binance KuCoin Diff
                                </Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/kucoin_gateio_diff'} className={router.route === '/kucoin_gateio_diff' ? 'nav-link active text-primary' : 'nav-link'}>
                                    KuCoin GateIO Diff
                                </Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/binance_gateio_diff'} className={router.route === '/binance_gateio_diff' ? 'nav-link active text-primary' : 'nav-link'}>
                                    Binance GateIO Diff
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}