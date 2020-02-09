import React from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
export default function LoginForm({ loginSchema, initialValues, handleLogin }) {
  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values);
        setSubmitting(false);
      }}
    >
      {({
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        values
      }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {errors.email && touched.email ? (
              <small id="emailHelp" className="form-text text-muted">
                {errors.email}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.password && touched.password ? (
              <small id="passwordHelp" className="form-text text-muted">
                {errors.password}
              </small>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "btn btn-default" : "btn btn-primary"}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

LoginForm.propType = {
  loginSchema: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired
};
