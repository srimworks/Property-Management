import React, { useRef } from "react";
import "../styles/ImagesPopup.css";

const ImagesPopup = ({ images, close }) => {
  const scroll = useRef(null);

  const scrollLeft = () => {
    if (scroll.current) {
      scroll.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    scroll.current.scrollBy({ left: 400, behavior: "smooth" });
  };
  return (
    <div className="images-popup-container">
      <span className="material-symbols-outlined arrow" onClick={() => close()}>
        close
      </span>
      <div className="images-popup-content">
        <span className="material-symbols-outlined arrow" onClick={scrollLeft}>
          arrow_back_ios
        </span>
        <div className="image-container-in-popup" ref={scroll}>
          {images.map((item, index) => (
            <div className="image-div-property" key={index}>
              <img
                src={item}
                className="img-property"
                onClick={() => window.open(item, "_blank")}
              />
            </div>
          ))}
        </div>
        <span className="material-symbols-outlined arrow" onClick={scrollRight}>
          arrow_forward_ios
        </span>
      </div>
    </div>
  );
};

export default ImagesPopup;
