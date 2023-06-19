'use client'


import { useRef, useState } from "react"
import Chatty from "./chat";

import html2canvas from "html2canvas"; //캡처하게 해주는 라이브러리
import { saveAs } from "file-saver"; //파일 저장을 도와주는 라이브러리

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

export default function Chat() {
  const PaperPlane = <FontAwesomeIcon icon={faPaperPlane} />;

  let settingPlayerName = useRef({popup: null, name: null});
  let settingNpcName = useRef({popup: null, name: null});

  const [playerName, setPlayerName] = useState('');
  const [npcName, setNpcName] = useState('');
  const [isPlayerContinued, setPlayerIsContinued] = useState(false);
  const [isNpcContinued, setNpcIsContinued] = useState(false);

  let playercontent = useRef();
  let npccontent = useRef();
  let chatbox = useRef();

  const [chats, setChats] = useState([
  ]);

  const next1 = () => {
    if(settingPlayerName.current.name.value){
    settingNpcName.current.popup.style.display = 'flex';
    settingPlayerName.current.popup.style.display = 'none';
    settingNpcName.current.name.focus()
    setPlayerName(settingPlayerName.current.name.value);
    }
  }

  const next2 = () => {
    if(settingNpcName.current.name.value){
    settingNpcName.current.popup.style.display = 'none';
    setNpcName(settingNpcName.current.name.value);
    }
  }

  const create1 = (e) => {
    if(npccontent.current.value) {
    let NewChats = [...chats]
    let Newitem = {type:'npc', name: npcName , content: npccontent.current.value, iscontinued: isNpcContinued }
    NewChats = [...NewChats, Newitem]
    setChats(NewChats);
    npccontent.current.value = '';
    setTimeout(()=>{ chatbox.current.scrollTop = chatbox.current.scrollHeight;}, 50)
    console.log(Newitem);
    }

    if(isNpcContinued == false) {
      setNpcIsContinued(true)
      setPlayerIsContinued(false)
      setTimeout(()=>{
        setNpcIsContinued(false)
      }, 60000)
    }
    return false
  }

  const create2 = () => {
    if(playercontent.current.value){
    let NewChats = [...chats]
    let Newitem = {type:'player', name: playerName , content: playercontent.current.value, iscontinued: isPlayerContinued }
    NewChats = [...NewChats, Newitem]
    setChats(NewChats);
    playercontent.current.value = '';
    setTimeout(()=>{ chatbox.current.scrollTop = chatbox.current.scrollHeight;}, 50)
  }
  console.log(isNpcContinued);
  if(isPlayerContinued == false) {
    setPlayerIsContinued(true)
    setNpcIsContinued(false)
    console.log(isNpcContinued);
    setTimeout(()=>{
      setPlayerIsContinued(false)
    }, 60000)
  }
  }

  const submitEnter1 = (e) =>{
    if(e.key === 'Enter'){
      create1()
      if(e.preventDefault) {e.preventDefault(); // This should fix it
        return false;}
  }
}

const submitEnter2 = (e) =>{
  if(e.key === 'Enter'){
    create2()
    if(e.preventDefault) {e.preventDefault(); // This should fix it
      return false;}
}
}

const handleDownload = async () => {
  window.scrollTo(0,0);  
  if (!chatbox.current) return;
  try {
    const div = chatbox.current;
    const canvas = await html2canvas(div, { scale: 2});
    canvas.toBlob((blob) => {
      if (blob !== null) {
        saveAs(blob, "result.png");
      }
    });
  } catch (error) {
    console.error("Error converting div to image:", error);
  }
};


  return (
    <div className="chat-background">
      <div className="setting" ref={(el)=>settingPlayerName.current.popup=el}>
        <div className="setting-popup">
          <label>당신의 이름은?</label>
          <input placeholder="최대 5글자" maxLength={5} ref={(el)=>settingPlayerName.current.name=el} 
          onKeyDown={(e)=>{if(e.key === 'Enter'){next1()}}}/>
          <button onClick={next1}> 다음 </button>
        </div>
      </div>
      <div className="setting" ref={(el)=>settingNpcName.current.popup=el} style={{display:'none'}}>
        <div className="setting-popup">
          <label>상대방 이름은?</label>
          <input placeholder="최대 5글자" maxLength={5} ref={(el)=>settingNpcName.current.name=el}
          onKeyDown={(e)=>{if(e.key === 'Enter'){next2()}}}/>
          <button onClick={next2}> 다음 </button>
        </div>
      </div>
        <div className="create">
          <div> {npcName} </div>
          <textarea ref={npccontent} onKeyDown={submitEnter1}></textarea>
          <button onClick={create1}>{PaperPlane}</button>
        </div>
        <div className="create">
        <div> {playerName}(나) </div>
          <textarea ref={playercontent} onKeyDown={submitEnter2}></textarea>
          <button onClick={create2}>{PaperPlane}</button>
        </div>
      <div className="chat-box" ref={chatbox}>
        {chats.map((chats, index)=>{
          return <Chatty type={chats.type} name={chats.name} content={chats.content} iscontinued={chats.iscontinued} key={chats.name + index}/>
        })}
      </div>
      <button onClick={handleDownload}>저장하기</button>
    </div>
  )
}
