'use client'

export default function Chatty({name, content, type, iscontinued}) {
  const create = () => {if(type == 'npc'){
    if(iscontinued == true){
      return(
      <div className="npc-chat" style={{marginTop:'5px', marginLeft:'45px'}}>
            <div className="content">{content}</div>
      </div>
      )
    } else if( iscontinued == false){
      return (
        <div className="npc-chat">
          <img className="profile" src="profile.jpg"></img>
            <div className="npc-chat-content">
              <div className="name">{name}</div>
              <div className="content">{content}</div>
            </div>
        </div>
      )
    }
  } else if(type == 'player') {
    if(iscontinued == true) {
      return (
        <div className="player-chat" style={{marginTop:'5px'}}>
            <div className="content">{content}</div>
        </div>
      )
    }else if(iscontinued == false){
      return (
        <div className="player-chat">
            <div className="content">{content}</div>
        </div>
      )
    }
  }
  }
  let result = create();
  return (
    <div>
      {result}
    </div>
  )
}