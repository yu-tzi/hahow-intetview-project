import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import HeroList from './heroes/heroList'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <HeroList />
    <Component {...pageProps} />
  </>
}
