import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../pages/HelpCentre.module.css'
import { getApiBaseUrl } from '../../lib/apiBaseUrl'

/* Clean brand avatar glyph (leaf) — colour comes from the wrapper. */
function EcoMark({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        </svg>
    )
}

/**
 * Floating Eco AI support chat — clean, HubSpot-style UI. Mounted once per
 * layout so it is available on every Knowledge Base page. Self-contained:
 * own state machine, API call, and outside-click handling.
 */
export default function EcoChat() {
    const navigate = useNavigate()
    const chatRef = useRef(null)
    const chatBodyRef = useRef(null)

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chatInput, setChatInput] = useState('')
    // Assistant state machine: 'idle' | 'thinking' | 'searching' | 'typing'
    const [mode, setMode] = useState('idle')
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hi there! 🌱 I'm Eco AI, your assistant for the PCF Supplier Intelligence Suite. Ask me anything, or pick a context below and I'll connect you with the right help." },
    ])

    const busy = mode === 'thinking' || mode === 'searching' || mode === 'typing'

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsChatOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Auto-scroll to the newest message
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        }
    }, [messages, mode])

    const buildReply = (text) => {
        const t = text.toLowerCase()
        if (/\b(hi|hello|hey|hii|yo)\b/.test(t)) {
            return "Hey! 👋 Great to see you. What would you like help with today — PCF reports, supplier questionnaires, or something else?"
        }
        if (t.includes('pcf') || t.includes('carbon') || t.includes('footprint') || t.includes('emission')) {
            return "For Product Carbon Footprints, the PCF Manuals walk you through every step. Want me to open the PCF guidance, or connect you with a Manufacturer Consultant?"
        }
        if (t.includes('questionnaire') || t.includes('supplier')) {
            return "Supplier questionnaire trouble? A Supplier Consultant can help directly. Tap “Supplier Consultant” below and I'll route you there."
        }
        if (t.includes('api') || t.includes('key') || t.includes('token')) {
            return "You'll find API key setup under the API documentation. Need a hand generating one?"
        }
        if (t.includes('contact') || t.includes('human') || t.includes('agent') || t.includes('support') || t.includes('email')) {
            return "Of course — our team replies within 24 hours. I can take you to the Support form, or you can email info@enviguide.com."
        }
        if (t.includes('thank')) {
            return "You're very welcome! 🌿 Happy to help anytime."
        }
        return "Got it! While I'm still learning, I can point you to the right place. Pick a context below, or I can take you to our Support team for a detailed answer."
    }

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    const sendChat = async (e) => {
        e.preventDefault()
        const text = chatInput.trim()
        if (!text || busy) return
        const history = [...messages, { role: 'user', text }]
        setMessages(history)
        setChatInput('')

        const replyPromise = (async () => {
            try {
                const res = await fetch(`${getApiBaseUrl()}/api/ai-chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: history.slice(-12) }),
                })
                const json = await res.json()
                const reply = json?.data?.reply
                return reply && reply.trim() ? reply : buildReply(text)
            } catch {
                return buildReply(text)
            }
        })()

        const needsSearch = /\b(find|search|where|link|manual|guide|doc|docs|list|how (do|to)|show|article)\b/.test(text.toLowerCase())
        setMode('thinking')
        await sleep(650)
        if (needsSearch) {
            setMode('searching')
            await sleep(850)
        }
        setMode('typing')

        const [reply] = await Promise.all([replyPromise, sleep(550)])
        setMessages((prev) => [...prev, { role: 'ai', text: reply }])
        setMode('idle')
    }

    return (
        <div ref={chatRef} className={styles.chatWrapper}>
            {isChatOpen && (
                <div className={styles.chatPanel} role="dialog" aria-label="Eco AI assistant">
                    {/* Header */}
                    <div className={styles.chatHeader}>
                        <div className={styles.chatAvatar}>
                            <EcoMark className={styles.avatarGlyph} />
                            <span className={styles.statusDot} aria-hidden="true" />
                        </div>
                        <div className={styles.chatHeaderText}>
                            <p className={styles.chatTitle}>Eco AI</p>
                            <p className={styles.chatStatus}>
                                <span className={styles.statusPing} aria-hidden="true" />
                                <span className={styles.statusText}>
                                    {mode === 'thinking' ? 'Thinking…'
                                        : mode === 'searching' ? 'Searching resources…'
                                        : mode === 'typing' ? 'Typing…'
                                        : 'Online · typically replies instantly'}
                                </span>
                            </p>
                        </div>
                        <button
                            type="button"
                            className={styles.chatClose}
                            aria-label="Close chat"
                            onClick={() => setIsChatOpen(false)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Conversation */}
                    <div className={styles.chatBody} ref={chatBodyRef}>
                        {messages.map((m, i) => (
                            m.role === 'ai' ? (
                                <div key={i} className={styles.msgRow}>
                                    <div className={styles.msgAvatar}>
                                        <EcoMark className={styles.msgGlyph} />
                                    </div>
                                    <div className={styles.msgBubble}>{m.text}</div>
                                </div>
                            ) : (
                                <div key={i} className={`${styles.msgRow} ${styles.msgRowUser}`}>
                                    <div className={styles.msgBubbleUser}>{m.text}</div>
                                </div>
                            )
                        ))}

                        {busy && (
                            <div className={styles.msgRow}>
                                <div className={styles.msgAvatar}>
                                    <EcoMark className={styles.msgGlyph} />
                                </div>
                                <div className={`${styles.msgBubble} ${styles.statusBubble}`}>
                                    {mode === 'thinking' && (
                                        <span className={styles.stateRow}>
                                            <span className={styles.thinkBrain}>💭</span>
                                            <span className={styles.stateLabel}>Thinking</span>
                                            <span className={styles.thinkDots}><i /><i /><i /></span>
                                        </span>
                                    )}
                                    {mode === 'searching' && (
                                        <span className={styles.stateRow}>
                                            <span className={styles.searchGlass}>
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <circle cx="11" cy="11" r="7" />
                                                    <path d="M21 21l-4.3-4.3" />
                                                </svg>
                                            </span>
                                            <span className={styles.stateLabel}>Searching resources</span>
                                        </span>
                                    )}
                                    {mode === 'typing' && (
                                        <span className={styles.typingBubbleInner}>
                                            <span className={styles.typingDot} />
                                            <span className={styles.typingDot} />
                                            <span className={styles.typingDot} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {messages.length <= 1 && !busy && (<>
                        <p className={styles.quickLabel}>Choose your context</p>
                        <div className={styles.roleGrid}>
                            <button className={styles.roleOption} onClick={() => navigate('/support')}>
                                <span className={styles.roleIcon}>🤝</span>
                                <div className={styles.roleInfo}>
                                    <p className={styles.roleName}>Supplier Consultant</p>
                                    <p className={styles.roleDesc}>Issues with questionnaires</p>
                                </div>
                                <svg className={styles.roleArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                            <button className={styles.roleOption} onClick={() => navigate('/support')}>
                                <span className={styles.roleIcon}>🏭</span>
                                <div className={styles.roleInfo}>
                                    <p className={styles.roleName}>Manufacturer Consultant</p>
                                    <p className={styles.roleDesc}>PCF guidance</p>
                                </div>
                                <svg className={styles.roleArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                            <button className={styles.roleOption} onClick={() => navigate('/support')}>
                                <span className={styles.roleIcon}>👤</span>
                                <div className={styles.roleInfo}>
                                    <p className={styles.roleName}>Own Consultant</p>
                                    <p className={styles.roleDesc}>Platform help</p>
                                </div>
                                <svg className={styles.roleArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </div>
                        </>)}
                    </div>

                    {/* Input bar */}
                    <form className={styles.chatInputBar} onSubmit={sendChat}>
                        <input
                            type="text"
                            className={styles.chatInput}
                            placeholder="Enter your message…"
                            aria-label="Message Eco AI"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                        />
                        <button type="submit" className={styles.chatSend} aria-label="Send message" disabled={!chatInput.trim() || busy}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="m22 2-7 20-4-9-9-4Z" />
                                <path d="M22 2 11 13" />
                            </svg>
                        </button>
                    </form>
                    <div className={styles.poweredBy}>Powered by <strong>Enviraan</strong></div>
                </div>
            )}

            <div className={styles.launcherRow}>
                {!isChatOpen && (
                    <div className={styles.greetingBubble}>
                        <span className={styles.greetingWave}>👋</span>
                        <span>Hi! How can I help you?</span>
                    </div>
                )}

                <button
                    type="button"
                    className={styles.chatTrigger}
                    title="Chat with Eco AI"
                    aria-label={isChatOpen ? 'Close Eco AI' : 'Chat with Eco AI'}
                    aria-expanded={isChatOpen}
                    onClick={() => setIsChatOpen((o) => !o)}
                >
                    {isChatOpen ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    ) : (
                        <svg className={styles.launcherIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.18.89 4.17 2.36 5.7L3.4 21l3.86-1.2c1.42.6 3.01.94 4.74.94 5.52 0 10-3.94 10-8.8S17.52 3 12 3Z" />
                        </svg>
                    )}
                    {!isChatOpen && <span className={styles.launcherStatus} aria-hidden="true" />}
                </button>
            </div>
        </div>
    )
}
