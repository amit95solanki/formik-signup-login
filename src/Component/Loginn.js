import React from "react";

import "./Signupp.css";
import useLogin from "../hooks/login/useLogin";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
// import "./Signup.css";
import { useState } from "react";
import "./loginn.css";
import { useStateValue } from "./store";
import { actionTypes } from "./store/reducer";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Loginn = () => {
  const [successRegister, setSuccessRegister] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  const navigate = useNavigate();

  // const history = useHistory();

  // const [token, setToken] = useState({
  //   ID: "",
  //   NAME: "",
  //   SET_TOKEN: "",
  //   ROLE_TYPE: "",
  // });

  const [{}, dispatch] = useStateValue();

  // const { isLoading, isError, error, mutate } = useLogin();
  const { isLoading, mutate, isError, error } = useLogin();

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="container-fluid Box">
      <div className="row">
        <div className="col-md-7">
          <h1>login form</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur sapiente blanditiis aliquam sint, voluptatem sunt
            debitis et vel, quis similique modi, porro iusto hic nihil
            temporibus distinctio eligendi! Voluptates quam dolore provident
            consequatur officiis, nulla corporis odit consectetur magnam earum!
          </p>
        </div>

        <div className="col-md-5">
          <div className="row">
            <div className="col-md-6">{/* <h3>Ragistration form</h3> */}</div>
            <div className="col-md-6"></div>
            <div className=" ">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={yup.object({
                  email: yup
                    .string()
                    .email("Invalid email format")
                    .required("Required!"),
                  password: yup
                    .string()
                    .min(8, "Minimum 8 characters")
                    .required("Required!"),

                  role_type: yup.string(),
                })}
                onSubmit={(e) => {
                  // alert(JSON.stringify(e));

                  let user = {
                    email: e.email,
                    password: e.password,
                  };

                  // alert(JSON.stringify(e));

                  mutate(user, {
                    onSuccess: (data) => {
                      console.log("login-data", data);
                      if (!data?.data?.status) {
                        let errorMessage = data?.data?.message;
                        setErrorRegister(errorMessage);
                        return;
                      }
                      setErrorRegister("");

                      localStorage.setItem(
                        "token",
                        data?.data?.result?.login_token
                      );

                      setSuccessRegister("Login Successful");
                      // navigate("/home");

                      dispatch({
                        type: actionTypes.SET_TOKEN,
                        token: data?.data?.result?.login_token,
                      });

                      navigate("/home");

                      // history.replace("/home");
                    },
                    onError: (errors) => {
                      console.log(errors);
                    },
                  });
                }}
              >
                {(fields) => (
                  <Form>
                    {
                      <div>
                        <h2
                          style={{ marginTop: "200px", color: "white" }}
                          className="text-center"
                        >
                          Login
                        </h2>
                        <dl>
                          <dt>Email</dt>
                          <dd>
                            <Field
                              type="text"
                              name="email"
                              className="form-control"
                            ></Field>
                          </dd>
                          <dd className="text-danger">
                            <ErrorMessage name="email"></ErrorMessage>
                          </dd>

                          <dt>Password</dt>
                          <dd>
                            <Field
                              type="current-password"
                              name="password"
                              className="form-control"
                            ></Field>
                          </dd>
                          <dd className="text-danger">
                            <ErrorMessage name="password"></ErrorMessage>
                          </dd>
                        </dl>
                        <button
                          disabled={fields.isValid ? false : true}
                          // className="btn btn-primary"
                        >
                          Login
                        </button>
                        {/* <button disabled={(fields.dirty) ? false : true} className="btn btn-success">Save</button> */}
                      </div>
                    }
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginn;
