import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel={'stylesheet'} href={'../../css/bootstrap.min.css'}/>
        <link rel={'stylesheet'} href={'../../css/bootstrap-grid.min.css'}/>
        <link rel={'stylesheet'} href={'../../css/bootstrap-reboot.min.css'}/>
        <script src='../../js/jquery-3.6.3.min.js'></script>
        <script src='../../js/bootstrap.min.js'></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
