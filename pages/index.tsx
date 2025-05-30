import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Drive Home">
    <h1>Hello Drive Team 👋</h1>
    <p>
      <Link href="/about">About</Link>
    </p>
  </Layout>
)

export default IndexPage
