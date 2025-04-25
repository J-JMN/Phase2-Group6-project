import React, { useRef, useState } from 'react'
import { AddIcon } from '../components/icons';
import { InventoryCardList, InventoryTableList } from '../components/InventoryList';
import useFetch from '../hooks/useFetch';
import usePost from '../hooks/usePost';
import ModalComponent from '../components/Modal';
import InventoryForm from '../components/forms/InventoryForm';
import { toast } from 'react-toastify';

function Inventory() {
  const [searchQuery,setsearchQuery]=useState('');
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  let { data, loading, error, refetch  } = useFetch('http://localhost:3000/inventory');  
  const { postData } = usePost('http://localhost:3000/inventory');
  const formikSubmitRef = useRef();

  const handleSubmit = async(data) => {
    console.log('Submitted:', data);
    try {
      toast.info('Submitting item...', { autoClose: 1000 });
  
      const result = await postData(data); // this now returns data or throws
      console.log(result)
      await refetch();
  
      toast.success('Item added successfully!', { autoClose: 2000 });
      handleCloseModal();
    } catch (error) {
      toast.error(`Submission failed: ${error.message || 'Unknown error'}`);
    }
  };

  const handleSaveChanges = () => {
    console.log('saved clieckd')
    if (formikSubmitRef.current) {
      formikSubmitRef.current(); // trigger Formik form submission
    }
  };

  if(loading)  {
    return <p>Loading...</p>
  };
  if(error)  {
    return <p>An Error Occured</p>
  };
  data = data?.filter(item => item?.title?.toLowerCase().includes(searchQuery?.toLowerCase()))
  console.log(data);

  return (
    <div className='px-4 py-2'>
      <div className="d-flex flex-column flex-md-row justify-content-between my-2">
          <h1 className="display-6 custom-text-color-primary fw-bold">Inventory</h1>
          <div className="d-flex flex-row gap-2 align-items-center">
              <input type="search" placeholder='search items' className='form-control form-control-sm' value={searchQuery} onChange={(e)=>{setsearchQuery(e.target.value)}}/>
              <div className="d-flex flex-row gap-2 align-items-sm-start align-items-center">
                  <button className='btn btn-sm btn-primary custom-bg-secondary custom-text-color-primary fw-bold d-flex flex-row align-items-center gap-2' onClick={handleShowModal} ><AddIcon/>Add</button>
              </div>
          </div>
      </div>
      {data !== null && (<InventoryTableList items={data}/>)} {/**Table view for large screens */}
      {data !== null && (<InventoryCardList items={data}/>)} {/**Card view for small screens */}
      <ModalComponent 
        show={showModal} 
        handleClose={handleCloseModal}
        handleAction={handleSaveChanges}
        header={'Create a new Item'}
      >
        <InventoryForm handleSubmit={handleSubmit} submitBtnRef={formikSubmitRef} /> {/* New Item Form */}
      </ModalComponent>
    </div>
  )
}

export default Inventory;