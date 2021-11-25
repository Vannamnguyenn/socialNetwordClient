import React, { memo } from "react";
import "../../Form/comom_form.scss";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import TextField from "../TextField/TextField";
import { toastAction } from "../../../redux/actions/toastAction";
import { registerAction } from "../../../redux/actions/authAction";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const validate = Yup.object({
    email: Yup.string()
      .email("Please enter an valid email !")
      .required("Email is required !"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters !")
      .required("Password is required !"),
    fullname: Yup.string().required("Fullname is required !"),
    phone: Yup.number("Please enter a valid phone number !").required(
      "Phone is required !"
    ),
  });
  return (
    <Formik
      validationSchema={validate}
      initialValues={{
        email: "",
        password: "",
        phone: "",
        fullname: "",
      }}
      onSubmit={async (values) => {
        const data = await dispatch(registerAction(values));
        dispatch(toastAction(data));
      }}
    >
      {(formik) => {
        return (
          <div className="form-login text-start">
            <Form>
              <TextField name="fullname" type="text" placeholder="Fullname" />
              <TextField name="email" type="email" placeholder="Email" />
              <TextField name="phone" type="number" placeholder="Phone" />
              <TextField
                name="password"
                type="password"
                placeholder="Password"
              />
              <button
                type="submit"
                className="btn btn-sm btn-primary submit_form_btn"
              >
                Sign up
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default memo(RegisterForm);
