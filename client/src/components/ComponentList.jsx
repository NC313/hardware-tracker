import axios from 'axios'

function ComponentList({ components, onUpdate }) {
  const handleStatusChange = async (id, newStatus, updatedBy) => {
    await axios.patch(`http://localhost:5000/api/components/${id}`, {
      status: newStatus,
      updatedBy: updatedBy || 'anonymous'
    })
    onUpdate()
  }

  return (
    <div>
      <h2>Components</h2>
      {components.length === 0 && <p>No components yet. Add one above!</p>}
      {components.map(c => (
        <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '12px' }}>
          <h3>{c.name}</h3>
          <p><strong>Status:</strong> {c.status}</p>
          <p><strong>Notes:</strong> {c.notes}</p>
          <p><strong>Last updated by:</strong> {c.updatedBy}</p>
          <select
            value={c.status}
            onChange={e => handleStatusChange(c._id, e.target.value, c.updatedBy)}
          >
            <option value="prototype">Prototype</option>
            <option value="testing">Testing</option>
            <option value="shipped">Shipped</option>
          </select>
          <div style={{ marginTop: '10px' }}>
            <strong>Activity Log:</strong>
            {c.activityLog.length === 0 && <p style={{ color: '#999' }}>No changes yet</p>}
            {c.activityLog.map(log => (
              <p key={log._id} style={{ fontSize: '12px', color: '#666' }}>
                {log.changedBy} changed to <strong>{log.changedTo}</strong> at {new Date(log.changedAt).toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ComponentList