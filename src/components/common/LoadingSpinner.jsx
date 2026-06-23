import React from "react";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "48px",
    color: "var(--clr-muted)",
    fontSize: "14px",
  },
  ring: {
    width: "36px",
    height: "36px",
    border: "3px solid var(--clr-border)",
    borderTopColor: "var(--clr-accent)",
    borderRadius: "50%",
    animation: "spin .7s linear infinite",
  },
};

const keyframes = `@keyframes spin { to { transform: rotate(360deg); } }`;

const LoadingSpinner = ({ message = "Loading…" }) => (
  <>
    <style>{keyframes}</style>
    <div style={styles.wrapper}>
      <div style={styles.ring} />
      <span>{message}</span>
    </div>
  </>
);

export default LoadingSpinner;
