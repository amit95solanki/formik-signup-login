import React from "react";
import "./reg.css";
import { Formik, Form, Field, ErrorMessage, replace } from "formik";
import * as yup from "yup";
import { useState } from "react";
import useLogin from "../hooks/login/useLogin";
import { useNavigate } from "react-router-dom";
import "./reg.css";

const Login = () => {
  const navigate = useNavigate();
  const [successRegister, setSuccessRegister] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  // const { isLoading, isError, error, mutate } = useLogin();
  const { isLoading, mutate, isError, error } = useLogin();

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div className="">
        <div className="BOX1 bg-light  ">
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
              alert(JSON.stringify(e));

              let user = {
                email: e.email,
                password: e.password,
              };

              alert(JSON.stringify(e));

              mutate(user, {
                onSuccess: (data) => {
                  console.log("login-data", data);
                  if (!data?.data?.status) {
                    let errorMessage = data?.data?.message;
                    setErrorRegister(errorMessage);
                    return;
                  }
                  setErrorRegister("");
                  setSuccessRegister("Login Successful");
                  navigate("/home");
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
                    <h2 style={{ margin: "20px" }} className="text-center">
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
                          type="password"
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
                      className="btn btn-primary"
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
    </>
  );
};

export default Login;
