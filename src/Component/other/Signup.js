import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "react-query";
import * as yup from "yup";
import "./Signup.css";
import axios from "axios";
import useRegister from "../hooks/registration/useRegister";
import { useState } from "react";

// const signupApi = (data) => {
//   return axios.post("http://134.209.229.112:5000/account/signup", data);
// };

// const AddUser = () => {
//   return useMutation(signupApi);
// };

export default function Signup() {
  const [successRegister, setSuccessRegister] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const { isLoading, mutate } = useRegister();
  //   const { mutate: AddData } = AddUser();

  return (
    <div className="bg-light BOX1 ">
      <div className=" ">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            country: "",
            state: "",
            city: "",
            mobile_Number: "",
            role_type: "",
          }}
          validationSchema={yup.object({
            name: yup
              .string()
              .required("User Name Required")
              .min(4, "Name too short")
              .max(10, "Name too long"),

            country: yup
              .string()
              .required("Country Name Required")
              .min(2, "Name too short")
              .max(15, "Name too long"),

            state: yup
              .string()
              .required("State Name Required")
              .min(2, "Name too short")
              .max(15, "Name too long"),

            city: yup
              .string()
              .required("City Name Required")
              .min(2, "Name too short")
              .max(10, "Name too long"),

            mobile_Number: yup
              .string()
              .matches(/\d{10}/, "Invalid Mobile")
              .required("Mobile Required"),

            email: yup
              .string()
              .email("Invalid email format")
              .required("Required!"),
            password: yup
              .string()
              .min(8, "Minimum 8 characters")
              .required("Required!"),
            confirm_password: yup
              .string()
              .oneOf([yup.ref("password")], "Password's not match")
              .required("Required!"),

            role_type: yup.string(),
          })}
          onSubmit={(e) => {
            alert(JSON.stringify(e));

            let user = {
              // name,
              // email,
              // password,
              // confirm_password,
              // country,
              // state,
              // city,
              // mobile_Number,
              // role_type

              name: e.name,
              email: e.email,
              password: e.password,
              confirm_password: e.confirm_password,
              country: e.country,
              state: e.state,
              city: e.city,
              mobile_Number: e.mobile_Number,
              role_type: e.role_type,
              country_id: "1",
              state_id: "2",
              city_id: "3",
            };

            alert(JSON.stringify(e));

            // AddData(user);

            mutate(user, {
              onSuccess: (data) => {
                if (!data?.data?.status) {
                  let errorMessage = data?.data?.message;
                  setErrorRegister(errorMessage);
                  return;
                }
                setErrorRegister("");
                setSuccessRegister("Successfully Registration");
              },
              onError: (errors) => {
                throw Error(errors.response.statusText);
                console.log(errors);
              },
            });
          }}
        >
          {(fields) => (
            <Form>
              {
                <div>
                  <h3 style={{ marginBottom: "20px" }} className="text-center">
                    Register User
                  </h3>

                  <dl>
                    <div className="row">
                      <div className="col-4 col-sm">
                        <dt>User Name</dt>
                        <dd>
                          <Field
                            type="text"
                            name="name"
                            className="form-control"
                          ></Field>
                        </dd>
                        <dd className="text-danger">
                          <ErrorMessage name="name"></ErrorMessage>
                        </dd>
                      </div>
                      <div className="col-4 col-sm">
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
                      </div>
                      <div className="col-4 col-sm">
                        <dt>Mobile</dt>
                        <dd>
                          <Field
                            type="text"
                            name="mobile_Number"
                            className="form-control"
                          ></Field>
                        </dd>
                        <dd className="text-danger">
                          <ErrorMessage name="mobile_Number"></ErrorMessage>
                        </dd>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 col-sm">
                        <dt>Country</dt>
                        <dd>
                          {" "}
                          <Field
                            type="text"
                            name="country"
                            className="form-control"
                          ></Field>{" "}
                        </dd>
                        <dd className="text-danger">
                          <ErrorMessage name="country"></ErrorMessage>
                        </dd>
                      </div>

                      <div className="col-4 col-sm">
                        <dt>State</dt>
                        <dd>
                          {" "}
                          <Field
                            type="text"
                            name="state"
                            className="form-control"
                          ></Field>{" "}
                        </dd>
                        <dd className="text-danger">
                          <ErrorMessage name="state"></ErrorMessage>
                        </dd>
                      </div>

                      <div className="col-4 col-sm">
                        <dt>City</dt>
                        <dd>
                          <Field
                            type="text"
                            name="city"
                            className="form-control"
                          ></Field>
                        </dd>
                        <dd className="text-danger">
                          <ErrorMessage name="city"></ErrorMessage>
                        </dd>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 col-sm">
                        <dt>Role Type</dt>
                        <dd>
                          <Field
                            component="select"
                            name="role_type"
                            className="form-control"
                            placeholder="Role Type"
                            multiple={false}
                          >
                            <option value="">Role</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="employer">Employer</option>
                          </Field>
                        </dd>
                        <dd className="text-danger">{/* {roleError} */}</dd>
                      </div>

                      <div className="col-4 col-sm ">
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
                      </div>

                      <div className="col-4 col-sm">
                        <dt> confirm Password</dt>
                        <dd>
                          <Field
                            type="password"
                            name="confirm_password"
                            className="form-control"
                          ></Field>
                        </dd>
                        <dd className="text-danger">
                          <ErrorMessage name="confirm_password"></ErrorMessage>
                        </dd>
                      </div>
                    </div>
                  </dl>
                  <div className="row">
                    <div className="col col-sm">
                      <button
                        disabled={fields.isValid ? false : true}
                        className=" btn btn-primary btn-lg btn-block"
                      >
                        Regiser
                      </button>
                    </div>
                  </div>
                  {/* <button disabled={(fields.dirty) ? false : true} className="btn btn-success">Save</button> */}
                </div>
              }
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
