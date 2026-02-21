import { useState, useEffect } from 'react'
import axios from 'axios'
import ComponentList from './components/ComponentList'
import AddComponent from './components/AddComponent'
import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage'
import { saveToken, getToken, removeToken, decodeToken, isTokenValid } from './auth'

const NAV_ITEMS_ADMIN = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'components', label: 'Components', icon: '🔧' },
  { id: 'add', label: 'Add Component', icon: '➕' },
]

const NAV_ITEMS_VIEWER = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'components', label: 'Components', icon: '🔧' },
]

function App() {
  const [components, setComponents] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [token, setToken] = useState(() => {
    const t = getToken()
    return isTokenValid(t) ? t : null
  })
  const [user, setUser] = useState(() => {
    const t = getToken()
    return isTokenValid(t) ? decodeToken(t) : null
  })

  // Handle OAuth redirect — grab ?token= from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get('token')
    if (urlToken && isTokenValid(urlToken)) {
      handleLogin(urlToken)
      // Clean the URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  // Set axios default auth header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  const handleLogin = (newToken) => {
    saveToken(newToken)
    setToken(newToken)
    setUser(decodeToken(newToken))
  }

  const handleLogout = () => {
    removeToken()
    setToken(null)
    setUser(null)
    setActiveTab('dashboard')
  }

  const fetchComponents = async () => {
    const res = await axios.get(`https://hardware-tracker-api.onrender.com/api/components`)
    setComponents(res.data)
  }

  useEffect(() => {
    if (token) fetchComponents()
  }, [token])

  // Not logged in — show login page
  if (!token || !user) {
    return <LoginPage onLogin={handleLogin} />
  }

  const navItems = user.role === 'admin' ? NAV_ITEMS_ADMIN : NAV_ITEMS_VIEWER
  const initial = user.username ? user.username.charAt(0).toUpperCase() : '?'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb', fontFamily: 'sans-serif' }}>

      {/* Sidebar */}
      <div style={{
        width: '220px',
        background: '#111827',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        flexShrink: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh'
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1f2937' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>⚙️ Hardware Tracker</div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>Component Pipeline</div>
        </div>

        {/* Nav Items */}
        <nav style={{ padding: '12px 0', flex: 1 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                background: activeTab === item.id ? '#1f2937' : 'transparent',
                color: activeTab === item.id ? 'white' : '#9ca3af',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === item.id ? '600' : '400',
                textAlign: 'left',
                borderLeft: activeTab === item.id ? '3px solid #6366f1' : '3px solid transparent',
                transition: 'all 0.15s'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom user section */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1f2937' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#6366f1', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'white'
            }}>
              {initial}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{user.username}</div>
              <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px',
              background: '#1f2937',
              color: '#9ca3af',
              border: '1px solid #374151',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '220px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Top Header */}
        <div style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'components' && 'Components'}
              {activeTab === 'add' && 'Add Component'}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
              {components.length} total components
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              background: '#f0fdf4', color: '#16a34a',
              padding: '4px 12px', borderRadius: '20px',
              fontSize: '12px', fontWeight: '600'
            }}>
              ● Live
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '32px', flex: 1 }}>
          {activeTab === 'dashboard' && (
            <Dashboard components={components} />
          )}
          {activeTab === 'components' && (
            <ComponentList components={components} onUpdate={fetchComponents} userRole={user.role} />
          )}
          {activeTab === 'add' && (
            <div style={{ maxWidth: '600px' }}>
              <AddComponent onAdd={() => { fetchComponents(); setActiveTab('components') }} username={user.username} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
