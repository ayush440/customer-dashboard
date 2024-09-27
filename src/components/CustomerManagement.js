import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCustomer, updateCustomer, deleteCustomer } from '../features/customerSlice';

const CustomerManagement = () => {
  const customers = useSelector((state) => state.customers) || [];
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidPhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const isEmailOrPhoneExists = () => {
    return customers.some(
      (customer) =>
        (customer.email === formData.email || customer.phone === formData.phone) &&
        customer.id !== formData.id // Exclude the current customer being edited
    );
  };

  const handleSubmit = () => {
    if (!isValidPhoneNumber(formData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    if (isEmailOrPhoneExists()) {
      alert('Customer with this email or phone number already exists.');
      return;
    }

    if (formData.id) {
      dispatch(updateCustomer(formData));
    } else {
      dispatch(addCustomer({ ...formData, id: Date.now() }));
    }
    resetForm();
  };

  const handleEdit = (customer) => {
    setFormData(customer);
  };

  const handleDelete = (customerId) => {
    dispatch(deleteCustomer(customerId));
  };

  const resetForm = () => {
    setFormData({ id: null, firstName: '', lastName: '', email: '', phone: '', city: '' });
  };

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  const filteredCustomers = customers.filter((customer) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      customer.firstName.toLowerCase().includes(lowerCaseQuery) ||
      customer.lastName.toLowerCase().includes(lowerCaseQuery) ||
      customer.email.toLowerCase().includes(lowerCaseQuery) ||
      customer.phone.includes(searchQuery) 
    );
  });

  // Alert if no customers found after searching
  if (searchQuery && filteredCustomers.length === 0) {
    alert('No Customer Exists');
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-8">Customer Dashboard</h1>
        
        {/* Customer Form */}
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="p-2 rounded-lg shadow-md mb-2 w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="p-2 rounded-lg shadow-md mb-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 rounded-lg shadow-md mb-2 w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="p-2 rounded-lg shadow-md mb-2 w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="p-2 rounded-lg shadow-md mb-2 w-full"
          />
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
            {formData.id ? 'Update Customer' : 'Add Customer'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex mb-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-lg shadow-md text-gray-700 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Search
          </button>
        </div>

        {/* Customer Details Table */}
        <table className="min-w-full border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300">First Name</th>
              <th className="px-4 py-2 border border-gray-300">Last Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Phone</th>
              <th className="px-4 py-2 border border-gray-300">City</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{customer.firstName}</td>
                  <td className="px-4 py-2 border border-gray-300">{customer.lastName}</td>
                  <td className="px-4 py-2 border border-gray-300">{customer.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{customer.phone}</td>
                  <td className="px-4 py-2 border border-gray-300">{customer.city}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-full mr-2"
                      onClick={() => handleEdit(customer)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded-full"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 border border-gray-300">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManagement;
