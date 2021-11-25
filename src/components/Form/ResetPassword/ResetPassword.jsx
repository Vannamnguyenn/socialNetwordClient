import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import * as Yup from "yup";
import { resetPassword } from "../../../redux/actions/authAction";
import { toastAction } from "../../../redux/actions/toastAction";
import TextField from "../TextField/TextField";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const validate = Yup.object({
    password: Yup.string()
      .required("Please enter your password !")
      .min(6, "Min password is 6 characters !"),
    retypePassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password is not match !"
    ),
  });
  const { token } = useParams();
  const handleSubmit = async (values) => {
    const data = await dispatch(
      resetPassword({
        ...values,
        token: token,
      })
    );
    dispatch(toastAction(data));
    if (data.success) {
      history.push({ pathname: "/login" });
    }
  };

  return (
    <Formik
      validationSchema={validate}
      initialValues={{
        password: "",
        retypePassword: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className="text-start">
        <TextField
          name="password"
          type="password"
          placeholder="Enter new password "
        />
        <TextField
          name="retypePassword"
          type="password"
          placeholder="Retype password "
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary submit_form_btn mb-4"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default ResetPassword;
