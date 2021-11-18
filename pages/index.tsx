import type { NextPage } from "next";
import Logo from "../components/Logo";
import PositiveButton from "../components/PositiveButton";
import { useRouter } from "next/router";
import ModalTicket from "../components/Patient/ModalTicket";
import { showTicketModal } from "../store/ticketModal/actions";
import { useDispatch, useSelector } from "react-redux";
import { getUserState } from "../store/user/selectors";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // check is already signin?
  const userData = useSelector(getUserState);

  // event handle section
  const handleClickPatient = () => {
    dispatch(showTicketModal())
  };

  const handleClickGoToLogin = () => {
    // check api fetch
    console.log(userData)
    if(userData.loadStatus === true){
      if(userData.login === true && userData.userinfo){
        // redirect...
        if(userData.userinfo.role === 'system_admin'){
          router.push("/system");
        }
        if(userData.userinfo.role === 'hospital'){
          router.push("/hospital");
        }
      }
      else{
        router.push("/login");
      }
    }
  };

  return (
    <div className="tw-mx-auto tw-w-4/5 lg:tw-w-1/2 tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-2/4 tw--translate-y-2/4">
      <Logo />
      <div className="tw-flex tw-justify-center tw-flex-col md:tw-flex-row">
        <PositiveButton
          id="patient"
          className="md:tw-mr-5 tw-w-full md:tw-w-2/5"
          onClick={handleClickPatient}
          text="Patient"
        />
        <PositiveButton
          id="staff"
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
