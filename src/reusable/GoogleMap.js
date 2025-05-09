import React, { useEffect, useState } from "react";

const GoogleMap = ({ position }) => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    setLocation(`https://www.google.com/maps?q=${position}&t=k&output=embed`);
  }, []);

  return location ? (
    <iframe
      src={location}
      height="300"
      style={{ border: 0, width: "100%", borderRadius:"8px" }}
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  ) : (
    <div>Loading</div>
  );
};

export default GoogleMap;
