import Head from "next/head";

export default function CommonStyleSheet(props)
{
    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
        </>
    )
}