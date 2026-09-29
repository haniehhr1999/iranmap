const MapShapeButton = () => {
  const handleClick = () => {
    alert("Map Shape Button Clicked!");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        position: "absolute",
        top: "20px",
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
      }}
    >
      Map Shape
    </button>
  );
};

export default MapShapeButton;