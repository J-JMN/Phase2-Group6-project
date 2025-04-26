import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext  } from 'formik';
import * as Yup from "yup";
import useFetch from '../../hooks/useFetch';

const ItemSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  quantity: Yup.number().min(0).positive().required('Required'),
  addedBy: Yup.string().required('Required'),
  price: Yup.number().min(0).positive().required('Required'),
  status: Yup.boolean().required('Required'),
});

export default function ShoppingListForm({handleSubmit,submitBtnRef, initialValues }) {
  const { data: inventoryItems } = useFetch('http://localhost:3000/inventory')
  console.log(initialValues)
  const defaultValues = {
    title: '',
    category: '',
    quantity: '',
    price: '',
    addedBy: 'Dennis',
    status: true,
  };
  return (
    <Formik
      initialValues={initialValues || defaultValues}
      enableReinitialize
      validationSchema={ItemSchema}
      onSubmit={async (values) => {
        handleSubmit(values)
        console.log(values)
      }}
    >
      {({ submitForm, errors, touched, setFieldValue  }) => {
        // Expose submitForm method to parent using ref
        if (submitBtnRef) {
          submitBtnRef.current = submitForm;
        }

        return (
          <Form className='d-flex flex-column'>
            <label htmlFor="name">Name</label>
            <Field 
              as="select" 
              name="title" 
              className='form-control form-control-md my-2'
              onChange={(e) => {
                const selectedTitle = e.target.value;
                const selectedItem = inventoryItems?.find(item => item.title === selectedTitle);
                
                if (selectedItem) {
                  console.log("Selected Item:", selectedItem);
                  setFieldValue('title', selectedItem.title);    // update the name
                  setFieldValue('price', selectedItem?.priceList[selectedItem?.priceList.length - 1].amount);    // update the price
                  setFieldValue('category', selectedItem.category);  // optional
                }
              }}
            >
              <option value="" disabled>Select Item</option>
              {inventoryItems?.map(item => (
                <option key={item.id} value={item.title}>{item.title}</option>
              ))}
            </Field>
            {errors.title && touched.title ? ( <div className='text-danger'>{errors.title}</div> ) : null}

            <label htmlFor="category">Category</label>
            <Field id="category" name="category" type="text" placeholder='Groceries' className='form-control form-control-md my-2' disabled/>
            {errors.category && touched.category ? ( <div className='text-danger'>{errors.category}</div> ) : null}

            <label htmlFor="quantity">Quantity</label>
            <Field id="quantity" name="quantity" placeholder="10" type="number" className='form-control form-control-md my-2' />
            {errors.quantity && touched.quantity ? ( <div className='text-danger'>{errors.quantity}</div> ) : null}

            <label htmlFor="price">Price / <span className='text-muted'>(piece | kg | unit)</span></label>
            <Field id="price" name="price" placeholder="100" type="number" className='form-control form-control-md my-2' />
            {errors.price && touched.price ? ( <div className='text-danger'>{errors.price}</div> ) : null}

            <label>
              <Field type="checkbox" name="status" /> Active Status
            </label>
          </Form>
        );
      }}
    </Formik>
  )
};