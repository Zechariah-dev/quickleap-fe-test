/* eslint-disable */
import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Input from "../../components/Input";
import "./style.css";

export default function PaymentForm() {
  const navigate = useNavigate();

  const [passwordState, setPasswordState] = useState({
    password: false,
    confirmPassword: false,
  });

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    cardNumber: "",
    pin: "",
    expiryDate: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .matches(
        /\w{3}\s\w{3}/,
        "firstname and lastname should contain atleast three characters"
      ),
    phoneNumber: Yup.string()
      .required("phone number is required")
      .matches(
        /((^090)([1-9]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})|((\+?)(234)([7-9])([0-1])([1-9]))(\d{7})/,
        "invalid format"
      ),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "1 uppercase, 1 Lowercase, 1 number and 1 special case character"
      ),
    confirmPassword: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("password"), null], "passwords must match"),
    cardNumber: Yup.string()
      .required("card number is required")
      .matches(
        /((\d{4}))((\s))((\d{4}))((\s))((\d{4}))((\s))((\d{4}))/,
        "invalid card number"
      ),
    pin: Yup.string()
      .required("card pin is required")
      .matches(/\d{4}/, "invalid pin - only number is allowed"),
    email: Yup.string()
      .email("invalid email address")
      .required("email is required"),
    expiryDate: Yup.string()
      .required("expiry date is required")
      .matches(/^(0[1-9]|1[0-2])(\/|-)([0-9]{2})$/, "invalid expiry date"),
  });

  return (
    <div className="container center">
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            navigate("/success", { state: values });
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} className="form">
              <h1>Save Card</h1>
              <div className="form-control">
                <Input label="Name" name="name" />
              </div>
              <div className="form-control">
                <Input label="Email" name="email" />
                <Input label="Phone Number" name="phoneNumber" />
              </div>
              <div className="form-control">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  setpasswordstate={setPasswordState}
                  passwordstate={passwordState}
                />
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  setpasswordstate={setPasswordState}
                  passwordstate={passwordState}
                />
              </div>
              <div>
                <Input label="Card Number" name="cardNumber" maxLength={19} />
              </div>
              <div className="form-control">
                <Input label="Expiry Date" name="expiryDate" />
                <Input
                  label="Pin"
                  name="pin"
                  type="password"
                  maxLength={4}
                  pattern="[0-9]{4}"
                />
              </div>
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
