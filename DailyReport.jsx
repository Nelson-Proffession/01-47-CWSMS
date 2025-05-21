import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailyReport = () => {
  const [report, setReport] = useState([]);

  // Fetch daily report
  const fetchDailyReport = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dailyreport');
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching daily report:', error);
    }
  };

  // Fetch report on component mount
  useEffect(() => {
    fetchDailyReport();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Daily Report</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Service Number</th>
            <th>Service Price</th>
            <th>Amount Paid</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item, index) => (
            <tr key={index}>
              <td>{item.PlateNumber}</td>
              <td>{item.ServiceNumber}</td>
              <td>{item.ServicePrice}</td>
              <td>{item.AmountPaid}</td>
              <td>{item.PaymentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyReport;