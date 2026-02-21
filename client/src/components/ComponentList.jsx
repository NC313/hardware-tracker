import axios from 'axios'

const COLORS = {
  prototype: { bg: '#fff7ed', color: '#ea580c' },
  testing: { bg: '#eff6ff', color: '#2563eb' },
  shipped: { bg: '#f0fdf4', color: '#16a34a' }
}

function StatusBadge({ status }) {
  const c = COLORS[status] || { bg: '#f3f4f6', color: '#6b7280' }
  return (
    <span style={{
      background: c.bg,
      color: c.color,
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'capitalize'
    }}>
      {status}
    </span>
  )
}

function ComponentList({ components, onUpdate }) {
  const handleStatusChange = async (id, newStatus, updatedBy) => {
   await axios.patch(`https://hardware-tracker-api.onrender.com/api/components/${id}`, {
  status: newStatus,
  updatedBy: updatedBy || 'anonymous'
    })
    onUpdate()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this component?')) return
    await axios.delete(`https://hardware-tracker-api.onrender.com/api/components/${id}`)
    onUpdate()
  }

  return (
    <div>
      <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
        Components
      </div>
      {components.length === 0 && (
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>No components yet. Add one above!</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {components.map(c => (
          <div key={c._id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px 24px',
            border: '1px solid #e5e7eb'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>{c.name}</span>
              <StatusBadge status={c.status} />
            </div>

            {/* Details */}
            <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
              <span><strong style={{ color: '#374151' }}>Notes:</strong> {c.notes}</span>
              <span><strong style={{ color: '#374151' }}>Last updated by:</strong> {c.updatedBy}</span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <select
                value={c.status}
                onChange={e => handleStatusChange(c._id, e.target.value, c.updatedBy)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '13px',
                  outline: 'none',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="prototype">Prototype</option>
                <option value="testing">Testing</option>
                <option value="shipped">Shipped</option>
              </select>
              <button
                onClick={() => handleDelete(c._id)}
                style={{
                  padding: '7px 14px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>

            {/* Activity Log */}
            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Activity Log
              </div>
              {c.activityLog.length === 0 && (
                <p style={{ fontSize: '13px', color: '#d1d5db' }}>No changes yet</p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {c.activityLog.map(log => (
                  <div key={log._id} style={{ fontSize: '12px', color: '#9ca3af' }}>
                    <strong style={{ color: '#6b7280' }}>{log.changedBy}</strong> changed to{' '}
                    <strong style={{ color: '#6b7280' }}>{log.changedTo}</strong> at {new Date(log.changedAt).toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComponentList