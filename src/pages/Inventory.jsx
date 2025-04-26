import React, { useRef, useState } from 'react'
import { AddIcon, DeleteIcon } from '../components/icons';
import { InventoryCardList, InventoryTableList } from '../components/InventoryList';
import useFetch from '../hooks/useFetch';
import usePost from '../hooks/usePost';
import ModalComponent from '../components/Modal';
import InventoryForm from '../components/forms/InventoryForm';
import { toast } from 'react-toastify';
import usePut from '../hooks/usePUT';
import useDelete from '../hooks/useDelete';
import { API_URL } from '../constants/utility.js';

function Inventory() {
  const [searchQuery,setsearchQuery]=useState('');

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editItemModal, setEditItemModal] = useState(null);
  const [deleteItemModal, setDeleteItemModal] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  let { data, loading, error, refetch  } = useFetch(`${API_URL}/inventory`);  
  const { postData } = usePost(`${API_URL}/inventory`);
  const { putData } = usePut(`${API_URL}/inventory`);
  const { deleteData } = useDelete(`${API_URL}/inventory`);
  const formikSubmitRef = useRef();

  const handleSubmit = async(data) => {
    try {
      toast.info('Submitting item...', { autoClose: 1000 });
      if(editItemModal !== null){
        await putData(data,editItemModal?.id); // this now returns data or throws
      }else{
        await postData(data); // this now returns data or throws
      }      
      await refetch();      
      handleCloseModal();
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
        await deleteData(deleteItemModal.id);      
        handleCloseDeleteModal();
        setDeleteItemModal(null)
        await refetch();
      } catch (error) {
        toast.error(`Item deletion failed: ${error.message || 'Unknown error'}`);
      }
    }
  };

  if(loading)  {
    return <p>Loading...</p>
  };
  if(error)  {
    return <p>An Error Occured</p>
  };
  data = data?.filter(item => item?.title?.toLowerCase().includes(searchQuery?.toLowerCase()))

  return (
    <div className='px-4 py-2'>
      <div className="d-flex flex-column flex-md-row justify-content-between my-2">
          <h1 className="display-6 custom-text-color-primary fw-bold">Inventory</h1>
          <div className="d-flex flex-row gap-2 align-items-center">
              <input type="search" placeholder='search items' className='form-control form-control-sm shadow-sm' value={searchQuery} onChange={(e)=>{setsearchQuery(e.target.value)}}/>
              <div className="d-flex flex-row gap-2 align-items-sm-start align-items-center">
                  <button className='btn btn-sm custom-bg-secondary custom-text-color-primary fw-bold d-flex flex-row align-items-center gap-2' onClick={handleShowModal} ><AddIcon/>Add</button>
              </div>
          </div>
      </div>
      {data !== null && (<InventoryTableList items={data} setEditItemModal={setEditItemModal}  handleShowModal={handleShowModal} handleShowDeleteModal={handleShowDeleteModal} setDeleteItemModal={setDeleteItemModal}/>)} {/**Table view for large screens */}
      {data !== null && (<InventoryCardList items={data} setEditItemModal={setEditItemModal}  handleShowModal={handleShowModal} handleShowDeleteModal={handleShowDeleteModal} setDeleteItemModal={setDeleteItemModal}/>)} {/**Card view for small screens */}
      <ModalComponent 
        show={showModal} 
        handleClose={handleCloseModal}
        handleAction={handleSaveChanges}
        header={editItemModal !== null ? 'Update Item':'Create a new Item'}
      >
        <InventoryForm handleSubmit={handleSubmit} submitBtnRef={formikSubmitRef} initialValues={editItemModal}/> {/* New Item Form */}
      </ModalComponent>
      <ModalComponent 
        show={showDeleteModal} 
        handleClose={handleCloseDeleteModal}
        handleAction={handleSaveChanges}
        header={'Remove Item'}
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
  )
}

export default Inventory;