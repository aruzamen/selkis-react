import React from "react";

const Avatar = ({ initials, color = "#6366f1", size = 36 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.36,
      fontWeight: 700,
      color: "#fff",
      fontFamily: "var(--font-display)",
      flexShrink: 0,
      letterSpacing: "0.5px",
    }}
  >
    {initials}
  </div>
);

export default Avatar;
