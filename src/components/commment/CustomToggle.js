import React from "react";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <i
    ref={ref}
    onClick={(e) => onClick(e)}
    className="fas fa-ellipsis-h comment-action"
  >
    {children}
  </i>
));

export default CustomToggle;
