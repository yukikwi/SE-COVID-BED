import type { NextPage } from "next";
import Logo from "../components/Logo";
import PositiveButton from "../components/PositiveButton";
import { useRouter } from "next/router";
import ModalTicket from "../components/Patient/ModalTicket";
import { showTicketModal } from "../store/ticketModal/actions";
import { useDispatch } from "react-redux";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickPatient = () => {
    dispatch(showTicketModal())
  };

  const handleClickGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="tw-mx-auto tw-w-4/5 lg:tw-w-1/2 tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-2/4 tw--translate-y-2/4">
      <Logo />
      <div className="tw-flex tw-justify-center tw-flex-col md:tw-flex-row">
        <PositiveButton
          className="md:tw-mr-5 tw-w-full md:tw-w-2/5"
          onClick={handleClickPatient}
          text="Patient"
        />
        <PositiveButton
          className="tw-mt-3 md:tw-mt-0 tw-w-full md:tw-w-2/5"
          onClick={handleClickGoToLogin}
          text="Staff"
        />
      </div>

      <ModalTicket />
    </div>
  );
};

export default Home;
