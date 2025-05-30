import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Car, PageData } from '../../interfaces'
import Layout from '../../components/Layout'
import { PageTemplate } from '../../components/PageTemplate'

type Props = {
  cars: Car[]
  pageInfo: PageData
}

const WithServerSideProps = ({ cars, pageInfo }: Props) => {
  const { title: carTitle = 'Cars List', uri: carUri = 'cars' } = pageInfo || {};
  return (
    <Layout title={carTitle +"| Next.js + TypeScript Example"} carUri={carUri}>
      <PageTemplate cars={cars} pageInfo={pageInfo}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const carsResponse = await fetch(`${baseUrl}/api/cars`);
    const pageResponse = await fetch(`${baseUrl}/api/page`);

    if (!carsResponse.ok || !pageResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const carsData: Car[] = await carsResponse.json();
    const pageInfo: PageData = await pageResponse.json();

    return { props: { cars: carsData, pageInfo: pageInfo } };
  } catch (error) {
    console.error("Error fetching data in getServerSideProps:", error);
    return { props: { cars: [], pageInfo: null } };
  }
}

export default WithServerSideProps