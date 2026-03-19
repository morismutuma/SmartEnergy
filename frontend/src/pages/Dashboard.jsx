import { useState, useEffect } from 'react'
import { Bell, TrendingUp, DollarSign, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import CircularGauge from '../components/CircularGauge'

const CATEGORY_ICONS = { heating:'🌡️', kitchen:'🍳', entertainment:'📺', lighting:'💡', charging:'🔌', other:'⚡' }

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/dashboard/').then(r => setData(r.data)).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-60">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!data) return <p className="text-gray-500 text-center mt-10">Failed to load data.</p>

  const { total_kwh_today, estimated_cost_today, alert_threshold, appliances, unread_notifications, trend } = data

  const maxTrend = Math.max(...trend.map(t => t.kwh), alert_threshold)

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Notifications banner */}
      {unread_notifications > 0 && (
        <button onClick={() => navigate('/settings')} className="w-full bg-yellow-900/30 border border-yellow-700/50 rounded-2xl p-3.5 flex items-center gap-3 text-left">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <Bell size={15} className="text-yellow-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-yellow-200 text-sm font-medium">{unread_notifications} unread alert{unread_notifications > 1 ? 's' : ''}</p>
            <p className="text-yellow-400/60 text-xs">Tap to view notifications</p>
          </div>
          <span className="text-yellow-400 text-xs">→</span>
        </button>
      )}

      {/* Main gauge + stats */}
      <div className="card-glow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-white">Energy Today</h2>
          <span className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</span>
        </div>

        <div className="flex items-center justify-around">
          <CircularGauge value={total_kwh_today} max={alert_threshold} label="Consumption" />
          <div className="space-y-4">
            <div className="card p-3.5 min-w-[110px]">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={13} className="text-primary-400" />
                <span className="text-xs text-gray-400">Est. Cost</span>
              </div>
              <p className="font-display font-bold text-white text-lg">${estimated_cost_today.toFixed(2)}</p>
            </div>
            <div className="card p-3.5">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={13} className="text-yellow-400" />
                <span className="text-xs text-gray-400">Devices</span>
              </div>
              <p className="font-display font-bold text-white text-lg">{appliances.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-day mini trend */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={15} className="text-primary-400" />
          <h3 className="font-display font-medium text-white text-sm">7-Day Trend</h3>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {trend.map((t, i) => {
            const h = maxTrend > 0 ? Math.max((t.kwh / maxTrend) * 100, 4) : 4
            const isToday = i === trend.length - 1
            return (
              <div key={t.date} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-sm transition-all duration-700 ${isToday ? 'bg-primary-500' : 'bg-dark-500'}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-gray-600">{new Date(t.date+'T00:00').toLocaleDateString('en-US',{weekday:'short'})[0]}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top consuming appliances */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-white">Top Consumers</h3>
          <button onClick={() => navigate('/appliances')} className="text-xs text-primary-400 hover:text-primary-300">View all →</button>
        </div>

        {appliances.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-500 text-sm">No appliances yet.</p>
            <button onClick={() => navigate('/appliances')} className="btn-primary mt-3 text-sm px-5">Add your first device</button>
          </div>
        ) : (
          <div className="space-y-2">
            {appliances.slice(0, 5).map(a => {
              const pct = Math.min((a.daily_kwh / alert_threshold) * 100, 100)
              const barClass = a.usage_level === 'high' ? 'bg-red-500' : a.usage_level === 'medium' ? 'bg-yellow-500' : 'bg-primary-500'
              return (
                <div key={a.id} className="card p-3.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-dark-600 flex items-center justify-center text-base flex-shrink-0">
                    {CATEGORY_ICONS[a.category] || '⚡'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white truncate">{a.name}</span>
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{a.daily_kwh.toFixed(3)} kWh</span>
                    </div>
                    <div className="h-1.5 bg-dark-500 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${barClass} transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
