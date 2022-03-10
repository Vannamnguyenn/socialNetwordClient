import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Routes } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import ToastMessage from "../components/Toast/toast";
import RoutersList from "../customRouter/RoutersList";
import io from "socket.io-client";
import { useEffect } from "react";
import Socket from "../socket";
import { GlobalTypes } from "../redux/types/globalTypes";
import UpdatePostModal from "../components/Modals/UpdatePostModal";
import CallModal from "../components/Modals/CallModal";
import Peer from "peerjs";

function App() {
  const { showToast } = useSelector((state) => state.toast);
  const { isLoading } = useSelector((state) => state.loading);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const call = useSelector((state) => state.call);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://localhost:5000/");
    dispatch({
      type: GlobalTypes.SOCKET,
      payload: socket,
    });
    return () => {
      socket.close();
    };
  }, [user, dispatch]);

  useEffect(() => {
    const peer = new Peer(undefined, {
      host: "/",
      port: "3001",
    });
    dispatch({
      type: GlobalTypes.PEER,
      payload: peer,
    });
  }, [user, dispatch]);

  return (
    <>
      {showToast && <ToastMessage />}
      {isLoading && <Loading />}
      {isAuthenticated && <Socket />}
      {call && isAuthenticated && <CallModal />}
      <UpdatePostModal />
      <>
        <Routes>
          <RoutersList />
        </Routes>
      </>
    </>
  );
}

export default App;
