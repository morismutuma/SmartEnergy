
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Zap, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login, getSavedUsername } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [remember, setRemember] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Pre-fill saved username on mount
  useEffect(() => {
    const saved = getSavedUsername()
    if (saved) {
      setForm(f => ({ ...f, username: saved }))
      setRemember(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username.trim()) return setError('Please enter your username.')
    if (!form.password) return setError('Please enter your password.')
    setError(''); setLoading(true)
    try {
      await login(form.username.trim(), form.password, remember)
      navigate('/')
    } catch (err) {
      const status = err.response?.status
      const detail = err.response?.data?.detail
      if (status === 401 || detail?.toLowerCase().includes('no active account')) {
        setError('Username or password is incorrect. Please try again.')
      } else if (status === 400) {
        setError('Please fill in all fields correctly.')
      } else if (!err.response) {
        setError('Cannot connect to server. Make sure the backend is running on port 8000.')
      } else {
        setError(detail || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-5 max-w-md mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
          <Zap size={22} className="text-primary-400" fill="currentColor" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-white leading-none">Wattwise</h1>
          <p className="text-xs text-gray-500">Smart Energy Monitor</p>
        </div>
      </div>

      <div className="w-full card p-6">
        <h2 className="font-display font-semibold text-xl text-white mb-1">Welcome back</h2>
        <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input
              className="input-field"
              placeholder="your username"
              autoComplete="username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                className="input-field pr-11"
                placeholder="••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <div
              onClick={() => setRemember(r => !r)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                remember ? 'bg-primary-500 border-primary-500' : 'border-dark-400 bg-dark-600'
              }`}
            >
              {remember && <span className="text-white text-[10px] font-bold">✓</span>}
            </div>
            <span className="text-sm text-gray-400">Remember my username</span>
          </label>

          {error && (
            <div className="bg-red-900/30 border border-red-800/50 rounded-xl p-3 text-red-300 text-sm leading-relaxed">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
            {loading
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : 'Sign In'
            }
          </button>
        </form>
      </div>

      <p className="text-gray-500 text-sm mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">Create one</Link>
      </p>
    </div>
  )
}

