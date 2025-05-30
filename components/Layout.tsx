import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

type Props = {
  children?: ReactNode
  title?: string
  carUri?: string
}

const Layout = ({ children, title = 'This is the default title', carUri = 'cars' }: Props) => {
  const router = useRouter()
  const carPath = `/${carUri}`
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link className={router?.pathname === '/' ? 'current' : undefined} href="/">Home</Link>
          <Link className={router?.pathname === '/about' ? 'current' : undefined} href="/about">About</Link>
          <Link className={router?.pathname === carPath ? 'current' : undefined} href={carPath}>Cars</Link>
          <Link href="/api/cars" target='_blank'>Cars API</Link>
          <Link href="/api/page" target='_blank'>Page Info API</Link>
        </nav>
      </header>
      <div className='layout'>
        {children}
      </div>
      <footer>
        <hr />
        <span>Drive Footer</span>
      </footer>
    </div>
  )
}

export default Layout
