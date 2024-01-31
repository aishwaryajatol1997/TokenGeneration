import React, { useState } from 'react';
import './App.css';

function App() {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    mobileNumber: '',
    amountToPay: '',
  });

  const [tokenList, setTokenList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = Math.floor(Math.random() * 1000);
    const newCustomer = {
      token,
      ...customerDetails,
    };

    if (editingIndex !== null) {
      const updatedList = [...tokenList];
      updatedList[editingIndex] = newCustomer;
      setTokenList(updatedList);
      setEditingIndex(null);
    } else {
      setTokenList((prevList) => [...prevList, newCustomer]);
    }

    setCustomerDetails({
      name: '',
      mobileNumber: '',
      amountToPay: '',
    });
  };

  const handleEdit = (index) => {
    setCustomerDetails(tokenList[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = [...tokenList];
    updatedList.splice(index, 1);
    setTokenList(updatedList);
  };

  return (
    <div className="App">
      <h1 align="center" >Token Machine</h1>

      <form onSubmit={handleSubmit}>
        <label >Name:</label>
        <input type="text" name="name" value={customerDetails.name} onChange={handleChange} required />

        <label>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={customerDetails.mobileNumber} onChange={handleChange} required />

        <label>Amount to Pay:</label>
        <input type="number" name="amountToPay" value={customerDetails.amountToPay} onChange={handleChange} required />

        <button type="submit">{editingIndex !== null ? 'Update' : 'Generate Token'}</button>
      </form>

       <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Amount to Pay</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tokenList.map((customer, index) => (
            <tr key={customer.token}>
              <td>{customer.token}</td>
              <td>{customer.name}</td>
              <td>{customer.mobileNumber}</td>
              <td>{customer.amountToPay}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;

