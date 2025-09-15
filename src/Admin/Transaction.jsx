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













// Second way 





// import React, { useState } from 'react';
// import './Transactions.css';

// const mockTransactions = [
//   {
//     id: 'TXN001',
//     user: 'John Doe',
//     date: '2025-07-22',
//     amount: 2500,
//     status: 'Success',
//     refundable: true,
//   },
//   {
//     id: 'TXN002',
//     user: 'Jane Smith',
//     date: '2025-07-20',
//     amount: 1800,
//     status: 'Pending',
//     refundable: false,
//   },
//   {
//     id: 'TXN003',
//     user: 'Alex Roy',
//     date: '2025-07-21',
//     amount: 3100,
//     status: 'Success',
//     refundable: true,
//   },
// ];

// function Transactions() {
//   const [transactions, setTransactions] = useState(mockTransactions);
//   const [filters, setFilters] = useState({
//     user: '',
//     date: '',
//     status: '',
//   });

//   const handleRefund = (id) => {
//     const updated = transactions.map((txn) =>
//       txn.id === id ? { ...txn, status: 'Refunded', refundable: false } : txn
//     );
//     setTransactions(updated);
//   };

//   const handleExport = () => {
//     const rows = [
//       ['Transaction ID', 'User', 'Date', 'Amount', 'Status'],
//       ...transactions.map((txn) => [
//         txn.id,
//         txn.user,
//         txn.date,
//         txn.amount,
//         txn.status,
//       ]),
//     ];

//     const csvContent =
//       'data:text/csv;charset=utf-8,' +
//       rows.map((e) => e.join(',')).join('\n');

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.href = encodedUri;
//     link.download = 'transactions_report.csv';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filtered = transactions.filter((txn) => {
//     return (
//       txn.user.toLowerCase().includes(filters.user.toLowerCase()) &&
//       txn.date.includes(filters.date) &&
//       txn.status.toLowerCase().includes(filters.status.toLowerCase())
//     );
//   });

//   return (
//     <div className="transaction-container">
//       <h2>Transaction / Payments</h2>

//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search by User"
//           value={filters.user}
//           onChange={(e) => setFilters({ ...filters, user: e.target.value })}
//         />
//         <input
//           type="date"
//           value={filters.date}
//           onChange={(e) => setFilters({ ...filters, date: e.target.value })}
//         />
//         <select
//           value={filters.status}
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//         >
//           <option value="">All Status</option>
//           <option value="Success">Success</option>
//           <option value="Pending">Pending</option>
//           <option value="Refunded">Refunded</option>
//         </select>
//         <button className="export-btn" onClick={handleExport}>Export CSV</button>
//       </div>

//       <table className="transaction-table">
//         <thead>
//           <tr>
//             <th>Txn ID</th>
//             <th>User</th>
//             <th>Date</th>
//             <th>Amount (₹)</th>
//             <th>Status</th>
//             <th>Refund</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((txn, index) => (
//             <tr key={index}>
//               <td>{txn.id}</td>
//               <td>{txn.user}</td>
//               <td>{txn.date}</td>
//               <td>₹{txn.amount}</td>
//               <td>{txn.status}</td>
//               <td>
//                 {txn.refundable ? (
//                   <button onClick={() => handleRefund(txn.id)} className="refund-btn">
//                     Refund
//                   </button>
//                 ) : (
//                   <span>—</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Transactions;
