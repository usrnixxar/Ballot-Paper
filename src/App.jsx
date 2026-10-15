import { useEffect, useMemo, useRef, useState } from 'react';
import { BarChart3, Check, CheckCircle2, CircleHelp, Crown, Home, Info, RotateCcw, ShieldCheck, Volume2, VolumeX, Vote, X } from 'lucide-react';
import { election, initialCandidates } from './data';

function Symbol({ type, className = '' }) {
  if (type === 'star') return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path fill="currentColor" d="M50 4 62 35 96 37 70 58 79 92 50 73 21 92 30 58 4 37 38 35Z"/></svg>;
  if (type === 'book') return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path fill="currentColor" d="M7 19c19-7 31-4 43 5 12-9 24-12 43-5v61c-19-6-32-3-43 5-11-8-24-11-43-5V19Zm6 7v47c14-3 24-1 33 4V30c-10-6-20-8-33-4Zm74 0c-13-4-23-2-33 4v47c9-5 19-7 33-4V26Z"/></svg>;
  if (type === 'tree') return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path fill="currentColor" d="M44 58h12v27H44zM28 91h44v6H28zM26 67C7 64 4 42 20 34c-3-18 15-28 27-19C58-3 82 7 80 25c19 9 20 33 3 41-11 6-22 3-31-3-9 8-18 9-26 4Z"/></svg>;
  if (type === 'lamp') return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path d="M39 10h22M44 10V5h12v5M50 14v12M31 26h38l8 53H23l8-53ZM35 32l-6 41h42l-6-41H35ZM25 84h50M20 92h60M41 45h18M50 46l-7 19h14l-7-19Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="none"/><circle cx="50" cy="50" r="7" fill="currentColor"/>{Array.from({length:12},(_,i)=><line key={i} x1="50" y1="12" x2="50" y2="43" stroke="currentColor" strokeWidth="3.5" transform={'rotate('+(i*30)+' 50 50)'}/>)}</svg>;
}
function SwastikPrint() { return <svg className="swastik-print" viewBox="0 0 180 180" aria-label="Traditional Indian Swastik ink impression" role="img"><g fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="square" strokeLinejoin="miter"><path d="M86 31V147M31 88H148M86 31H133V57M148 88V132H120M86 147H40V121M31 88V42H58"/></g><g fill="currentColor"><circle cx="52" cy="52" r="5"/><circle cx="129" cy="52" r="5"/><circle cx="52" cy="128" r="5"/><circle cx="127" cy="128" r="5"/></g></svg>; }
function BallotIllustration(){return <div className="ballot-illustration" aria-hidden="true"><div className="ballot-slip"><Check size={44} strokeWidth={4}/></div><div className="box-lid"/><div className="ballot-box"><span>YOUR VOTE<br/>COUNTS</span></div></div>}
const fmt = new Intl.NumberFormat('en-IN');
export default function App(){
  const [candidates,setCandidates]=useState(initialCandidates);
  const [selected,setSelected]=useState(null);
  const [phase,setPhase]=useState('ready');
  const [confirm,setConfirm]=useState(false);
  const [muted,setMuted]=useState(true);
  const [tab,setTab]=useState('home');
  const timer=useRef(null);
  const resultTimer=useRef(null);
  const stampRef=useRef(null);
  const [flight,setFlight]=useState(null);
  useEffect(()=>()=>{window.clearTimeout(timer.current);window.clearTimeout(resultTimer.current)},[]);
  const total=useMemo(()=>candidates.reduce((sum,c)=>sum+c.votes,0),[candidates]);
  const leader=useMemo(()=>[...candidates].sort((a,b)=>b.votes-a.votes)[0]?.id,[candidates]);
  const ranking=useMemo(()=>[...candidates].sort((a,b)=>b.votes-a.votes),[candidates]);
  const current=candidates.find(c=>c.id===selected);
  function playStamp(){if(muted)return;try{const audioContext=new (window.AudioContext||window.webkitAudioContext)();const osc=audioContext.createOscillator();const gain=audioContext.createGain();osc.type='triangle';osc.frequency.setValueAtTime(125,audioContext.currentTime);osc.frequency.exponentialRampToValueAtTime(48,audioContext.currentTime+.17);gain.gain.setValueAtTime(.14,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.2);osc.connect(gain);gain.connect(audioContext.destination);osc.start();osc.stop(audioContext.currentTime+.21);osc.onended=()=>audioContext.close();}catch{/* audio not available */}}
  function pickStamp(){if(phase==='ready')setPhase('armed');else if(phase==='armed')setPhase('ready');}
  function stampPaper(id,event){
    if(phase!=='armed')return;
    const origin=stampRef.current?.getBoundingClientRect();
    const target=event.currentTarget.getBoundingClientRect();
    if(!origin)return;
    setSelected(id);
    setFlight({left:origin.left,top:origin.top,width:origin.width,height:origin.height,dx:target.left+target.width/2-origin.left-origin.width/2,dy:target.top+target.height/2-origin.top-origin.height/2});
    setPhase('stamping');
    timer.current=window.setTimeout(()=>{setPhase('marked');playStamp();},900);
    resultTimer.current=window.setTimeout(()=>{setCandidates(prev=>prev.map(c=>c.id===id?{...c,votes:c.votes+1}:c));setPhase('voted');setFlight(null);},1650);
  }
  function reset(){window.clearTimeout(timer.current);window.clearTimeout(resultTimer.current);setCandidates(initialCandidates);setSelected(null);setPhase('ready');setFlight(null);setConfirm(false);}
  function navigate(key){setTab(key);document.getElementById(key==='vote'?'ballot-section':key==='results'?'result-section':'page-top')?.scrollIntoView({behavior:'smooth',block:'start'});}
  return <div className="page" id="page-top">
    <header className="topbar">
      <button className="brand" onClick={()=>navigate('home')}><span className="brand-icon">🗳️</span><span><strong>{election.title}</strong><small>{election.subtitle}</small></span></button>
      <nav aria-label="Main navigation"><button className={tab==='home'?'active':''} onClick={()=>navigate('home')}><Home/> Home</button><button className={tab==='results'?'active':''} onClick={()=>navigate('results')}><BarChart3/> Results</button><button className={tab==='vote'?'active':''} onClick={()=>navigate('vote')}><Vote/> Vote</button><button onClick={()=>setTab('help')} className={tab==='help'?'active':''}><CircleHelp/> Help</button></nav>
    </header>
    <main>
      <section className="results-panel" id="result-section" aria-label="Demo election results">
        <div className="results-hero"><div className="hero-art"><div className="sparkles">✦ &nbsp; ✧ &nbsp; ✦</div><h1>Election <span>Result</span></h1><p>Total Votes Cast</p><div className="total-count" aria-live="polite">{fmt.format(total)}</div><BallotIllustration/><div className="motto"><BarChart3/><div><b>Peaceful. Fair. Digital.</b><small>People Decide a Brighter Tomorrow.</small></div></div></div></div>
        <div className="leaderboard">{ranking.map((c,i)=><div className={'result-row '+(c.id===leader?'is-leading':'')} key={c.id} style={{'--candidate-color':c.color,'--delay':(i*80)+'ms'}}><span className="rank">{i+1}</span><span className="result-symbol"><Symbol type={c.symbol}/></span><span className="candidate-result-name">{c.name}</span><span className="votes"><strong>{fmt.format(c.votes)}</strong> votes</span><span className="percentage">{(c.votes/total*100).toFixed(1)}%</span><div className="bar-track"><div className="bar-fill" style={{width:(c.votes/total*100)+'%'}}/></div>{c.id===leader&&<span className="leading"><Crown/> <span>Leading</span></span>}</div>)}</div>
      </section>
      <section className="ballot-panel" id="ballot-section" aria-label="Digital ballot paper">
        <div className="ballot-heading"><div><h2><span className="heading-emoji">🗳️</span> Digital Ballot Paper</h2><p>Pick up the stamp first, then click a ballot paper to stamp your vote.</p></div><div className="security"><Info size={18}/> Simulation only — no real vote stored</div></div>
        <div className="paper-grid">{candidates.map((c)=><button type="button" key={c.id} style={{'--candidate-color':c.color}} className={'paper '+(selected===c.id?'selected ':'')+(selected===c.id&&(phase==='marked'||phase==='voted')?'printed ':'')+(phase==='armed'?'targetable ':'')+((phase==='stamping'||phase==='marked'||phase==='voted')&&selected!==c.id?'dimmed':'')} onClick={e=>stampPaper(c.id,e)} disabled={phase!=='armed'} aria-label={phase==='armed'?'Stamp '+c.name:c.name}><span className="paper-name">{c.name}</span><Symbol type={c.symbol} className="paper-symbol"/><span className="ballot-circle"/>{selected===c.id&&(phase==='marked'||phase==='voted')&&<div className="ink-overlay"><SwastikPrint/></div>}</button>)}</div>
        <div className="stamp-zone"><button ref={stampRef} className={'stamp '+(phase==='armed'?'picked ':'')+(flight?'stamp-source-hidden':'')} onClick={pickStamp} disabled={!['ready','armed'].includes(phase)} aria-pressed={phase==='armed'} aria-label={phase==='armed'?'Put stamp down':'Pick up stamp'}><span className="stamp-handle"/><span className="stamp-neck"/><span className="stamp-base">STAMP</span></button><p>{phase==='ready'?'Step 1: Click the stamp to pick it up':phase==='armed'?'Step 2: Stamp picked up! Click the ballot paper you want to vote for':phase==='stamping'?'Stamp moving to your ballot…':phase==='marked'?'Swastik printed! Stamp returning…':'Your demo vote has been cast successfully!'}</p>{phase==='voted'&&<div className="success"><CheckCircle2 size={19}/> Demo vote recorded in this page only</div>}<div className="utility"><button onClick={reset}><RotateCcw size={15}/> Reset Demo</button><button onClick={()=>setMuted(m=>!m)}>{muted?<VolumeX size={15}/>:<Volume2 size={15}/>} {muted?'Unmute':'Mute'}</button></div></div>
        {flight&&<div className="flying-stamp" aria-hidden="true" style={{left:flight.left,top:flight.top,width:flight.width,height:flight.height,'--flight-x':flight.dx+'px','--flight-y':flight.dy+'px'}}><div className="stamp-handle"/><div className="stamp-neck"/><div className="stamp-base">STAMP</div></div>}
      </section>
      <footer><ShieldCheck size={16}/> Educational frontend demo. Counts are fictional; no server, voter authentication or election security is implemented.</footer>
    </main>
    {tab==='help'&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setTab('home')}}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="help-title"><button className="close" onClick={()=>setTab('home')} aria-label="Close"><X/></button><h3 id="help-title">How to use the demo</h3><p>First click the red STAMP to pick it up. Next, click one of the five ballot papers. The stamp flies onto it, prints a red Swastik and returns, while the demo result bars update.</p><p className="modal-note">Use Reset Demo to start again. This is not a real election.</p><button className="modal-done" onClick={()=>setTab('home')}>Got it</button></div></div>}
  </div>;
}
