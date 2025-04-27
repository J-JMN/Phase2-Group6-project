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
  /*

  const [showForm, setShowForm] = useState(false);
  const [options, setOptions] = useState({
    titles: [],
    categories: [],
    addedBy: [],
    status: [],
  });

  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    price: '',
    category: '',
    addedBy: '',
    status: 'false'
  });

  let { data: inventoryData, loading: inventoryDataLoading, error: inventoryDataError, refetch: inventoryDataRefetch } = useFetch('http://localhost:3000/inventory');
  console.log('with assigning variable', inventoryData)
  let { data, loading, error, refetch } = useFetch('http://localhost:3000/inventory');
  let { data: itemsData, loading: itemsDataLoading, error: itemsDataError, refetch: itemsDataRefetch } = useFetch('http://localhost:3000/items');
  const { data: accountData, loading: accountLoading, error: accountError } = useFetch('http://localhost:3000/accounts'); //useFetch for account data

  if (inventoryDataLoading || loading) console.log('Data is loading...');
  if (inventoryDataError || error) console.error('Error fetching inventory:', inventoryDataError || error);
  useEffect(() => {
    if (inventoryData && itemsData) {
      const combinedData = [...inventoryData, ...itemsData];
      setShoppingList(combinedData);

      const titles = [...new Set(combinedData.map(item => item.title))];
      const categories = [...new Set(combinedData.map(item => item.category))];
      const addedBy = [...new Set(combinedData.map(item => item.addedBy))];
      const status = [...new Set(combinedData.map(item => item.status))];

      setOptions({ titles, categories, addedBy, status });
    }
  }, [inventoryData, itemsData]);

  useEffect(() => {
    if (accountData && Array.isArray(accountData)) {
      const memberNames = accountData.flatMap(account =>
        account.members.map(member => member.name)
      );
      setOptions(prev => ({ ...prev, addedBy: memberNames }));
    }
  }, [accountData]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for title selection
    if (name === "title") {
      // Find the selected item based on the title
      const selectedItem = shoppingList.find(item => item.title === value);

      // Update formData with the corresponding price and category
      if (selectedItem) {
        setFormData(prev => ({
          ...prev,
          title: value,
          price: selectedItem.price,
          category: selectedItem.category
        }));
      }
    }
    // Special handling for boolean 'status'
    else if (name === "status") {
      setFormData(prev => ({
        ...prev,
        [name]: value === "true" ? true : value === "false" ? false : ""
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newItem = { ...formData };

  //   try {
  //     const res = await fetch('http://localhost:3000/inventory', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(newItem)
  //     });

  //     const created = await res.json();
  //     if (res.ok) {
  //       alert('Item added successfully!');
  //       setFormData({ title: '', quantity: '', price: '', category: '', addedBy: '', status: '' });

  //       // Refresh shopping list data after adding the item
  //       await inventoryDataRefetch(); // Refetch the updated data
  //     } else {
  //       alert('Failed to add item.');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert('Error adding item.');
  //   }
  // };

  */
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
        {/* <form id="addItemForm" onSubmit={handleSubmit} className="d-flex gap-2 flex-column">
          <select name="title" value={formData.title} onChange={handleChange} className="border p-2 rounded" required>
            <option value="" disabled>Select Item</option>
            {options.titles.map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
          <input name="quantity" value={formData.quantity} onChange={handleChange} type="number" placeholder="Qty" className="border p-2 rounded" required />
          <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" className="border p-2 rounded" required />
          <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded" required>
            <option value="" disabled>Select Category</option>
            {options.categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select name="addedBy" value={formData.addedBy} onChange={handleChange} className="border p-2 rounded" required>
            <option value="" disabled>Added By</option>
            {options.addedBy.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status === true ? "true" : formData.status === false ? "false" : ""}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="" disabled>Status</option>
            <option value="true">Active</option>
            <option value="false">Used</option>
          </select>
          <Button type="submit" variant="success" size="sm">Save</Button>
        </form> */}
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
