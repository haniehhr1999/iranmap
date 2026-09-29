import ToastProvider from "./components/alert/ToastProvider";
import IranMap from "./components/map/IranMap";

function App() {
  return (
    <>
      <IranMap />

      <ToastProvider />
    </>
  );
}

export default App;