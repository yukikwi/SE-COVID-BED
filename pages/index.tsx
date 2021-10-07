import type { NextPage } from 'next'
import Logo from '../components/Logo'
import PositiveButton from '../components/PositiveButton'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="tw-mx-auto tw-w-4/5 lg:tw-w-1/2 tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-2/4 tw--translate-y-2/4">
        <Logo />
        <div className="tw-flex tw-justify-center tw-flex-col md:tw-flex-row">
          <PositiveButton className="md:tw-mr-5 tw-w-full md:tw-w-2/5" target="/" text="Patient" />
          <PositiveButton className="tw-mt-3 md:tw-mt-0 tw-w-full md:tw-w-2/5" target="/login" text="Staff" />
        </div>
      </div>
    </Layout>
  )
}

export default Home
