import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './HelpCentre.module.css'

const CATEGORIES = [
    {
        id: 'env',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Environment Setup',
        desc: 'Get your green workspace ready with our foundational configuration guides.',
    },
    {
        id: 'api',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M10 20l4-16M4 8l-4 4 4 4M20 8l4 4-4 4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'API Integration',
        desc: 'Connect your existing tech stack seamlessly with our robust developer API.',
    },
    {
        id: 'compliance',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Compliance',
        desc: 'Stay ahead of global environmental standards with our compliance guides.',
    },
    {
        id: 'analytics',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Data Analytics',
        desc: 'Extract deep insights from your sustainability metrics with ease.',
    },
    {
        id: 'team',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Team Management',
        desc: 'Manage roles and global collaboration for your impact teams.',
    },
    {
        id: 'billing',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="#22c55e" strokeWidth="2" />
                <path d="M2 10h20" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Billing & Plans',
        desc: 'Everything you need to know about your subscription and enterprise invoicing.',
    },
    {
        id: 'supplier',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Supplier Questionnaire Guidance',
        desc: 'Expert guidance on completing and submitting supplier sustainability questionnaires.',
    },
    {
        id: 'pcf',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'PCF Manuals',
        desc: 'Complete step-by-step documentation for Product Carbon Footprint workflows.',
    },
    {
        id: 'manufacturer',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 21h18M3 7v14M13 3v18M21 11v10M8 9h2M16 13h2" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Manufacture Own Emission Questionnaire Guidance',
        desc: 'Comprehensive guidance on completing the manufacturer own emissions reporting questionnaire.',
    },
]

const POPULAR_ARTICLES = [
    { tag: 'Getting Started', title: 'What is Enviguide? — Platform Overview', path: '/article-what-is-enviguide' },
    { tag: 'Getting Started', title: 'How the Platform Works — Step-by-Step Walkthrough', path: '/article-platform-walkthrough' },
    { tag: 'Supplier Guide', title: 'How to Fill Out a Supplier Questionnaire', path: '/supplier-questionnaire' },
    { tag: 'Manufacturer Guide', title: 'Manufacture Own Emission Questionnaire Guidance', path: '/manufacturer-questionnaire' },
]

const STATS = [
    { value: '500+', label: 'HELP ARTICLES' },
    { value: '15+', label: 'USER MANUALS' },
    { value: '100%', label: 'STAKEHOLDER COVERAGE' },
]

const POPULAR_SEARCHES = ['API Keys', 'Metric Report', 'Team Roles']

const MANUALS_ADMIN = [
    { title: 'How to create a Manufacture ?', path: '/admin-article-create-manufacturer', type: 'Admin Manual' },
    { title: 'How to Create a New User ?', path: '/admin-article-create-new-user', type: 'Admin Manual' },
    { title: 'Complete Guide to Manage User Authorizations in Enviguide', path: '/admin-article-manage-authorizations', type: 'Admin Manual' },
    { title: 'How to Add a Product in Enviguide', path: '/admin-article-add-product', type: 'Admin Manual' },
    { title: 'What a Super Admin must do after a Manufacturer submits a PCF request.', path: '/admin-article-pcf-workflow', type: 'Admin Manual' },
    { title: 'What is Data Configuration in Enviguide ?', path: '/admin-article-data-config', type: 'Admin Manual' },
    { title: 'What is Master Data Setup in Enviguide?', path: '/admin-article-master-setup', type: 'Admin Manual' },
    { title: 'What is EcoInvent Emission Factor in Enviguide ?', path: '/admin-article-ecoinvent', type: 'Admin Manual' },
]

const MANUALS_MANUFACTURER = [
    { title: 'How to Get Access to Enviguide', path: '/article-get-access', type: 'Manufacturer Manual' },
    { title: 'How to Add a Product to the Product Portfolio', path: '/article-add-product', type: 'Manufacturer Manual' },
    { title: 'How to Create a PCF Request for a product', path: '/article-create-pcf-request', type: 'Manufacturer Manual' },
    { title: 'PCF Request Processing Workflow & Admin Actions', path: '/article-pcf-workflow', type: 'Manufacturer Manual' },
    { title: 'How to Add Own Emissions (Manufacturer Own Emissions Questionnaire)', path: '/article-own-emissions', type: 'Manufacturer Manual' },
    { title: 'Component Master', path: '/article-component-master', type: 'Manufacturer Manual' },
    { title: 'Document Master', path: '/article-document-master', type: 'Manufacturer Manual' },
]

const MANUALS_SUPPLIER = [
    { title: 'How to get access for the Supplier Questionnaire', path: '/article-supplier-access', type: 'Supplier Manual' },
    { title: 'Supplier Questionnaire Guidance', path: '/supplier-questionnaire', type: 'Supplier Manual' },
]

const ALL_SEARCHABLE = [
    ...POPULAR_ARTICLES.map(a => ({ title: a.title, path: a.path, type: a.tag })),
    ...CATEGORIES.map(c => ({ title: c.title, path: c.id === 'supplier' ? '/supplier-questionnaire' : c.id === 'manufacturer' ? '/manufacturer-questionnaire' : c.id === 'env' ? '/article-what-is-enviguide' : c.id === 'pcf' ? '/manuals-pcf' : '#', type: 'Category' })),
    ...MANUALS_ADMIN,
    ...MANUALS_MANUFACTURER,
    ...MANUALS_SUPPLIER,
]

export default function HelpCentre() {
    const navigate = useNavigate()
    const searchRef = useRef(null)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [showRoles, setShowRoles] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearch = (query) => {
        setSearch(query)
        if (query.trim().length > 1) {
            const filtered = ALL_SEARCHABLE.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.type.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 6)
            setSearchResults(filtered)
            setShowResults(true)
        } else {
            setSearchResults([])
            setShowResults(false)
        }
    }

    const onSearchClick = () => {
        if (searchResults.length > 0) {
            navigate(searchResults[0].path)
        }
    }

    return (
        <div className={styles.page}>

            {/* ── Minimal Top Bar ── */}
            <div className={styles.topBar}>
                <button className={styles.backBtn} onClick={() => navigate('/')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Dashboard
                </button>
            </div>

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    How can we help you<br />
                    <em className={styles.heroAccent}>sustain</em> more?
                </h1>

                <div ref={searchRef} className={styles.searchWrapper}>
                    <div className={styles.searchBox}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
                            <path d="M21 21l-4.35-4.35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <input
                            className={styles.searchInput}
                            placeholder="Search for articles, sustainability guides, or API docs..."
                            value={search}
                            onChange={e => handleSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && onSearchClick()}
                        />
                        <button className={styles.searchBtn} onClick={onSearchClick}>Search</button>
                    </div>

                    {showResults && (
                        <div className={styles.searchResults}>
                            {searchResults.length > 0 ? (
                                searchResults.map((result, idx) => (
                                    <div
                                        key={idx}
                                        className={styles.searchResultItem}
                                        onClick={() => navigate(result.path)}
                                    >
                                        <div className={styles.resultInfo}>
                                            <span className={styles.resultType}>{result.type}</span>
                                            <p className={styles.resultTitle}>{result.title}</p>
                                        </div>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noResults}>No matches found. Try again.</div>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.popularRow}>
                    <span className={styles.popularLabel}>POPULAR</span>
                    {POPULAR_SEARCHES.map(s => (
                        <button
                            key={s}
                            className={styles.popularChip}
                            onClick={() => handleSearch(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Browse by Category ── */}
            <section className={styles.section}>
                <div className={styles.sectionHead}>
                    <div>
                        <h2 className={styles.sectionTitle}>Browse by Category</h2>
                        <p className={styles.sectionSub}>Find exactly what you need through our specialised resource hubs.</p>
                    </div>
                    <a href="#" className={styles.viewAll}>
                        View All Categories
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                <div className={styles.categoryGrid}>
                    {CATEGORIES.map((cat) => (
                        <div
                            key={cat.id}
                            className={styles.categoryCard}
                            onClick={() => {
                                if (cat.id === 'supplier') navigate('/supplier-questionnaire')
                                if (cat.id === 'manufacturer') navigate('/manufacturer-questionnaire')
                                if (cat.id === 'env') navigate('/article-what-is-enviguide')
                                if (cat.id === 'pcf') navigate('/manuals-pcf')
                            }}
                            style={{ cursor: (cat.id === 'supplier' || cat.id === 'manufacturer' || cat.id === 'env' || cat.id === 'pcf') ? 'pointer' : 'default' }}
                        >
                            <div className={styles.catIconWrap}>{cat.icon}</div>
                            <h3 className={styles.catTitle}>{cat.title}</h3>
                            <p className={styles.catDesc}>{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── AI Floating Chat Widget ── */}
            <div
                className={styles.chatWrapper}
                onMouseEnter={() => setIsChatOpen(true)}
                onMouseLeave={() => { setIsChatOpen(false); setShowRoles(false); }}
            >
                {!isChatOpen ? (
                    <div className={styles.chatTrigger} title="Talk to AI ESG Guide">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 8V4H8" />
                            <rect width="16" height="12" x="4" y="8" rx="2" />
                            <path d="M2 14h2" />
                            <path d="M20 14h2" />
                            <path d="M15 13v2" />
                            <path d="M9 13v2" />
                        </svg>
                    </div>
                ) : (
                    <div className={`${styles.floatingAiChat} ${showRoles ? styles.expanded : ''}`}>
                        {!showRoles ? (
                            <div className={styles.welcomeView}>
                                <div className={styles.aiIconCircle}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 8V4H8" />
                                        <rect width="16" height="12" x="4" y="8" rx="2" />
                                        <path d="M2 14h2" />
                                        <path d="M20 14h2" />
                                        <path d="M15 13v2" />
                                        <path d="M9 13v2" />
                                    </svg>
                                </div>
                                <div className={styles.welcomeContent}>
                                    <span className={styles.aiBadgeText}>ECO-ASSISTANT</span>
                                    <h3 className={styles.aiMainText}>How can I help you today?</h3>
                                    <p className={styles.aiSubText}>I'm your AI ESG Guide, ready to assist your sustainability journey.</p>
                                    <button className={styles.aiStartBtn} onClick={(e) => {
                                        e.stopPropagation();
                                        setShowRoles(true);
                                    }}>
                                        Start a conversation
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.roleSelection}>
                                <button className={styles.backToMain} onClick={(e) => {
                                    e.stopPropagation();
                                    setShowRoles(false);
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <span className={styles.selectLabel}>CHOOSE YOUR CONTEXT</span>
                                <h3 className={styles.roleHeader}>How can we help?</h3>
                                <div className={styles.roleGrid}>
                                    <button className={styles.roleOption} onClick={() => navigate('/support')}>
                                        <span className={styles.roleIcon}>🤝</span>
                                        <div className={styles.roleInfo}>
                                            <p className={styles.roleName}>Supplier Consultant</p>
                                            <p className={styles.roleDesc}>Issues with questionnaires</p>
                                        </div>
                                    </button>
                                    <button className={styles.roleOption} onClick={() => navigate('/support')}>
                                        <span className={styles.roleIcon}>🏭</span>
                                        <div className={styles.roleInfo}>
                                            <p className={styles.roleName}>Manufacturer Consultant</p>
                                            <p className={styles.roleDesc}>PCF guidance</p>
                                        </div>
                                    </button>
                                    <button className={styles.roleOption} onClick={() => navigate('/support')}>
                                        <span className={styles.roleIcon}>👤</span>
                                        <div className={styles.roleInfo}>
                                            <p className={styles.roleName}>Own Consultant</p>
                                            <p className={styles.roleDesc}>Platform help</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Popular Articles + Fresh Insights ── */}
            <section className={styles.section}>
                <div className={styles.bottomGrid}>

                    {/* Popular Articles */}
                    <div>
                        <h2 className={styles.colTitle}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Popular Articles
                        </h2>
                        <div className={styles.articleList}>
                            {POPULAR_ARTICLES.map(a => (
                                <div
                                    key={a.title}
                                    className={styles.articleRow}
                                    onClick={() => a.path && navigate(a.path)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div>
                                        <span className={styles.articleTag}>{a.tag}</span>
                                        <p className={styles.articleTitle}>{a.title}</p>
                                    </div>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fresh Insights */}
                    <div>
                        <h2 className={styles.colTitle}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Fresh Insights
                        </h2>

                        {/* Featured Guide */}
                        <div className={styles.featuredCard}>
                            <span className={styles.featuredBadge}>RECOMMENDED MANUALS</span>
                            <h3 className={styles.featuredTitle}>PCF User Manuals</h3>
                            <p className={styles.featuredDesc}>Master the Product Carbon Footprint (PCF) workflows with our detailed, step-by-step guidance manuals.</p>
                            <button className={styles.readNowBtn} onClick={() => navigate('/manuals-pcf')}>Explore Manuals</button>
                        </div>

                        {/* Extra insight row */}
                        <a href="#" className={styles.insightRow}>
                            <div>
                                <span className={styles.articleTag}>Analytics</span>
                                <p className={styles.articleTitle}>Predicting waste reduction trends with AI</p>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                </div>
            </section>

            {/* ── Stats Bar ── */}
            <div className={styles.statsBar}>
                {STATS.map(s => (
                    <div key={s.label} className={styles.statItem}>
                        <span className={styles.statValue}>{s.value}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                    </div>
                ))}
            </div>



        </div>
    )
}
