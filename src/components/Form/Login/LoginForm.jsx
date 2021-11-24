import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import "../../Form/comom_form.scss";
import TextField from "../TextField/TextField";
import { useDispatch } from "react-redux";
import "./loginFrom.scss";
import { login } from "../../../redux/actions/authAction";
import { toastAction } from "../../../redux/actions/toastAction";
import { memo } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const validate = Yup.object({
    email: Yup.string()
      .email("Please enter an valid email !")
      .required("Email is required !"),
    password: Yup.string().required("Password is required !"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const data = await dispatch(login(values));
        dispatch(toastAction(data));
      }}
    >
      {(formik) => (
        <div className="form-login">
          <Form>
            <TextField name="email" type="email" placeholder="Email" />
            <TextField name="password" type="password" placeholder="Password" />
            <button
              type="submit"
              className="btn btn-sm btn-primary submit_form_btn"
            >
              Log In
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default memo(LoginForm);
