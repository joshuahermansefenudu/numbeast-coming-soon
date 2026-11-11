// The same working game supplies the presentation; actions use its real controls.
let runId=0,playing=false,sound=false;
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function fitEmbed(){document.querySelector('.workspace').style.transform=`scale(${Math.min(innerWidth/393,innerHeight/852)})`;}
addEventListener('resize',fitEmbed);fitEmbed();
function announce(label,step){parent.postMessage({type:'numbeast-scene',label,step,progress:state.progress,stage:state.stage},location.origin);}
async function guide(id){if(id!==runId)throw Error('cancelled');if(sound)await speak(prompt());else await pause(1200);if(id!==runId)throw Error('cancelled');}
async function click(selector,id){if(id!==runId)throw Error('cancelled');const el=phone.querySelector(selector);if(!el)throw Error('Missing journey control: '+selector);const p=phone.querySelector('.tap-pointer'),a=el.getBoundingClientRect(),b=phone.getBoundingClientRect(),scale=b.width/393;p.style.left=(a.left-b.left+a.width/2)/scale-12+'px';p.style.top=(a.top-b.top+a.height/2)/scale-12+'px';p.style.opacity='1';await pause(450);if(id!==runId)throw Error('cancelled');p.classList.add('down');await pause(120);el.click();await pause(450);}
function stop(){runId++;playing=false;state.director=false;stopSpeech();}
async function start(withSound=false){
  stop();const id=++runId;playing=true;sound=withSound;state.director=true;state.muted=!sound;
  Object.assign(state,{screen:'welcome',progress:0,xp:0,food:1,stage:1,family:0,nickname:'Alex',pendingEvolution:false,worldGoal:0});go('welcome',{read:false});
  try{
    announce('A new adventure',0);await guide(id);await click('[data-action="start"]',id);
    announce('Choose a name',0);const input=phone.querySelector('#nickname');input.value='';for(const c of 'Alex'){if(id!==runId)throw Error('cancelled');input.value+=c;await pause(140);}await click('[data-action="save-name"]',id);
    announce('Choose an elemental egg',1);await guide(id);await click('[data-family="1"]',id);await pause(650);await click('[data-family="0"]',id);await click('[data-action="hatch"]',id);await pause(800);await guide(id);await click('[data-action="camp"]',id);
    announce('Meet your companion',2);await guide(id);await click('[data-go="map"]',id);await guide(id);
    for(let quest=0;quest<3;quest++){
      announce(['Pack the supplies','Explore the crystal pools','Open the tide gate'][quest],3);await click('.quest-node.current',id);await guide(id);
      if(quest===0){await click('[data-action="help"]',id);await guide(id);await click('[data-action="try-again"]',id);}
      await click('[data-answer="'+lessons[state.lesson].correct+'"]',id);await pause(1100);
      announce('A reward you can see',4);await guide(id);await click('[data-action="claim"]',id);await pause(1000);
      if(state.screen==='evolve'){announce('Your beast grows',5);await guide(id);await click('[data-action="finish-evolve"]',id);await pause(900);}
      announce('The next map stop unlocks',6);await guide(id);
    }
    await pause(1800);await click('[data-go="camp"]',id);announce('A bigger beast. A new adventure.',6);await pause(3500);
    if(id===runId){playing=false;state.director=false;stopSpeech();parent.postMessage({type:'numbeast-finished',progress:state.progress,stage:state.stage},location.origin);if(!sound){await pause(2000);if(id===runId)start(false);}}
  }catch(e){if(id===runId){playing=false;state.director=false;stopSpeech();parent.postMessage({type:'numbeast-error',message:e.message},location.origin);}}
}
window.numbeastJourney={start,stop,get playing(){return playing;}};
addEventListener('message',event=>{if(event.origin!==location.origin)return;if(event.data?.type==='numbeast-start')start(Boolean(event.data.sound));if(event.data?.type==='numbeast-stop')stop();});
parent.postMessage({type:'numbeast-ready'},location.origin);
