import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      rtl
    />
  );
};

export default ToastProvider;