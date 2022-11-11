import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

const Input = (
  { id, type, content, isValid, label, onChange, onBlur },
  ref
) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  // useImperativeHandle(ref, () => ({ focus: activate }));

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id}>{content}</label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={label}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default React.forwardRef(Input);
