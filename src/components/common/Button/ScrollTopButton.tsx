import { PiArrowCircleUp } from "react-icons/pi";

function ScrollTop() {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <PiArrowCircleUp 
      onClick={handleTop}
      size={50}
      style={{
        position: "fixed",
        bottom: "60px",
        right: "20px",
        color: "grey",
        cursor: "pointer",
        zIndex: 1000,   
      }}    
    />
  );
}

export default ScrollTop;
