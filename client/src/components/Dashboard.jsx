import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = {
  prototype: '#f97316',
  testing: '#3b82f6',
  shipped: '#22c55e'
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

  const statCards = [
    { label: 'Total Components', value: total, color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'Prototype', value: prototype, color: '#ea580c', bg: '#fff7ed' },
    { label: 'Testing', value: testing, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Shipped', value: shipped, color: '#16a34a', bg: '#f0fdf4' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {statCards.map(card => (
          <div key={card.label} style={{
            background: card.bg,
            borderRadius: '12px',
            padding: '20px 24px',
            borderLeft: `4px solid ${card.color}`
          }}>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500', marginBottom: '8px' }}>
              {card.label}
            </div>
            <div style={{ fontSize: '40px', fontWeight: '700', color: card.color, lineHeight: 1 }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Pie Chart */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
            Status Breakdown
          </div>
          {pieData.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px 0' }}>No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {pieData.map(entry => (
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
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
            Recent Activity
          </div>
          {recentActivity.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px 0' }}>No activity yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((log, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: i < recentActivity.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[log.changedTo] || '#ccc', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {log.componentName}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '20px', flexShrink: 0,
                      background: COLORS[log.changedTo] + '22', color: COLORS[log.changedTo]
                    }}>
                      {log.changedTo}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {new Date(log.changedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
export const statusVariant = { prototype: 'outline', testing: 'secondary', shipped: 'default' }