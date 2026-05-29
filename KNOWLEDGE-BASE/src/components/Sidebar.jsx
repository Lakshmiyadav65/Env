import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'

const navItems = [
    {
        id: 'dashboard', label: 'Dashboard', path: '/',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
    },
    {
        id: 'pcf', label: 'PCF Request', path: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: 'portfolio', label: 'Product Portfolio', path: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'components', label: 'Components Master', path: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'document', label: 'Document Master', path: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'task', label: 'Task Management', path: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: 'reports', label: 'Reports', path: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: 'quality', label: 'Data Quality Rating', path: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: 'settings', label: 'Settings', path: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className={styles.navIcon}>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
    },
]

export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <aside className={styles.sidebar}>
            {/* Logo */}
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className={styles.logoText}>
                    <span className={styles.logoName}>Enviguide</span>
                    <span className={styles.logoSub}>MANAGEMENT SUITE</span>
                </div>
            </div>

            {/* Nav */}
            <nav className={styles.nav}>
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                        onClick={() => item.path !== '#' && navigate(item.path)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Knowledge Base Card */}
            <div className={styles.knowledgeCard}>
                <div className={styles.knowledgeIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className={styles.knowledgeContent}>
                    <p className={styles.knowledgeTitle}>Knowledge Base</p>
                    <p className={styles.knowledgeDesc}>Unlock the full potential of Enviguide with our expert-led documentation.</p>
                    <button className={styles.knowledgeLink} onClick={() => navigate('/help-centre')}>Browse Guides →</button>
                </div>
            </div>

            {/* Help & Support */}
            <button className={styles.helpBtn} onClick={() => navigate('/support')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                HELP &amp; SUPPORT
            </button>
        </aside>
    )
}
