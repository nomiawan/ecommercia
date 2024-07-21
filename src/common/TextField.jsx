import React from "react";

export const TextField = React.forwardRef(
  ({ label, placeholder, error, ...rest }, ref) => {
    return (
      <div className="outer-input">
        <label htmlFor="" className="label-text">
          {label}
        </label>
        <input
          className="input-text"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);
