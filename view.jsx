import React, { useState, useEffect } from 'react';
import axios from 'axios';

const View = () => {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [formData, setFormData] = useState({
    RecordNumber: '',
    ServiceDate: '',
    PlateNumber: '',
  });
  const [updateMode, setUpdateMode] = useState(false);

  // Fetch all service package
  const fetchServiceRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8000/servicepackage');
      setServiceRecords(response.data);
    } catch (error) {
      console.error('Error fetching service package:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update a service record
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/addservicepackage', formData);
    alert(response.data.message);
    setFormData({ RecordNumber: '', ServiceDate: '', PlateNumber: '' });
    fetchServiceRecords(); // Refresh the table
  } catch (error) {
    if (error.response && error.response.data.error) {
      alert(error.response.data.error); // Display backend error message
    } else {
      console.error('Error adding service record:', error);
    }
  }
};

  // Delete a service record
  const handleDelete = async (RecordNumber) => {
    try {
      await axios.delete(`http://localhost:8000/deleteservicepackage/${RecordNumber}`);
      alert('Service record deleted successfully!');
      fetchServiceRecords();
    } catch (error) {
      console.error('Error deleting service record:', error);
    }
  };

  // Populate form for updating a record
  const handleEdit = (record) => {
    setFormData(record);
    setUpdateMode(true);
  };

  // Fetch records on component mount
  useEffect(() => {
    fetchServiceRecords();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1><u> The Service Package Management</u></h1>

      {/* Form for adding/updating service records */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>Record Number:</label>
          <input
            type="number"
            name="RecordNumber"
            value={formData.RecordNumber}
            onChange={handleInputChange}
            required
            disabled={updateMode} // Disable RecordNumber input in update mode
          />
        </div>
        <div>
          <label>Service Date:</label>
          <input
            type="date"
            name="ServiceDate"
            value={formData.ServiceDate}
            onChange={handleInputChange}
            required
          />
        </div>
           
        <div>
          <label>Plate Number:</label>
          <input
            type="text"
            name="PlateNumber"
            value={formData.PlateNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{updateMode ? 'Update Record' : 'Add Record'}</button>
        {updateMode && <button onClick={() => setUpdateMode(false)}>Cancel</button>}
      </form>

      {/* Table to display service records */}
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Record Number</th>
            <th>Service Date</th>
            <th>Plate Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceRecords.map((record) => (
            <tr key={record.RecordNumber}>
              <td>{record.RecordNumber}</td>
              <td>{record.ServiceDate}</td>
              <td>{record.PlateNumber}</td>
              <td>
                <button onClick={() => handleEdit(record)}>Edit</button>
                <button onClick={() => handleDelete(record.RecordNumber)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;