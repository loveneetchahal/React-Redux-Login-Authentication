import React, { useEffect, MutableRefObject, useRef, useState } from "react";
const style = {
    container: {
      width: "80%",
      margin: "0 auto",
    },
    input: {
      width: "100%",
    },
    span:{
        color: "red",
    }
  };
const ChatClient=()=>{
    const [clientOffer, setUserRegisteration]=useState({
        offerstring: "", 
        chatmessages: "" 
    });
    var localConnection: MutableRefObject<RTCPeerConnection> = useRef(
        new RTCPeerConnection()
    );  
    var remoteConnection: MutableRefObject<RTCPeerConnection> = useRef(
        new RTCPeerConnection()
    );   
    var localChannel: MutableRefObject<RTCDataChannel> = useRef( new RTCPeerConnection().createDataChannel("channel")); 
    
    const [connected, setconnected] = useState<boolean>(false);
    var [offerstring, setofferstring] = useState<string>("");
    var [remoteMessages, setremoteMessages] = useState<string>("");
    var remoteChan: MutableRefObject<any> = useRef();
    const clickHandler = () => {
        return (event: React.MouseEvent) => {
            connect();
          event.preventDefault();
        }
      }

    const connect=()=>{
        const secretOffer= clientOffer.offerstring;
        console.log(secretOffer);
        localConnection.current=new RTCPeerConnection();
        localConnection.current.onicecandidate = e =>console.log("New Ice Candidate!SDP"+
        JSON.stringify(localConnection.current.localDescription));
        var message = JSON.parse(secretOffer);
        localConnection.current.setRemoteDescription(new RTCSessionDescription(message)).then(a=>console.log("offer set "));        
        
        localConnection.current.createAnswer().then(a=> localConnection.current.setLocalDescription(a)).then(a=> console.log("answer created"));
    
        localConnection.current.ondatachannel = function(ev) {
            console.log('Data channel is created!');
            ev.channel.onopen = function() {
              console.log('Data channel is open and ready to be used.');
            };
            ev.channel.onmessage = e=>console.log("new message from client " + e.data);
          };
          const dataChannelParams = {ordered: true};
          localChannel.current=localConnection.current.createDataChannel('messaging-channel', dataChannelParams);
          localChannel.current.binaryType = 'arraybuffer';        
          localChannel.current.addEventListener('open', () => {
              console.log('Local channel open!');
              setconnected(true);
          });
          localChannel.current.onopen = function(event) {
            var readyState = localChannel.current.readyState;
          };
          localChannel.current.addEventListener('close', () => {
            console.log('Local channel closed!');
            setconnected(false);
        });
         
        }   
    const handleInputs = (e: { target: { name: any;value:any; }; }) =>{
        const name= e.target.name;   
        const value= e.target.value;  //console.log(name);
        setUserRegisteration({...clientOffer,[name] : value})
    }
    const clickforsend = () => {
        return (event: React.MouseEvent) => {
            sendmessage();
          event.preventDefault();
        }
      }
      const sendmessage=()=>{          
        var msg=clientOffer.chatmessages;
        let obj = {
            "message": msg,
            "timestamp": new Date()
          }
          localChannel.current.send(JSON.stringify(msg));      
    }
    return(
        <div className="holder">
        <div className="page-container">
            <div style={style.container}>
                <label>Enter client Offer:</label>
               <textarea onChange={handleInputs} name="offerstring" value={clientOffer.offerstring} >
               </textarea>
               <button onClick={clickHandler()}>Connect</button>

               <textarea onChange={handleInputs} name="chatmessages" value={clientOffer.chatmessages} >
               </textarea>
               <button onClick={clickforsend()}>send message</button>           
            </div>
        </div>
    </div>
    );
}
export default ChatClient;