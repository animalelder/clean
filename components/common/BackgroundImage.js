import React from "react";

const BackgroundImage = ({
  children,
  imageUrl = "/api/placeholder/1920/1080",
  className = "",
}) => {
  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Optional Overlay */}

      {/* Content */}
      <div className={`relative z-20 ${className}`}>{children}</div>
    </div>
  );
};

export default BackgroundImage;
