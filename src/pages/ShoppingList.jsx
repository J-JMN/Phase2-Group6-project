import React, { useRef, useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { AddIcon, DeleteIcon, EditIcon } from '../components/icons';
import ModalComponent from '../components/Modal';
import { toast } from 'react-toastify';
import ShoppingListForm from '../components/forms/shoppingItemForm';
import useFetch from '../hooks/useFetch';
import usePut from '../hooks/usePUT';
import { API_URL } from '../constants/utility.js';

const ShoppingList = () => {
  // const [shoppingList, setShoppingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: listsData, refetch: listsDataRefetch } = useFetch(`${API_URL}/api/lists/1`);
  const { putData } = usePut(`${API_URL}/api/lists`);
  /**Manage Items Modal */
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editItemModal, setEditItemModal] = useState(null);
  const [deleteItemModal, setDeleteItemModal] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  console.log(listsData)
  const formikSubmitRef = useRef();

  const handleEditItem=(item)=>{
    setEditItemModal(item);
    handleShowModal();
  };
  const handleDeleteItem=(item)=>{
    setDeleteItemModal(item)
    handleShowDeleteModal()
  }

  const handleSubmit = async(data) => {
    try {
      toast.info('Saving item...', { autoClose: 1000 });
      if(listsData?.items?.find((item)=>item?.title?.trim()?.toLowerCase() === data?.title?.trim()?.toLowerCase()) && editItemModal === null){
        throw new Error('This item already exists!')
      }
      if (editItemModal) {
        // Editing
        const updatedItems = listsData?.items.map((item) =>
          item.title === editItemModal?.title ? { ...item, ...data } : item
        );
        await putData({ ...listsData, items: updatedItems },'1');
      } else {
        // Adding
        const updatedItems = [...(listsData?.items || []), data];
        await putData({ ...listsData, items: updatedItems },'1');
      }
      //await putData(listsData,'1'); // this now returns data or throws  
      await listsDataRefetch();      
      handleCloseModal();
      setEditItemModal(null)
    } catch (error) {
      toast.error(`Submission failed: ${error.message || 'Unknown error'}`);
    }
  };
  

  const handleSaveChanges = async() => {
    console.log('saved clicked')
    if (formikSubmitRef.current) {
      formikSubmitRef.current(); // trigger Formik form submission
    };
    if(deleteItemModal !== null){
      try {
        toast.info('Deleting item...', { autoClose: 1000 });
        const updatedItems = listsData.items.filter(
          (item) => item.title !== deleteItemModal.title
        );

        await putData({ ...listsData, items: updatedItems },'1');

        await listsDataRefetch();
        setDeleteItemModal(null);
        handleCloseDeleteModal();
      } catch (error) {
        toast.error(`Item deletion failed: ${error.message || 'Unknown error'}`);
      }
    }
  };
  const filteredList = listsData?.items?.filter((item) =>
    item?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  console.log(filteredList,listsData?.items)

  return (
    <div className='px-4 py-2'>
      {/* Header section: Title, Search Bar, and Add Button */}
      <div className="d-flex flex-column flex-md-row justify-content-between my-2">
        <h1 className="display-6 custom-text-color-primary fw-bold">Shopping list</h1>
        <div className="d-flex flex-row gap-2 align-items-center">
          <Form.Control
            type="search"
            placeholder="Search items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-light border-0 shadow-sm form-control form-control-sm"
            style={{ width: 'auto' }}
          />
          <Button
            variant="warning"
            size="sm"
            className='custom-bg-secondary custom-text-color-primary fw-bold'
            // onClick={() => setShowForm(prev => !prev)}
            onClick={() => handleShowModal()}
          >
            <AddIcon/> Add
          </Button>
        </div>
      </div>

      {/* Table section */}
      <div className="d-none d-md-block">
        <Table striped bordered hover responsive>
          <thead>
            <tr className="table-success text-white">
              <th scope="col" style={{width: "20px"}}><input type="checkbox" /></th>
              <th scope="col">Title</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Added By</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList?.map(item => (
              <tr key={item.id}>
                <td><input type="checkbox" className="row-checkbox"/></td>
                <td style={{width: "10vw"}}>{item.title}</td>
                <td style={{width: "10vw"}}>{item.quantity}</td>
                <td style={{width: "10vw"}}>{item.price}</td>
                <td style={{width: "10vw"}}>{item.category}</td>
                <td style={{width: "10vw"}}>{item.addedBy}</td>
                <td style={{width: "10vw"}}>
                  <span className={`badge bg-${item.status ? 'success' : 'warning'}`}>
                    {item.status ? 'Active' : 'Used'}
                  </span>
                </td>

                <td style={{width: "200px"}}>
                  <div className="d-flex flex-grow gap-2">
                    <button className='btn btn-sm btn-outline-dark gap-2 align-items-center' onClick={(()=>{handleEditItem(item)})}><EditIcon /> Manage</button>
                    <button className='btn btn-sm gap-2 align-items-center custom-bg-red-accent' onClick={(()=>{handleDeleteItem(item)})}><DeleteIcon /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Responsiveness in small screens */}
      <div className="d-block d-sm-none mt-4">
        {filteredList?.map((item) => (
          <div className="card mb-3" key={item?.id}>
            <div className="card-body">
              <div className='d-flex justify-content-between align-items-center mb-2'>
                <h5 className="mb-0">{item?.title}</h5>
                <span className={`badge bg-${item?.status ? 'success' : 'warning'}`}>
                  {item?.status ? 'Active' : 'Used'}
                </span>
              </div>
              <p className="mb-1">{item?.category}</p>
              <p className="mb-2">{item?.price}</p>
              <div className="d-flex gap-2">
                <Button variant="outline-dark" size="sm" onClick={(()=>{handleEditItem(item)})}>
                  <EditIcon /> Manage
                </Button>
                <Button variant="danger" size="sm" onClick={(()=>{handleDeleteItem(item)})}>
                  <DeleteIcon /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ModalComponent 
        show={showModal} 
        handleClose={handleCloseModal}
        handleAction={handleSaveChanges}
        header={editItemModal !== null ? 'Edit Item on list':'Add Item to list'}
      >
        <ShoppingListForm handleSubmit={handleSubmit} submitBtnRef={formikSubmitRef} initialValues={editItemModal}/>
      </ModalComponent>
      <ModalComponent 
        show={showDeleteModal} 
        handleClose={handleCloseDeleteModal}
        handleAction={handleSaveChanges}
        header={'Remove Item from list'}
        isDelete={true}
      >
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <span className='text-danger p-1 fs-2 rounded-circle d-flex justify-content-center align-items-center custom-bg-red-accent' style={{width:'50px',height:'50px'}}><DeleteIcon /></span>
          <p className='fs-4 fw-bold text-danger'>Remove Item</p>
          <span className='fs-6'>Are you sure you want to  delete this item?</span>
          <span className='fs-6'>This action cannot be undone!</span>
        </div>
      </ModalComponent>
    </div>
  );

};

export default ShoppingList;
