"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, AudioLines, Camera, Check, ChevronDown, CircleHelp, Globe2, LockKeyhole, MessageCircle, Mic, MicOff, MonitorUp, MoreHorizontal, RotateCcw, Send, ShieldCheck, Shuffle, Sparkles, Video, VideoOff, Wifi, X, Zap } from "lucide-react";

type Mode = "text" | "video";
type View = "home" | "chat";

const suggestions = ["Music", "Movies", "Travel", "Gaming", "Food", "Technology", "Books", "Life"];

export default function Home() {
  const [mode, setMode] = useState<Mode>("video");
  const [view, setView] = useState<View>("home");
  const [nickname, setNickname] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ from: "you" | "stranger"; text: string }[]>([]);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [searching, setSearching] = useState(false);
  const [notice, setNotice] = useState("");

  const guestName = useMemo(() => nickname.trim() || "Guest", [nickname]);

  function addInterest(value: string) {
    const clean = value.trim().replace(/^#/, "");
    if (clean && !interests.some((item) => item.toLowerCase() === clean.toLowerCase()) && interests.length < 5) {
      setInterests((current) => [...current, clean]);
    }
    setInterestInput("");
  }

  function startChat() {
    if (!consent) {
      setNotice("Please confirm that you're 18 or older and agree to the community rules.");
      return;
    }
    if (mode === "video") {
      setNotice("Video matching is not live yet. Start with text chat, or configure the Hush realtime service to enable video.");
      return;
    }
    setView("chat");
    setSearching(true);
    setNotice("");
    window.setTimeout(() => setSearching(false), 1800);
  }

  function sendMessage() {
    const clean = message.trim();
    if (!clean) return;
    setMessages((current) => [...current, { from: "you", text: clean }]);
    setMessage("");
  }

  function nextStranger() {
    setMessages([]);
    setSearching(true);
    window.setTimeout(() => setSearching(false), 1400);
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="noise" />
      <header className="site-header">
        <a className="brand" href="/" aria-label="Hush home"><span className="brand-mark"><span /></span><span>hush<span className="brand-dot">.</span></span></a>
        <nav className="nav-links">
          <a href="#how">How it works</a>
          <button className="nav-help" onClick={() => setShowRules(true)}><CircleHelp size={15}/> Community rules</button>
        </nav>
        <div className="header-right"><span className="online-pill"><i /> Anonymous by design</span><button className="icon-btn mobile-help" aria-label="Community rules" onClick={() => setShowRules(true)}><CircleHelp size={18}/></button></div>
      </header>

      {view === "home" ? (
        <>
          <section className="hero-shell">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> THE INTERNET, A LITTLE MORE HUMAN</div>
              <h1>Strangers today.<br/><em>Stories tomorrow.</em></h1>
              <p className="hero-sub">A face you’ve never seen. A story you didn’t expect. One little hello can go anywhere.</p>
              <div className="trust-row"><span><LockKeyhole size={14}/> No profiles</span><span><Zap size={14}/> One-click next</span><span><ShieldCheck size={14}/> Your call, always</span></div>
            </div>
            <div className="hero-art" aria-label="Abstract illustration of two people connecting">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="spark spark-a">✳</div><div className="spark spark-b">✦</div>
              <div className="bubble bubble-left"><span className="avatar avatar-coral">M</span><span>hey, stranger</span><i /></div>
              <div className="bubble bubble-right"><span className="avatar avatar-lime">?</span><span>hey back 👋</span><i /></div>
              <div className="sun-disc"><div className="sun-inner"><span className="sun-eye left" /><span className="sun-eye right" /><span className="sun-smile" /></div></div>
              <div className="art-caption"><span className="caption-dot" /> SOMEWHERE, SOMEONE'S READY TO TALK</div>
            </div>
          </section>

          <section className="start-section" id="start">
            <div className="section-kicker">YOUR NEXT CONVERSATION</div>
            <div className="start-card">
              <div className="card-heading"><div><h2>Who will you meet?</h2><p>Choose how you want to say hello.</p></div><span className="step-tag">01 <i/> 03</span></div>
              <div className="mode-grid">
                <button className={`mode-option ${mode === "video" ? "selected" : ""}`} onClick={() => {setMode("video");setNotice("");}}>
                  <span className="mode-icon"><Video size={20}/></span><span className="mode-title">Video chat</span><span className="mode-desc">Face to face, wherever you are</span><span className="mode-radio">{mode === "video" && <Check size={12}/>}</span><span className="mode-coming">COMING SOON</span>
                </button>
                <button className={`mode-option ${mode === "text" ? "selected" : ""}`} onClick={() => {setMode("text");setNotice("");}}>
                  <span className="mode-icon"><MessageCircle size={20}/></span><span className="mode-title">Text chat</span><span className="mode-desc">Let the conversation find you</span><span className="mode-radio">{mode === "text" && <Check size={12}/>}</span><span className="mode-live">AVAILABLE IN DEMO</span>
                </button>
              </div>
              <div className="form-row">
                <label className="field-label" htmlFor="nickname">A name to go by <span>OPTIONAL</span></label>
                <input id="nickname" className="text-input" placeholder="Keep it mysterious…" maxLength={24} value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div>
              <div className="form-row">
                <label className="field-label" htmlFor="interests">Add a few interests <span>UP TO 5</span></label>
                <div className="interest-input-wrap"><span className="hash">#</span><input id="interests" className="interest-input" placeholder="What are you into?" value={interestInput} maxLength={24} onChange={(e) => setInterestInput(e.target.value)} onKeyDown={(e) => {if(e.key === "Enter"){e.preventDefault();addInterest(interestInput);}}}/><button className="add-interest" onClick={() => addInterest(interestInput)} disabled={!interestInput.trim() || interests.length >= 5}>Add</button></div>
                <div className="interest-chips">{interests.map((item) => <button key={item} className="interest-chip active" onClick={() => setInterests((all) => all.filter((x) => x !== item))}>#{item}<X size={11}/></button>)}{suggestions.filter((s) => !interests.includes(s)).slice(0, 5 - interests.length).map((item) => <button key={item} className="interest-chip" onClick={() => addInterest(item)}>+ {item}</button>)}</div>
              </div>
              <label className="consent-row"><button className={`checkbox ${consent ? "checked" : ""}`} onClick={() => setConsent(!consent)} aria-label="Confirm age and rules">{consent && <Check size={12}/>}</button><span>I’m 18 or older and agree to the <button className="inline-link" onClick={(e) => {e.preventDefault();setShowRules(true);}}>community rules</button>.</span></label>
              <button className="start-button" onClick={startChat}><span>{mode === "video" ? "Get ready to meet" : "Find someone to talk to"}</span><ArrowRight size={18}/></button>
              {notice && <div className="notice"><CircleHelp size={15}/>{notice}</div>}
              <div className="secure-note"><LockKeyhole size={12}/> Your chat is private. Never share personal information with strangers.</div>
            </div>
            <div className="below-card"><span>NO SIGN-UP. NO SWIPING. NO SMALL PRINT.</span><span className="tiny-spark">✳</span><span>JUST A CONVERSATION.</span></div>
          </section>

          <section className="how-section" id="how">
            <div className="how-intro"><div className="section-kicker">SIMPLE BY DESIGN</div><h2>Good conversations<br/><em>don’t need a plan.</em></h2></div>
            <div className="how-steps">
              <div className="how-step"><span className="step-number">01</span><div className="step-illustration icon-illustration"><Shuffle size={24}/></div><h3>Drop in</h3><p>No account, no profile. Just pick a mode and you’re in.</p></div>
              <div className="how-step"><span className="step-number">02</span><div className="step-illustration icon-illustration"><Sparkles size={24}/></div><h3>Say hello</h3><p>Get paired with someone new. Start with a shared interest or anything at all.</p></div>
              <div className="how-step"><span className="step-number">03</span><div className="step-illustration icon-illustration"><ArrowRight size={24}/></div><h3>Keep exploring</h3><p>Stay for the story or move on. You’re always in control.</p></div>
            </div>
          </section>

          <section className="safety-strip"><div className="safety-icon"><ShieldCheck size={21}/></div><div><h3>A little kindness goes a long way.</h3><p>Hush is for adults. Be respectful, protect your privacy, and leave any conversation that feels wrong.</p></div><button onClick={() => setShowRules(true)}>Read our rules <ArrowRight size={15}/></button></section>
          <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><span /></span><span>hush<span className="brand-dot">.</span></span></a><span>Somewhere between hello and goodbye.</span><span>© 2026 Hush</span></footer>
        </>
      ) : (
        <section className="chat-page">
          <div className="chat-topline"><button className="back-link" onClick={() => setView("home")}><ArrowDown size={15}/> Exit chat</button><div className="chat-brand"><span className="caption-dot"/> YOU’RE IN THE HUSH ROOM</div><span className="encrypted-label"><LockKeyhole size={12}/> PRIVATE SESSION</span></div>
          <div className="chat-layout">
            <div className="chat-main">
              <div className="stranger-panel">
                <div className="stranger-status"><span className="status-dot"/> {searching ? "LOOKING FOR SOMEONE" : "WAITING FOR REALTIME SERVICE"} </div>
                <div className="stranger-empty"><div className="stranger-orbit"><MessageCircle size={30}/><span>✳</span></div><h2>{searching ? "Finding your person…" : "Your next hello is out there."}</h2><p>{searching ? "Hang tight. Good conversations are worth a second." : "The demo chat room is ready. Connect a realtime matching server to meet strangers live."}</p></div>
                <div className="stranger-footer"><span><Wifi size={13}/> {searching ? "SEARCHING" : "STANDING BY"}</span><span>STRANGER #——</span></div>
              </div>
              <div className="self-preview"><div className="self-avatar">{guestName.slice(0,1).toUpperCase()}</div><div><strong>{guestName}</strong><span>YOU’RE HERE</span></div><span className="demo-tag">TEXT DEMO</span></div>
            </div>
            <aside className="message-panel">
              <div className="message-head"><div><h2>Conversation</h2><span><i/> PRIVATE ROOM</span></div><button className="icon-btn" aria-label="More options"><MoreHorizontal size={19}/></button></div>
              <div className="message-list">
                {messages.length === 0 ? <div className="message-empty"><div className="message-empty-icon"><MessageCircle size={19}/></div><h3>It starts with a hello.</h3><p>Send a message when you’re paired with someone. Your conversation will appear here.</p></div> : messages.map((item, index) => <div key={index} className={`message-bubble ${item.from}`}><span>{item.from === "you" ? guestName : "Stranger"}</span><p>{item.text}</p></div>)}
              </div>
              <form className="message-composer" onSubmit={(e) => {e.preventDefault();sendMessage();}}><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write something kind…" aria-label="Message"/><button type="submit" disabled={!message.trim()} aria-label="Send message"><Send size={17}/></button></form>
              <div className="chat-actions"><button onClick={nextStranger}><RotateCcw size={15}/> Next stranger</button><button onClick={() => setView("home")}><X size={15}/> End chat</button></div>
              <p className="chat-safety"><ShieldCheck size={13}/> Don’t share personal details. Report or leave if uncomfortable.</p>
            </aside>
          </div>
        </section>
      )}

      {showRules && <div className="modal-backdrop" role="presentation" onClick={() => setShowRules(false)}><div className="rules-modal" role="dialog" aria-modal="true" aria-labelledby="rules-title" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowRules(false)} aria-label="Close"><X size={19}/></button><div className="modal-symbol"><ShieldCheck size={22}/></div><div className="section-kicker">THE HUSH PROMISE</div><h2 id="rules-title">Keep it human.<br/><em>Keep it kind.</em></h2><p>Hush is an adults-only space for respectful conversations. A little anonymity should never come at someone else’s expense.</p><ul><li>18+ only. Do not misrepresent your age.</li><li>Be respectful. Harassment, hate, threats, and sexual exploitation are not allowed.</li><li>Never share your address, phone number, financial details, or passwords.</li><li>Do not record, screenshot, or redistribute another person’s conversation without consent.</li><li>Leave immediately and report harmful behavior.</li></ul><div className="modal-footer"><span><LockKeyhole size={13}/> Your safety comes first.</span><button onClick={() => setShowRules(false)}>Got it <Check size={15}/></button></div></div></div>}
    </main>
  );
}
