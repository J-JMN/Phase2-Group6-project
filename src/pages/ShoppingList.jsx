import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';



const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    price: '',
    category: '',
    addedBy: '',
    status: 'false'
  });

  const users = ['Dominic', 'Dennis', 'Pauline', 'Joseph'];
  const statuses = ['Buy', 'Purchased'];

  useEffect(() => {
    fetch('/inventory')
      .then(res => res.json())
      .then(data => setShoppingList(data))
      .catch(err => console.error('Failed to fetch data:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { ...formData };

    try {
      const res = await fetch('/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (res.ok) {
        setShoppingList(prev => [...prev, data]);
        alert('Item added successfully!');
        setFormData({ title: '', quantity: '', price: '', category: '', addedBy: '', status: 'Buy' });
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
    <div className="p-4">
      <Container>
        {/* Header section: Title, Search Bar, and Add Button */}
        <Row className="align-items-center mb-4">
          <Col xs="auto">
            <h1 className="text-2xl font-bold">Shopping list</h1>
          </Col>
          <Col className="d-flex justify-content-end">
            <Form.Control
              type="text"
              placeholder="Search items"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-light border-0 shadow-sm"
              style={{ width: 'auto' }}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" form="addItemForm" variant="warning" size="sm">
              Add
            </Button>
          </Col>
        </Row>

        {/* Form section: Details for the item */}
        <Row className="mb-4">
          <Col xs="auto">
            <form id="addItemForm" onSubmit={handleSubmit} className="d-flex gap-2">
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Item" className="border p-2 rounded" required />
              <input name="quantity" value={formData.quantity} onChange={handleChange} type="number" placeholder="Qty" className="border p-2 rounded" required />
              <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" className="border p-2 rounded" required />
              <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" required />
               <select name="addedBy" value={formData.addedBy} onChange={handleChange} className="border p-2 rounded" required> 
              <option value="" disabled>Added By</option> 
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
              <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded" required>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </form>
          </Col>
        </Row>

        {/* Table section */}
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr className="table-success text-white">
              <th className="border-0 px-3"><input type="checkbox" /></th>
              <th className="border-0 px-3">Title</th>
              <th className="border-0 px-3">Quantity</th>
              <th className="border-0 px-3">Price</th>
              <th className="border-0 px-3">Category</th>
              <th className="border-0 px-3">Added By</th>
              <th className="border-0 px-3">Status</th>
              <th className="border-0 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map(item => (
              <tr key={item.id}>
                <td><input type="checkbox" /></td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.addedBy}</td>
                <td>{item.status}</td>
                <td>
                  
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="8" className="text-end p-3">
                <Button variant="">Manage</Button>
              </td>
            </tr>
          </tbody>
        </Table>

      </Container>
    </div>
  );

};

export default ShoppingList;
