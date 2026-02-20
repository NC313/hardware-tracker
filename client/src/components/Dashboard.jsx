import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = {
  prototype: '#f6ad55',
  testing: '#63b3ed',
  shipped: '#68d391'
}

const StatusBadge = ({ status }) => {
  const colors = {
    prototype: { background: '#fff8f0', color: '#c05621', border: '1px solid #f6ad55' },
    testing: { background: '#ebf8ff', color: '#2c5282', border: '1px solid #63b3ed' },
    shipped: { background: '#f0fff4', color: '#276749', border: '1px solid #68d391' }
  }
  return (
    <span style={{
      ...colors[status],
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      {status}
    </span>
  )
}

function Dashboard({ components }) {
  const total = components.length
  const prototype = components.filter(c => c.status === 'prototype').length
  const testing = components.filter(c => c.status === 'testing').length
  const shipped = components.filter(c => c.status === 'shipped').length

  const pieData = [
    { name: 'Prototype', value: prototype },
    { name: 'Testing', value: testing },
    { name: 'Shipped', value: shipped }
  ].filter(d => d.value > 0)

  const recentActivity = components
    .flatMap(c => c.activityLog.map(log => ({ ...log, componentName: c.name })))
    .sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt))
    .slice(0, 8)

  return (
    <div>
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Components', value: total, color: '#667eea', bg: '#f0f0ff' },
          { label: 'Prototype', value: prototype, color: '#c05621', bg: '#fff8f0' },
          { label: 'Testing', value: testing, color: '#2c5282', bg: '#ebf8ff' },
          { label: 'Shipped', value: shipped, color: '#276749', bg: '#f0fff4' }
        ].map(card => (
          <div key={card.label} style={{
            background: card.bg,
            border: `1px solid ${card.color}22`,
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: card.color }}>{card.value}</div>
            <div style={{ fontSize: '13px', color: '#718096', marginTop: '4px', fontWeight: '500' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Chart + Activity Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        
        {/* Pie Chart */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#2d3748', fontSize: '15px' }}>Status Breakdown</h3>
          {pieData.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name.toLowerCase()]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Activity Feed */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#2d3748', fontSize: '15px' }}>Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>No activity yet</p>
          ) : (
            recentActivity.map((log, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 0',
                borderBottom: '1px solid #f7fafc'
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: COLORS[log.changedTo] || '#ccc',
                  flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: '600', fontSize: '13px' }}>{log.componentName}</span>
                  <span style={{ fontSize: '13px', color: '#718096' }}> → </span>
                  <StatusBadge status={log.changedTo} />
                </div>
                <div style={{ fontSize: '11px', color: '#a0aec0', whiteSpace: 'nowrap' }}>
                  {new Date(log.changedAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
export { StatusBadge }