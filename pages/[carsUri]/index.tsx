import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Car, PageData } from '../../interfaces'
import Layout from '../../components/Layout'
import { PageTemplate } from '../../components/PageTemplate'
import { sortCarsByFamilies } from '../../utils/helpers'

type Props = {
  cars: Car[]
  pageInfo: PageData
  carsUri: string
}

const WithServerSideProps = ({ cars, pageInfo, carsUri }: Props) => {
  const { title: carTitle = 'Cars List' } = pageInfo || {};
  return (
    <Layout title={ carTitle +" | Next.js + TypeScript Example"} carUri={carsUri}>
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

    const carsApiInfo = await carsResponse.json();
    const carsData: Car[] = sortCarsByFamilies(carsApiInfo as Car[]);
    const pageInfo: PageData = await pageResponse.json();
    const carsUri = pageInfo?.uri || '/cars-for-sale';

    return { props: { cars: carsData, pageInfo: pageInfo, carsUri:carsUri } };
  } catch (error) {
    console.error("Error fetching data in getServerSideProps:", error);
    return { props: { cars: [], pageInfo: null } };
  }
}

export default WithServerSideProps;