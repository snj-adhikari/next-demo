import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { Car, PageData } from '../../interfaces'
import Layout from '../../components/Layout'
import { PageTemplate } from '../../components/template'

type Props = {
  cars: Car[]
  pageInfo: PageData
}

const WithServerSideProps = ({ cars, pageInfo }: Props) => {
  console.log({cars, pageInfo})
  
  return (

    <Layout title="Users List | Next.js + TypeScript Example">
      <PageTemplate cars={cars} pageInfo={pageInfo}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  // Example for including serverSide props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  // Fetch pageInfo and Cars Data via api and pass that to client

  const cars = []
  const page = {}
  return { props: { cars, pageInfo: page } }
}

export default WithServerSideProps
