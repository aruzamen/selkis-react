import React from "react";

const RatingStars = ({ rating, reviews }) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ display: "flex", gap: "2px" }}>
        {"★".repeat(full).split("").map((s, i) => (
          <span key={`f${i}`} style={{ color: "#f59e0b", fontSize: "15px" }}>{s}</span>
        ))}
        {half && <span style={{ color: "#f59e0b", fontSize: "15px" }}>½</span>}
        {"☆".repeat(empty).split("").map((s, i) => (
          <span key={`e${i}`} style={{ color: "var(--clr-subtle)", fontSize: "15px" }}>{s}</span>
        ))}
      </span>
      <span style={{ fontSize: "13px", color: "var(--clr-muted)" }}>
        {rating.toFixed(1)} ({reviews.toLocaleString()})
      </span>
    </div>
  );
};

export default RatingStars;
