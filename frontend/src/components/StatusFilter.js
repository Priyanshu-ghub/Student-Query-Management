import React from 'react';

const StatusFilter = ({ statusFilter, setStatusFilter }) => {
  const statuses = ['All', 'Pending', 'Resolved'];

  return (
    <div className="status-filter">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        {statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;