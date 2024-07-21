import React from "react";

export const Button = ({ title }) => {
  return (
    <div>
      <button type="submit" className="login-btn">
        {title}
      </button>
    </div>
  );
};
