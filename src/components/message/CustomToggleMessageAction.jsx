import React from "react";

const CustomToggleMessageAction = ({ children, onClick }, ref) => {
  return (
    <i
      className="fas fa-ellipsis-v"
      style={{ cursor: "pointer", padding: "5px" }}
      ref={ref}
      onClick={(e) => onClick(e)}
    >
      {children}
    </i>
  );
};

export default React.forwardRef(CustomToggleMessageAction);
