import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import { AddIcon, DeleteIcon, EditIcon } from '../components/icons'

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  console.log('without assigning variable', data)
  console.log('Dropdown/Table Data:', inventoryData);
  console.log('Refetch Data:', data);
  if (inventoryDataLoading || loading || itemsDataLoading) console.log('Data is loading...');
  if (inventoryDataError || error || itemsDataError) console.error('Error fetching data:', inventoryDataError || error || itemsDataError);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { ...formData };

    try {
      // Added the new item to the items resource in db.json
      const res = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      const createdItem = await res.json();
      if (res.ok) {
        alert('Item added successfully!');
        setFormData({ title: '', quantity: '', price: '', category: '', addedBy: '', status: '' });

        // Refetch the inventory and items data after adding the item
        await itemsDataRefetch();
        await inventoryDataRefetch(); // This ensures the table is updated with the latest data
      } else {
        alert('Failed to add item.');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding item.');
    }
  };

  const filteredList = shoppingList.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='px-4 py-2'>
      {/* Header section: Title, Search Bar, and Add Button */}
      <div className="d-flex flex-column flex-md-row justify-content-between my-2">
        <h1 className="display-6 custom-text-color-primary fw-bold">Shopping list</h1>
        <div className="d-flex flex-row gap-2 align-items-center">
          <Form.Control
            type="text"
            placeholder="Search items"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-light border-0 shadow-sm form-control form-control-sm"
            style={{ width: 'auto' }}
          />
          <Button
            variant="warning"
            size="sm"
            className='custom-bg-secondary custom-text-color-primary fw-bold'
            onClick={() => setShowForm(prev => !prev)}
          >
            <AddIcon/> {showForm ? 'Close' : 'Add'}
          </Button>
        </div>
      </div>
      {/* Form section: Details for the item */}
      {showForm && (
        <Row className="mb-4">
          <Col xs="auto">
            <form id="addItemForm" onSubmit={handleSubmit} className="d-flex gap-2">
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
            </form>

          </Col>
        </Row>
      )}

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
            {filteredList.map(item => (
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
                    <button className='btn btn-sm btn-outline-dark gap-2 align-items-center'><EditIcon /> Manage</button>
                    <button className='btn btn-sm gap-2 align-items-center custom-bg-red-accent'><DeleteIcon /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Responsiveness in small screens */}
      <div className="d-block d-sm-none mt-4">
        {filteredList.map((item) => (
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
                <Button variant="outline-dark" size="sm">
                  <EditIcon /> Manage
                </Button>
                <Button variant="danger" size="sm">
                  <DeleteIcon /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default ShoppingList;
