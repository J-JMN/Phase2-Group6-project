import React from 'react';
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import * as Yup from "yup";

const ItemSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(40, 'Too Long!').required('Required'),
  category: Yup.string().required('Required'),
  description: Yup.string(),
  price: Yup.number().min(0).positive().required('Required'),
  status: Yup.boolean().required('Required'),
});

function InventoryForm({handleSubmit,submitBtnRef, initialValues }) {
  console.log(initialValues)
  const defaultValues = {
    title: '',
    category: '',
    description: '',
    price: '',
    status: true,
  };
  return (
    <Formik
      initialValues={initialValues || defaultValues}
      enableReinitialize
      validationSchema={ItemSchema}
      onSubmit={async (values) => {
        values.priceList = [{
          "id": "1",
          "amount": parseInt(values.price),
          "date": new Date(Date.now())
        }]
        handleSubmit(values)
      }}
    >
      {({ submitForm, errors, touched }) => {
        // Expose submitForm method to parent using ref
        if (submitBtnRef) {
          submitBtnRef.current = submitForm;
        }

        return (
          <Form className='d-flex flex-column'>
            <label htmlFor="title">Name</label>
            <Field id="title" name="title" placeholder="Tissue"  className='form-control form-control-md my-2'/>
            {errors.title && touched.title ? ( <div className='text-danger'>{errors.title}</div> ) : null}

            <label htmlFor="category">Category</label>
            <Field as="select" name="category" className='form-control form-control-md my-2'>
              <option value="groceries">Groceries</option>
              <option value="cleaning">Cleaning</option>
              <option value="toiletries">Toiletries</option>
            </Field>
            {errors.category && touched.category ? ( <div className='text-danger'>{errors.category}</div> ) : null}

            <label htmlFor="price">Price / <span className='text-muted'>(piece | kg | unit)</span></label>
            <Field id="price" name="price" placeholder="100" type="number" className='form-control form-control-md my-2' />
            {errors.price && touched.price ? ( <div className='text-danger'>{errors.price}</div> ) : null}

            <label htmlFor="description">Description</label>
            <Field id="description" name="description" placeholder="Always by 4 pieces" as="textarea" className='form-control form-control-md my-2' />
            {errors.description && touched.description ? ( <div className='text-danger'>{errors.description}</div> ) : null}
            <label>
              <Field type="checkbox" name="status" /> Active Status
            </label>
          </Form>
        );
      }}
    </Formik>
  )
}

export default InventoryForm
