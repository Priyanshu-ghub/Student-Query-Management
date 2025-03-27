const QueryList = ({ queries, onDelete }) => {
  return (
    <div className="query-list">
      {queries.length === 0 ? (
        <div className="empty-state">
          <img src="/images/no-queries.svg" alt="No queries" />
          <p>No queries found. Submit your first query!</p>
        </div>
      ) : (
        queries.map((query) => (
          <div key={query._id} className="query-card">
            <div className="query-header">
              <h3>{query.studentName}</h3>
              <div className="query-meta">
                <span className={`status-badge status-${query.status.toLowerCase()}`}>
                  {query.status}
                </span>
                <span className="query-date">
                  {new Date(query.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="query-content">
              <p>{query.question}</p>
              {query.response && (
                <div className="response-section">
                  <strong>Response:</strong>
                  <p>{query.response}</p>
                </div>
              )}
            </div>

            <div className="query-actions">
              <button className="action-btn resolve-btn">
                Mark Resolved
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => onDelete(query._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default QueryList;