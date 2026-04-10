import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "./redux/authSlice";
import Routing from "./router/Routing";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("admin");
    if (saved) {
      dispatch(setAdmin(JSON.parse(saved)));
    }
  }, []);
  return (
    <>
      <section className="bg-gray-100">
        <Toaster position="top-right" reverseOrder={false} />
        <Routing />
      </section>
    </>
  )
}

export default App