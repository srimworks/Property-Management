import React, { useRef } from "react";
import { IMAGES } from "../utils/images";

const InputFeilds = ({ input, value, onChange }) => {
    const fileInputRef = useRef(null)
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const fileURLs = files.map(file => URL.createObjectURL(file));
      onChange(input.id, [...(value || []), ...fileURLs]);
    };
  switch (input.type) {
    case "dropdown":
      return (
        <div className="input-container">
          <label>
            {input.label} {input.required ? "*" : ""}
          </label>
          <select
            name={input.id}
            required={input.required}
            onChange={(e) => onChange(input.id, e.target.value)}
            defaultValue={value || "Select"}
          >
            {input.options.map((item) => (
              <option value={item} disabled={item === "Select"} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      );

    case "input":
      return (
        <div className="input-container">
          <label>
            {input.label} {input.required ? "*" : ""}
          </label>
          {input.subText ? (
            <div className="input-with-subtext">
              {input.preText && <span>{input.preText}</span>}
              <input
                value={value || ""}
                className="with-subtext-field"
                placeholder={input.placeHolder}
                onChange={(e) => onChange(input.id, e.target.value)}
              />
              <span>{input.subText}</span>
            </div>
          ) : (
            <input
              className="input-box"
              value={value || ""}
              placeholder={input.placeHolder}
              onChange={(e) => onChange(input.id, e.target.value)}
            />
          )}
        </div>
      );

      case "getLocation":
        const handleGetLocation = () => {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const { latitude, longitude } = pos.coords;
      
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await response.json();
                const locationName = data.address?.suburb || data.address?.city || data.display_name;
                onChange(input.id, locationName);
              } catch (error) {
                console.error("Reverse geocoding failed", error);
                alert("Unable to fetch location name");
              }
            },
            (err) => {
              console.error("Error getting location", err);
              alert("Unable to get current location");
            }
          );
        };
      
        return (
          <div className="input-container">
            <label>
              {input.label}
              {input.required ? "*" : ""}
            </label>
            <div className="input-with-subtext">
              {input.locationIcon && <img src={input.locationIcon} alt="location" />}
              <input
                className="with-subtext-field"
                placeholder={input.placeHolder}
                value={value || ""}
                onChange={(e) => onChange(input.id, e.target.value)}
              />
            </div>
            <div className="gps-container" onClick={handleGetLocation}>
              <img src={input.GpsIcon} alt="GPS Icon" />
              <span>{input.GpsLabel}</span>
            </div>
          </div>
        );
      
    case "radio":
        return (
            <div className="input-container">
            <label>
                {input.label} {input.required ? "*" : ""}
            </label>
            <div className="option-container">
                {input.options.map((item) => {
                const inputId = `${input.id}-${item}`;
                return (
                    <div key={inputId} className="radio-container">
                    <input
                        id={inputId}
                        name={input.id}
                        value={item}
                        type="radio"
                        checked={value === item}
                        onChange={(e) => onChange(input.id, e.target.value)}
                    />
                    <label htmlFor={inputId}>{item}</label>
                    </div>
                );
                })}
            </div>
            </div>
        );
        
    case "checkbox":
      return (
        <div className="check-container">
          <label>
            {input.label}
            {input.required ? "*" : ""}
          </label>
          <div className="check-option-container">
            {input.options.map((item) => (
              <div key={item} className="radio-container">
                <input
                  value={item}
                  disabled={item === "Select"}
                  key={item}
                  type="checkbox"
                  id={item}
                  name={input.label}
                  checked={Array.isArray(value) && value.includes(item)}
                  onChange={(e) => {
                    const updated = value || [];
                    if (e.target.checked) {
                      onChange(input.id, [...updated, item]);
                    } else {
                      onChange(
                        input.id,
                        updated.filter((v) => v !== item)
                      );
                    }
                  }}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      );
    case "number":
      return (
        <div className="input-container">
          <label>
            {input.label} {input.required ? "*" : ""}
          </label>

          <div className="input-with-subtext">
            <img
              src={input.minusIcon}
              onClick={() => onChange(input.id, Math.max((value || 0) - 1, 0))}
            />
            <span>{value}</span>
            <img
              src={input.plusIcon}
              onClick={() => onChange(input.id, (value || 0) + 1)}
            />
          </div>
        </div>
      );
    case "date":
      return (
        <div className="input-container">
          <label>
            {input.label}
            {input.required ? "*" : ""}
          </label>
          <input
            type="date"
            required={input.required}
            className="input-box"
            value={value || ""}
            onChange={(e) => onChange(input.id, e.target.value)}
          />
        </div>
      );
    case "text-box":
      return (
        <div className="text-container">
          <label>
            {input.label} {input.required ? "*" : ""}
          </label>
          <textarea
            placeholder={input.placeHolder}
            required={input.required}
            className="text-area-box"
            value={value || ""}
            onChange={(e) => onChange(input.id, e.target.value)}
          ></textarea>
        </div>
      );

    
    case "select":
      return (
        <div className="input-container">
          <label>
            {input.label} {input.required ? "*" : ""}
          </label>
          <select
            name={input.id}
            required={input.required}
            value={value || ""}
            onChange={(e) => onChange(input.id, e.target.value)}
          >
            {input.options.map((item, index) => (
              <option key={index} value={item.title}>
                {item.title} - {item.subTitle}
              </option>
            ))}
          </select>
        </div>
      );

    case "upload":
    return (
        <div className="upload-container">
            <label htmlFor="choose-file" className="choose-file-container">
                <img src={IMAGES.CAMERA_ICON}/>
                <p className="choose-label-1"> {input.label} {input.required ? "*" : ""} </p>
                <p className="choose-label-2">90% tenants contact on properties with photos.</p>
                <input type="file" placeholder="Add Photos" id="choose-file" multiple ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                <button className="primary-btn" htmlFor="choose-file" onClick={() => fileInputRef.current && fileInputRef.current.click()}> Add Photos</button>
            </label>
            {Array.isArray(value) && <div className="image-preview-container">
        {value.map((imgSrc, idx) => (
          <div key={idx} className="image-wrapper">
            <img
              src={imgSrc}
              alt={`Upload preview ${idx}`}
              className="image-preview"
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => {
                const updatedImages = [...value];
                updatedImages.splice(idx, 1);
                onChange(input.id, updatedImages);
              }}
            >X
            </button>
          </div>
        ))}
      </div>}
          
        </div>
    );

  }
};

export default InputFeilds;
