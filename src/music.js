// Gentle synthesized piano-like rendition of the opening notes of Jana Gana Mana.
// Audio begins only after a user gesture because browsers block autoplay.
// The phrase is intentionally instrumental; no recordings or external audio assets.
// This module is a lightweight frontend demo, not an official anthem recording.
const NOTES={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B3:246.94};
const melody=[
 ['C4',1],['D4',1],['E4',1],['E4',1],['E4',1],['E4',1],
 ['E4',1],['E4',1],['E4',1.7],['E4',.7],['E4',1],['D4',.7],['E4',.7],['F4',2],
 ['E4',1.5],['E4',.7],['E4',.7],['D4',1.4],['D4',.7],['D4',.7],['B3',.7],['D4',.7],['C4',2.5]
];
export function createAnthemPiano(){
 let context,master,timeout,playing=false,generation=0;
 function tone(note,start,duration){
  const hz=NOTES[note];if(!hz)return;
  // harmonic partials and short damping approximate a warm acoustic piano
  [1,2,3].forEach((multiple,i)=>{
   const osc=context.createOscillator(),gain=context.createGain();
   osc.type='sine';osc.frequency.setValueAtTime(hz*multiple,start);
   const amp=[.32,.07,.025][i];
   gain.gain.setValueAtTime(.0001,start);
   gain.gain.exponentialRampToValueAtTime(amp,start+.012);
   gain.gain.exponentialRampToValueAtTime(.0001,start+Math.max(.18,duration*.92));
   osc.connect(gain);gain.connect(master);osc.start(start);osc.stop(start+Math.max(.2,duration));
  });
 }
 function schedule(token){
  if(!playing||generation!==token)return;
  const beat=.34,now=context.currentTime+.07;
  let cursor=now;
  for(const [note,beats] of melody){tone(note,cursor,beats*beat*.88);cursor+=beats*beat;}
  // Brief silence between repeats, never an abrupt audio cut.
  timeout=window.setTimeout(()=>schedule(token),Math.round((cursor-now+2.6)*1000));
 }
 async function start(){
  if(playing)return;
  if(!context){context=new (window.AudioContext||window.webkitAudioContext)();master=context.createGain();master.gain.value=.09;master.connect(context.destination);}
  await context.resume();playing=true;generation++;schedule(generation);
 }
 function stop(){playing=false;generation++;window.clearTimeout(timeout);if(master&&context){master.gain.cancelScheduledValues(context.currentTime);master.gain.setTargetAtTime(.0001,context.currentTime,.08);}}
 function dispose(){stop();if(context)context.close().catch(()=>{});}
 return {start,stop,dispose};
}
