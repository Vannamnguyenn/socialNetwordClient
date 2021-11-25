import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../TextField/TextField";
import "../../Form/comom_form.scss";
import { useDispatch } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { forgotPassword } from "../../../redux/actions/authAction";
import { toastAction } from "../../../redux/actions/toastAction";

const ForGotPassword = () => {
  const dispatch = useDispatch();
  const [isSendMail, setIsSendMail] = useState(false);
  const validate = Yup.object({
    email: Yup.string().email("Please enter invalid email !"),
  });
  const handleSubmit = async (values) => {
    const data = await dispatch(forgotPassword(values));
    dispatch(toastAction(data));
    if (data.success) {
      setIsSendMail(true);
    }
  };
  return (
    <>
      {isSendMail && (
        <Alert variant="success">
          {" "}
          Request change password successfully. Please check your email !{" "}
        </Alert>
      )}
      {!isSendMail && (
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validate}
        >
          <Form className="text-start">
            <TextField
              name="email"
              type="email"
              placeholder="Enter email to reset password !"
            />
            <button
              type="submit"
              className="btn btn-sm btn-primary submit_form_btn mb-4"
            >
              Sumbit
            </button>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default ForGotPassword;
