import { ErrorMessage, useField } from "formik";
import React from "react";
import "./textArea.scss";

const TextArea = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <textarea
        row="4"
        {...field}
        {...props}
        className={`${meta.touched && meta.error && "border border-danger"}`}
      ></textarea>
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

export default TextArea;
