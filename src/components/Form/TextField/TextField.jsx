import { ErrorMessage, useField } from "formik";
import React from "react";

const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <input
        {...field}
        {...props}
        className={`${meta.touched && meta.error && "border border-danger"}`}
      />
      {meta.error && (
        <ErrorMessage
          component="div"
          name={field.name}
          className="text-danger text-left"
        />
      )}
    </div>
  );
};

export default TextField;
