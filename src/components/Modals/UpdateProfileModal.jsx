import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { LoadingAction } from "../../redux/actions/loadingAction";
import { toastAction } from "../../redux/actions/toastAction";
import { updateProfile } from "../../redux/actions/userAction";
import { validateImage } from "../../until/uploadImage";
import TextArea from "../Form/TextArea/TextArea";
import TextField from "../Form/TextField/TextField";
import "./updateModalProfile.scss";

const UpdateProfileModal = ({ profile }) => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOnHide = () => {
    setShow(false);
  };

  const validate = Yup.object({
    fullname: Yup.string().max(
      30,
      "Full name is not longer thanh 30 characters !"
    ),
    phone: Yup.number("Please enter  phone number !"),
    story: Yup.string().max(250, "Story is not longer thanh 250 characters !"),
  });
  const handleSubmit = async (value) => {
    dispatch(LoadingAction(true));
    const data = await dispatch(updateProfile(value, file, profile.avatar));
    setShow(false);
    history.push(`/profile/${data.user.slug}`);
    dispatch(toastAction(data));
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    const err = validateImage(file);
    if (err) dispatch(toastAction({ msg: err, success: false }));
    else setFile(file);
  };
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setShow(true)}>
        Edit profile
      </Button>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleOnHide}
        className="update-profile"
        animation={false}
      >
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validate}
          initialValues={{
            fullname: profile.fullname || "",
            phone: profile.phone || "",
            address: profile.address || "",
            website: profile.website || "",
            story: profile.story || "",
            gender: profile.gender || "",
          }}
        >
          {(formik) => (
            <Form>
              <Modal.Header>
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="text-secondary"
                >
                  Update Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="update-profile-avatar">
                  <label
                    htmlFor="choose-avatar"
                    className="update-profile-avatar-chooseFile"
                  >
                    <i className="fas fa-edit"></i>
                  </label>
                  <img
                    src={file ? URL.createObjectURL(file) : profile.avatar}
                    alt=""
                  />
                  <input
                    id="choose-avatar"
                    type="file"
                    onChange={handleChangeAvatar}
                    style={{ display: "none" }}
                  />
                </div>
                <TextField
                  name="fullname"
                  placeholder="Full Name"
                  type="text"
                />
                <TextField name="phone" placeholder="Phone" type="text" />
                <TextField name="address" placeholder="Adddress" type="text" />
                <TextField name="website" placeholder="Website" type="text" />
                <TextArea name="story" placeholder="Story" type="text" />
                <select name="gender" defaultValue={profile.gender} required>
                  <option value="Male">Male</option>
                  <option value="Female">Fenmale</option>
                </select>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={handleOnHide}
                >
                  Close
                </Button>
                <Button type="submit" size="sm">
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
