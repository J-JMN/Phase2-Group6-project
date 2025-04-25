import React, { useEffect, useState } from 'react';

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    price: '',
    category: '',
    addedBy: '',
    status: 'Buy'
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
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="search items"
          className="border px-3 py-2 rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit" form="addItemForm" className="bg-yellow-400 rounded px-4 py-2">Add</button>
      </div>

      <form id="addItemForm" onSubmit={handleSubmit} className="flex gap-2 mb-4">
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

      <table className="w-full border">
        <thead className="bg-green-700 text-white">
          <tr>
            <th><input type="checkbox" /></th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Added By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map(item => (
            <tr key={item.id} className="text-center border-t">
              <td><input type="checkbox" /></td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.addedBy}</td>
              <td>{item.status}</td>
              <td><button className="text-blue-500">Manage</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingList;
