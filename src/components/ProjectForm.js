import React from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
export default function ProjectForm({
  projectSchema,
  initialValues,
  handleCreateProject
}) {
  return (
    <Formik
      validationSchema={projectSchema}
      initialValues={initialValues}
      onSubmit={values => {
        handleCreateProject(values);
      }}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        values,
        setFieldValue
      }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="exampleInputTile"
              aria-describedby="titleHelp"
            />
            {errors.title && touched.title ? (
              <small id="titleHelp" className="form-text text-danger">
                {errors.title}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Budget</label>
            <input
              type="text"
              name="budget"
              value={values.budget}
              onChange={handleChange}
              className="form-control"
              id="exampleInputbudget1"
            />
            {errors.budget && touched.budget ? (
              <small id="budgetHelp" className="form-text text-danger">
                {errors.budget}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Contractor Name</label>
            <input
              type="text"
              name="contractorName"
              value={values.contractorName}
              onChange={handleChange}
              className="form-control"
              id="exampleInputcontractorName1"
            />
            {errors.contractorName && touched.contractorName ? (
              <small id="contractorNameHelp" className="form-text text-danger">
                {errors.contractorName}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Contractor Address</label>
            <input
              type="text"
              name="contractorAddress"
              value={values.contractorAddress}
              onChange={handleChange}
              className="form-control"
              id="exampleInputcontractorAddress1"
            />
            {errors.contractorAddress && touched.contractorAddress ? (
              <small
                id="contractorAddressHelp"
                className="form-text text-danger"
              >
                {errors.contractorAddress}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Start Date</label>
            <DatePicker
              selected={values.startDate}
              dateFormat="MMMM d, yyyy"
              name="startDate"
              value={values.startDate}
              onChange={date => setFieldValue("startDate", date)}
              className="form-control"
              id="exampleInputstartDate1"
            />
            {errors.startDate && touched.startDate ? (
              <small id="startDateHelp" className="form-text text-danger">
                {errors.startDate}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">End Date</label>
            <DatePicker
              style={{ display: "block !important" }}
              selected={values.endDate}
              dateFormat="MMMM d, yyyy"
              name="endDate"
              value={values.endDate}
              onChange={date => setFieldValue("endDate", date)}
              className="form-control"
              id="exampleInputendDate1"
            />
            {errors.endDate && touched.endDate ? (
              <small id="endDateHelp" className="form-text text-danger">
                {errors.endDate}
              </small>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
}

ProjectForm.propType = {
  loginSchema: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired
};
