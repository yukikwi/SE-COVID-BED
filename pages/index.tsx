import type { NextPage } from 'next'
import Logo from '../components/Logo'
import PositiveButton from '../components/PositiveButton'

const Home: NextPage = () => {
  return (
    <div className="tw-mx-auto tw-w-4/5 md:tw-w-1/2 tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-2/4 tw--translate-y-2/4">
      <Logo />
      <div className="tw-flex tw-justify-center tw-flex-col md:tw-flex-row">
        <PositiveButton className="md:tw-mr-5 tw-w-full md:tw-w-auto" target="/" text="Patient" />
        <PositiveButton className="tw-mt-3 md:tw-mt-0 tw-w-full md:tw-w-auto" target="/login" text="Staff" />
      </div>
    </div>
  )
}

export default Home
