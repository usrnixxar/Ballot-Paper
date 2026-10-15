// Playback of user-supplied MP3 assets. Place files in public/audio/.
// Browsers generally allow playback only after a user gesture.
export function createAnthemPiano(){
  const background = new Audio('/audio/background.mp3');
  const stamp = new Audio('/audio/stamp.mp3');
  background.loop = true;
  background.preload = 'auto';
  background.volume = 0.35;
  stamp.preload = 'auto';
  stamp.volume = 0.9;
  let playing = false;
  async function start(){
    if(playing && !background.paused)return;
    await background.play();
    playing = true;
  }
  function stop(){background.pause();playing=false;}
  function playStamp(){
    stamp.pause();
    stamp.currentTime=0;
    return stamp.play();
  }
  function dispose(){stop();background.src='';stamp.pause();stamp.src='';}
  return {start,stop,playStamp,dispose};
}
