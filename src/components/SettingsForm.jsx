import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SettingsSchema = Yup.object().shape({
  accountName: Yup.string().required("Account name is required"),
  accountPassword: Yup.string().required("Password is required"),
});

export default function SettingsForm({ initialValues, onSubmit }) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={SettingsSchema}
      onSubmit={onSubmit}
    >
      <Form className="settings-form">
        <div className="form-group mb-3">
          <label>
            Account Name <span className="required">*</span>
          </label>
          <Field name="accountName" className="form-control" />
          <ErrorMessage name="accountName" component="div" className="error-message" />
        </div>
        <div className="form-group mb-3">
          <label>
            Password <span className="required">*</span>
          </label>
          <Field name="accountPassword" type="password" className="form-control" />
          <ErrorMessage name="accountPassword" component="div" className="error-message" />
        </div>
        <button type="submit" className="btn btn-primary btn-sm custom-bg-primary">
          Save Settings
        </button>
      </Form>
    </Formik>
  );
}



