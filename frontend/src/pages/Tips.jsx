const TIPS = [
  {
    icon: '💡',
    title: 'Switch to LED bulbs',
    desc: 'LED bulbs use up to 80% less energy than incandescent bulbs and last 25x longer.',
    saving: 'Save up to 80%',
    category: 'Lighting',
  },
  {
    icon: '🔌',
    title: 'Unplug idle chargers',
    desc: 'Phone chargers and adapters draw power even when nothing is connected. Unplug when not in use.',
    saving: 'Save ~$50/yr',
    category: 'Charging',
  },
  {
    icon: '🌡️',
    title: 'Set smart thermostat',
    desc: 'Lower heating by 1°C can reduce your bill by up to 10%. Use a timer to heat only when home.',
    saving: 'Save up to 10%',
    category: 'Heating',
  },
  {
    icon: '📺',
    title: 'Use sleep timers on TVs',
    desc: 'Modern TVs left on standby still consume power. Enable sleep timers or unplug overnight.',
    saving: 'Save ~$30/yr',
    category: 'Entertainment',
  },
  {
    icon: '🍳',
    title: 'Match pot to burner size',
    desc: 'Using a small pan on a large burner wastes up to 40% of the energy produced.',
    saving: 'Save up to 40%',
    category: 'Kitchen',
  },
  {
    icon: '❄️',
    title: 'Keep fridge coils clean',
    desc: 'Dusty condenser coils make your fridge work harder. Clean them every 6 months.',
    saving: 'Save up to 15%',
    category: 'Kitchen',
  },
  {
    icon: '🌅',
    title: 'Use natural light',
    desc: 'Open blinds during the day instead of turning on lights. Simple but effective.',
    saving: 'Save daily',
    category: 'Lighting',
  },
  {
    icon: '⏰',
    title: 'Run laundry off-peak',
    desc: 'Electricity is cheaper at night in many regions. Schedule heavy appliances accordingly.',
    saving: 'Save on tariff',
    category: 'General',
  },
  {
    icon: '🏠',
    title: 'Insulate doors & windows',
    desc: 'Draught-proofing your home reduces heat loss and cuts heating bills significantly.',
    saving: 'Save up to 25%',
    category: 'Heating',
  },
]

const CATEGORY_COLORS = {
  Lighting: 'text-yellow-300 bg-yellow-900/30 border-yellow-800/40',
  Charging: 'text-blue-300 bg-blue-900/30 border-blue-800/40',
  Heating: 'text-red-300 bg-red-900/30 border-red-800/40',
  Entertainment: 'text-purple-300 bg-purple-900/30 border-purple-800/40',
  Kitchen: 'text-orange-300 bg-orange-900/30 border-orange-800/40',
  General: 'text-primary-300 bg-primary-900/30 border-primary-800/40',
}

export default function Tips() {
  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h2 className="font-display font-bold text-xl text-white">Energy Tips</h2>
        <p className="text-gray-500 text-sm">Simple changes that save money</p>
      </div>

      {/* Hero tip */}
      <div className="card-glow p-5 mb-5 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-6xl opacity-20">⚡</div>
        <p className="text-xs text-primary-400 font-medium uppercase tracking-widest mb-2">Pro tip</p>
        <h3 className="font-display font-bold text-white text-lg leading-snug mb-2">
          Audit your home energy usage monthly
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Regular monitoring can cut household energy bills by 15–20%. Wattwise helps you do this automatically — just keep your appliance list up to date.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 rounded-lg px-3 py-1.5">
          <span className="text-primary-300 text-xs font-semibold">💰 Average saving: $200–$400/year</span>
        </div>
      </div>

      {/* Tips grid */}
      <div className="space-y-3">
        {TIPS.map((tip, i) => (
          <div key={i} className="card p-4 flex gap-4 items-start">
            <div className="text-2xl flex-shrink-0 mt-0.5">{tip.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-display font-semibold text-white text-sm">{tip.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${CATEGORY_COLORS[tip.category]}`}>
                  {tip.category}
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-2">{tip.desc}</p>
              <span className="text-primary-400 text-xs font-medium">{tip.saving}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
