import { showToast } from "../../utils/toast";

const MapCircleButton = () => {
  const handleClick = () => {
    showToast("خطایی رخ داد", "error");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        position: "absolute",
        top: "75px",
        right: "20px",
        zIndex: 10000,

        padding: "12px 20px",

        backgroundColor: "#111827",
        color: "#ffffff",

        border: "none",
        borderRadius: "8px",

        cursor: "pointer",

        fontSize: "14px",
        fontWeight: 600,

        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      Map Circle
    </button>
  );
};

export default MapCircleButton;
