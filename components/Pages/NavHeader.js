import Link from "next/link";

export default function NavHeader(props) {
    return (
        <>
            <nav className={'navbar navbar-expand-lg navbar-light bg-light mb-2'}>
                <div className={'container-fluid'}>
                    <a className={'navbar-brand'} href="#">Navbar</a>
                    <button className={'navbar-toggler'} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={'navbar-toggler-icon'}></span>
                    </button>
                    <div className={'collapse navbar-collapse'} id="navbarNavDropdown">
                        <ul className={'navbar-nav'}>
                            <li className={'nav-item'}>
                                <Link href={'/'} className={'nav-link'}>
                                    Wazrix Price
                                </Link>

                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/binance_price'} className={'nav-link'}>
                                    Binance Price
                                </Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/price_difference'} className={'nav-link'}>
                                    Price Difference
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}