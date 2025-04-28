import React from "react";

const BottomContent = ({ title, content, btnText }) => {
  return (
    <div className="desc-main-block">
      <div className="desc-content">
      <h1 className="desc-heading">{title}</h1>
      <p className="desc-body">{content}</p>
      </div>

      {btnText.length > 0 && <button className="primary-btn">{btnText}</button>}
    </div>
  );
};

export default BottomContent;
