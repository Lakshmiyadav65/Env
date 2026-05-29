import { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import styles from './Dashboard.module.css'

const kpiData = [
    {
        id: 'co2',
        value: 2847,
        unit: ' kg',
        label: 'Total CO₂e Emissions',
        note: 'vs. previous period',
        badge: '-12.3%',
        badgeType: 'down',
        iconColor: '#22c55e',
        iconBg: 'rgba(34,197,94,0.1)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: 'mfg',
        value: 1243,
        unit: ' kg',
        label: 'Manufacturing Emissions',
        note: '43.7% of total',
        badge: '+5.2%',
        badgeType: 'up',
        iconColor: '#3b82f6',
        iconBg: 'rgba(59,130,246,0.1)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="#3b82f6" strokeWidth="2" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 12v4M10 14h4" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'recycle',
        value: 72.5,
        unit: '%',
        label: 'Recyclability Rate',
        note: 'Target: 85%',
        badge: '+8.1%',
        badgeType: 'up',
        iconColor: '#a855f7',
        iconBg: 'rgba(168,85,247,0.1)',
        decimals: 1,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: 'transport',
        value: 487,
        unit: ' kg',
        label: 'Transport Emissions',
        note: '17.1% of total',
        badge: '-18.4%',
        badgeType: 'down',
        iconColor: '#f97316',
        iconBg: 'rgba(249,115,22,0.1)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 9v4M12 17h.01" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
]

function useCountUp(target, decimals = 0, duration = 1200) {
    const [count, setCount] = useState(0)
    const startTime = useRef(null)
    const rafId = useRef(null)

    useEffect(() => {
        startTime.current = null
        const animate = (timestamp) => {
            if (!startTime.current) startTime.current = timestamp
            const elapsed = timestamp - startTime.current
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(parseFloat((eased * target).toFixed(decimals)))
            if (progress < 1) rafId.current = requestAnimationFrame(animate)
        }
        rafId.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafId.current)
    }, [target, decimals, duration])

    return count
}

function KpiCard({ kpi }) {
    const count = useCountUp(kpi.value, kpi.decimals || 0)
    const displayValue = kpi.decimals
        ? count.toFixed(kpi.decimals) + kpi.unit
        : Math.round(count).toLocaleString() + kpi.unit

    return (
        <div className={styles.kpiCard}>
            <div className={styles.kpiTop}>
                <div className={styles.kpiIcon} style={{ background: kpi.iconBg }}>
                    {kpi.icon}
                </div>
                <span className={`${styles.badge} ${kpi.badgeType === 'down' ? styles.badgeDown : styles.badgeUp}`}>
                    {kpi.badge}
                </span>
            </div>
            <div className={styles.kpiValue}>{displayValue}</div>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiNote}>{kpi.note}</div>
        </div>
    )
}

export default function Dashboard() {
    const [exportDone, setExportDone] = useState(false)
    const [searchVal, setSearchVal] = useState('')

    const handleExport = () => {
        setExportDone(true)
        setTimeout(() => setExportDone(false), 2000)
    }

    return (
        <div className={styles.layout}>
            <Sidebar />

            <main className={styles.main}>
                {/* Header */}
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.welcomeTitle}>Welcome back!</h1>
                        <p className={styles.welcomeSub}>Manage your environmental data</p>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.searchBar}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
                                <path d="M21 21l-4.35-4.35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <input
                                className={styles.searchInput}
                                placeholder="Search..."
                                value={searchVal}
                                onChange={e => setSearchVal(e.target.value)}
                            />
                        </div>
                        <div className={styles.userProfile}>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>Narasimha</span>
                                <span className={styles.userRole}>ADMIN</span>
                            </div>
                            <div className={styles.avatar}>N</div>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </header>

                {/* Body */}
                <div className={styles.body}>

                    {/* PCF Banner */}
                    <div className={styles.pcfBanner}>
                        <div className={styles.pcfLeft}>
                            <div className={styles.pcfIcon}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <h2 className={styles.pcfTitle}>Product Carbon Footprint Dashboard</h2>
                                <p className={styles.pcfSub}>Comprehensive carbon footprint metrics across product lifecycle</p>
                            </div>
                        </div>
                        <button className={styles.exportBtn} onClick={handleExport}>
                            {exportDone ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Exported!
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Export Report
                                </>
                            )}
                        </button>
                    </div>

                    {/* Client Selector */}
                    <div className={styles.clientRow}>
                        <div className={styles.selectWrap}>
                            <select className={styles.clientSelect}>
                                <option value="">Select Client</option>
                                <option value="a">Client A</option>
                                <option value="b">Client B</option>
                                <option value="c">Client C</option>
                            </select>
                            <svg className={styles.selectChevron} width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div className={styles.kpiGrid}>
                        {kpiData.map(kpi => <KpiCard key={kpi.id} kpi={kpi} />)}
                    </div>

                    {/* Charts */}
                    <div className={styles.chartsGrid}>

                        {/* Lifecycle Bar Chart */}
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <h3 className={styles.chartTitle}>Product Life Cycle Emission</h3>
                                <a href="#" className={styles.viewDetails}>View Details</a>
                            </div>
                            <div className={styles.chartArea}>
                                <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                    <line x1="30" y1="10" x2="330" y2="10" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
                                    <line x1="30" y1="45" x2="330" y2="45" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
                                    <line x1="30" y1="80" x2="330" y2="80" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
                                    <line x1="30" y1="115" x2="330" y2="115" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
                                    <text x="24" y="14" fontSize="8" fill="#9ca3af" textAnchor="end">800</text>
                                    <text x="24" y="49" fontSize="8" fill="#9ca3af" textAnchor="end">600</text>
                                    <text x="24" y="84" fontSize="8" fill="#9ca3af" textAnchor="end">400</text>
                                    <text x="24" y="119" fontSize="8" fill="#9ca3af" textAnchor="end">200</text>
                                    <rect x="42" y="55" width="22" height="75" rx="4" fill="#22c55e" opacity="0.85" />
                                    <rect x="82" y="30" width="22" height="100" rx="4" fill="#22c55e" opacity="0.85" />
                                    <rect x="122" y="70" width="22" height="60" rx="4" fill="#22c55e" opacity="0.85" />
                                    <rect x="162" y="20" width="22" height="110" rx="4" fill="#22c55e" opacity="0.85" />
                                    <rect x="202" y="50" width="22" height="80" rx="4" fill="#22c55e" opacity="0.85" />
                                    <rect x="242" y="40" width="22" height="90" rx="4" fill="#22c55e" opacity="0.85" />
                                    <rect x="282" y="65" width="22" height="65" rx="4" fill="#22c55e" opacity="0.85" />
                                    <text x="53" y="148" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Raw Mat.</text>
                                    <text x="93" y="148" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Mfg.</text>
                                    <text x="133" y="148" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Transport</text>
                                    <text x="173" y="148" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Use Phase</text>
                                    <text x="213" y="148" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Recycle</text>
                                    <text x="253" y="148" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Disposal</text>
                                    <text x="293" y="148" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Other</text>
                                </svg>
                            </div>
                        </div>

                        {/* Supplier Donut Chart */}
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <h3 className={styles.chartTitle}>Supplier Emission</h3>
                                <a href="#" className={styles.viewDetails}>View Details</a>
                            </div>
                            <div className={styles.chartArea}>
                                <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                    <g transform="translate(100, 80)">
                                        <circle cx="0" cy="0" r="55" fill="none" stroke="#f3f4f6" strokeWidth="22" />
                                        <circle cx="0" cy="0" r="55" fill="none" stroke="#22c55e" strokeWidth="22" strokeDasharray="138 207" strokeDashoffset="0" transform="rotate(-90)" />
                                        <circle cx="0" cy="0" r="55" fill="none" stroke="#3b82f6" strokeWidth="22" strokeDasharray="83 262" strokeDashoffset="-138" transform="rotate(-90)" />
                                        <circle cx="0" cy="0" r="55" fill="none" stroke="#f97316" strokeWidth="22" strokeDasharray="52 293" strokeDashoffset="-221" transform="rotate(-90)" />
                                        <circle cx="0" cy="0" r="55" fill="none" stroke="#a855f7" strokeWidth="22" strokeDasharray="34 311" strokeDashoffset="-273" transform="rotate(-90)" />
                                        <text x="0" y="-6" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111827">1,243</text>
                                        <text x="0" y="10" textAnchor="middle" fontSize="7" fill="#6b7280">Total kg CO₂e</text>
                                    </g>
                                    <g transform="translate(200, 30)">
                                        <rect x="0" y="0" width="10" height="10" rx="2" fill="#22c55e" />
                                        <text x="15" y="9" fontSize="9" fill="#374151">Supplier A</text>
                                        <text x="105" y="9" fontSize="9" fill="#6b7280">40%</text>
                                        <rect x="0" y="22" width="10" height="10" rx="2" fill="#3b82f6" />
                                        <text x="15" y="31" fontSize="9" fill="#374151">Supplier B</text>
                                        <text x="105" y="31" fontSize="9" fill="#6b7280">24%</text>
                                        <rect x="0" y="44" width="10" height="10" rx="2" fill="#f97316" />
                                        <text x="15" y="53" fontSize="9" fill="#374151">Supplier C</text>
                                        <text x="105" y="53" fontSize="9" fill="#6b7280">15%</text>
                                        <rect x="0" y="66" width="10" height="10" rx="2" fill="#a855f7" />
                                        <text x="15" y="75" fontSize="9" fill="#374151">Others</text>
                                        <text x="105" y="75" fontSize="9" fill="#6b7280">21%</text>
                                    </g>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
