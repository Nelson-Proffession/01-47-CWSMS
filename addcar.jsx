import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    PlateNumber: '',
    cartype: '',                     
    carsize: '',
    drivername: '',
    Phonenumber: '',
  });
  const [updateMode, setUpdateMode] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8000/addcar');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update a car
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateMode) {
        await axios.put(`http://localhost:8000/updatecar/${formData.PlateNumber}`, formData);
        alert('Car updated successfully!');
        fetchCars();
      } else {
        await axios.post('http://localhost:8000/addcar', formData);
        alert('Car added successfully!');
        fetchCars();
      }
      setFormData({
        PlateNumber: '',   
        cartype: '',
        carsize: '',
        drivername: '',
        Phonenumber: '',
        
      });
      setUpdateMode(false);
      fetchCars();
    } catch (error) {
      console.error('Error saving car:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  // Delete a car
  const handleDelete = async (PlateNumber) => {
    try {
      await axios.delete(`http://localhost:8000/deletecar/${PlateNumber}`);
      alert('Car deleted successfully!');
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  // Populate form for updating a car
  const handleEdit = (car) => {
    setFormData(car);
    setUpdateMode(true);
  };

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Car Wash Management!CwSmS</h1>

      {/* Form for adding/updating cars */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Plate Number:</label>
          <input
            type="text"
            name="PlateNumber"
            value={formData.PlateNumber}
            onChange={handleInputChange}
            required
            disabled={updateMode} // Disable PlateNumber input in update mode
          />
        </div>
        <div>
          <label>Car Type:</label>
          <input
            type="text"
            name="cartype"
            value={formData.cartype}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Car size:</label>
          <input
            type="text"
            name="carsize"
            value={formData.carsize}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Driver name:</label>
          <input
            type="text"
            name="drivername"
            value={formData.drivername}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone number:</label>
          <input
            type="text"
            name="phonenumber"
            value={formData.Phonenumber}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit">{updateMode ? 'Update Car' : 'Add Car'}</button>
        {updateMode && <button onClick={() => setUpdateMode(false)}>Cancel</button>}
      </form>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      {/* Table to display cars */}
      <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Plate Number</th> 
            <th>Car Type</th>
            <th>Car size</th>
            <th>Driver Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.PlateNumber}>
              <td>{car.PlateNumber}</td>
              <td>{car.cartype}</td>
              <td>{car.carsize}</td>
              <td>{car.drivername}</td>
              <td>{car.Phonenumber}</td>
              <td>
                <button onClick={() => handleEdit(car)}>Edit</button>
                <button onClick={() => handleDelete(car.PlateNumber)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarManagement;