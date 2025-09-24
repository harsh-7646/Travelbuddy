import React, { useState } from 'react';
import './Transaction.css';

// 🔹 Export for Dashboard counts
export const transactionData = [
  { id: '01', user: 'Amit Patel', date: '2025-07-20', amount: 2999, status: 'Success', refundable: true },
  { id: '02', user: 'Reema Shah', date: '2025-07-19', amount: 2199, status: 'Pending', refundable: false },
  { id: '03', user: 'Karan Soni', date: '2025-07-18', amount: 4499, status: 'Success', refundable: true },
];

function Payments() {
  const [data, setData] = useState(transactionData);
  const [filter, setFilter] = useState({ user: '', status: '' });

  const onRefund = (id) => {
    const updated = data.map((txn) =>
      txn.id === id ? { ...txn, status: 'Refunded', refundable: false } : txn
    );
    setData(updated);
  };

  const filteredData = data.filter((txn) => {
    return (
      txn.user.toLowerCase().includes(filter.user.toLowerCase()) &&
      txn.status.toLowerCase().includes(filter.status.toLowerCase())
    );
  });

  const exportCSV = () => {
    const csv = [
      ['Transaction ID', 'User', 'Date', 'Amount', 'Status'],
      ...data.map((row) => [row.id, row.user, row.date  , row.amount, row.status]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'payments.csv';
    link.click();
  };

  return (
    <div className="payments-container">
      <div className="filters-box">
        <input
          type="text"
          placeholder="Filter by user..."
          value={filter.user}
          onChange={(e) => setFilter({ ...filter, user: e.target.value })}
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="refunded">Refunded</option>
        </select>
        <button onClick={exportCSV}>Export Report</button>
      </div>

      {/* Desktop Table */}
      <table className="payments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Refund</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.user}</td>
              <td>{txn.date}</td>
              <td>₹{txn.amount}</td>
              <td>
                <span className={`status-badge ${txn.status.toLowerCase()}`}>
                  {txn.status}
                </span>
              </td>
              <td>
                {txn.refundable ? (
                  <button className="refund-btn" onClick={() => onRefund(txn.id)}>Refund</button>
                ) : (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="payments-cards">
        {filteredData.map((txn) => (
          <div key={txn.id} className="payment-card">
            <div className="card-row"><b>ID:</b> {txn.id}</div>
            <div className="card-row"><b>User:</b> {txn.user}</div>
            <div className="card-row"><b>Date:</b> {txn.date}</div>
            <div className="card-row"><b>Amount:</b> ₹{txn.amount}</div>
            <div className="card-row">
              <b>Status:</b>
              <strong className={`status-badge ${txn.status.toLowerCase()}`}>{txn.status}</strong>
            </div>
            <div className="card-row">
              <b>Refund:</b>
              {txn.refundable ? (
                <button className="refund-btn" onClick={() => onRefund(txn.id)}>Refund</button>
              ) : (
                <strong>—</strong>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payments;