import { useSelector } from "react-redux";
import { BrowserRouter as Routes } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import ToastMessage from "../components/Toast/toast";
import RoutersList from "../customRouter/RoutersList";

function App() {
  const { showToast } = useSelector((state) => state.toast);
  const { isLoading } = useSelector((state) => state.loading);
  return (
    <>
      {showToast && <ToastMessage />}
      {isLoading && <Loading />}
      <div>
        <Routes>
          <RoutersList />
        </Routes>
      </div>
    </>
  );
}

export default App;
