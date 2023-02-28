import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import SessionBox from '@/components/SessionComponent/SessionBox'
import CommonStyleSheet from '@/components/common/CommonStyleSheet'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <CommonStyleSheet title={'Wazrix Price'}/>
      <SessionBox page={'wazrix'}/>
    </>
  )
}
