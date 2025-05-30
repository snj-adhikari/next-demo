import type { AppProps } from 'next/app'
import '../styles/app.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}