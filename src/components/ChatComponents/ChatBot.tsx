import React, { useEffect, MutableRefObject, useRef, useState } from "react";

interface MyWindow extends Window {
    remoteChannel: any;
    localChannel: any;
    remoteConnection: RTCPeerConnection;
    localConnection: RTCPeerConnection;
    myFunction(): void;
}
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
declare var window: MyWindow;
const ChatBot =() =>{
    var localConnection: MutableRefObject<RTCPeerConnection> = useRef(
        new RTCPeerConnection()
    );  
    var remoteConnection: MutableRefObject<RTCPeerConnection> = useRef(
        new RTCPeerConnection()
    );   
    var localChannel: MutableRefObject<RTCDataChannel> = useRef( new RTCPeerConnection().createDataChannel("channel")); 
    
    const [connected, setconnected] = useState<boolean>(false);
    var [localMessages, setlocalMessages] = useState<string>("");
    var [remoteMessages, setremoteMessages] = useState<string>("");
    var remoteChan: MutableRefObject<any> = useRef();
    const [clientOffer, setUserRegisteration]=useState({
        offerstring: "",
        chatmessages: "" 
    });
  /*const disconnect=()=> {
    localConnection.close();
    remoteConnection.close();
  }*/
  const clickHandler = () => {
    return (event: React.MouseEvent) => {
        connect();
      event.preventDefault();
    }
  }
  const clickForEstablish = () => {
    return (event: React.MouseEvent) => {
        Establishconnection();
      event.preventDefault();
    }
  }
  const clickforsend = () => {
    return (event: React.MouseEvent) => {
        sendmessage();
      event.preventDefault();
    }
  }
  const Establishconnection= async () =>{            
        const answer=clientOffer.offerstring;
        var message = JSON.parse(answer);
       
        localConnection.current.onicecandidate = e =>console.log("New Ice Candidate!SDP"+
        JSON.stringify(localConnection.current.localDescription));
        var message = JSON.parse(answer);
        localConnection.current.setRemoteDescription(new RTCSessionDescription(message)).then(a=>console.log("answer set"));        
        
          localChannel.current.onopen = function(event) {
            var readyState = localChannel.current.readyState;
            
            if (readyState == "open") {
                localChannel.current.send(JSON.stringify("Hello"));
            }
          };   
  }
  const connect = async () => {
        try {  
        console.log('connect!');
        const dataChannelParams = {ordered: true};
        localConnection.current=new RTCPeerConnection();

        localConnection.current.addEventListener('icecandidate', async e => {
            console.log('local connection ICE candidate: ', e.candidate);
            e.candidate !== null ? await remoteConnection.current.addIceCandidate(e.candidate) : await null;
          });
          //window.remoteConnection = remoteConnection = new RTCPeerConnection();
          remoteConnection.current.addEventListener('icecandidate', async e => {
            console.log('remote connection ICE candidate: ', e.candidate);
            e.candidate !== null ? await localConnection.current.addIceCandidate(e.candidate) : await null;
          });   
  
        localChannel.current=localConnection.current.createDataChannel('messaging-channel', dataChannelParams);
        localChannel.current.binaryType = 'arraybuffer';        
        localChannel.current.addEventListener('open', () => {
            console.log('Local channel open!');
            setconnected(true);
        });
        localConnection.current.ondatachannel = function(ev) {
            console.log('Data channel is created!');
            ev.channel.onopen = function() {
              console.log('Data channel is open and ready to be used.');
            };
            ev.channel.onmessage = e=>console.log("new message from client " + e.data);
          };
        localChannel.current.addEventListener('close', () => {
            console.log('Local channel closed!');
            setconnected(false);
        });
        //localChannel.current.addEventListener('message', onLocalMessageReceived.bind(this));

        const initLocalOffer = async () => {
            const localOffer = await localConnection.current.createOffer();
            console.log(`Got local offer ${JSON.stringify(localOffer)}`);            
            const localDesc = localConnection.current.setLocalDescription(localOffer); 
            const remoteDesc = remoteConnection.current.setRemoteDescription(localOffer);           
            return Promise.all([localDesc, remoteDesc]);
        };        
        await initLocalOffer();
        } catch (e) {
        console.log(e);
        }        
    }    
    
   /* const initRemoteAnswer = async () => {
        const remoteAnswer = await remoteConnection.current.createAnswer();
        console.log(`Got remote answer ${JSON.stringify(remoteAnswer)}`);            
        const localDesc = remoteConnection.current.setLocalDescription(remoteAnswer);
        const remoteDesc = localConnection.current.setRemoteDescription(remoteAnswer);
        return Promise.all([localDesc, remoteDesc]);
    };*/

  const onLocalMessageReceived=(event:any)=> {
    console.log(`Remote message received by local: ${event.data}`);
    setlocalMessages(localMessages += event.data + '\n');
  }

  const onRemoteDataChannel=(event:any)=> {
    console.log(`onRemoteDataChannel: ${JSON.stringify(event)}`);
    window.remoteChannel = event.channel;
    remoteChan.current=event.channel;
    var remoteChannel=remoteChan.current;
    remoteChannel.binaryType = 'arraybuffer';
    remoteChannel.addEventListener('message', onRemoteMessageReceived.bind(this));
    remoteChannel.addEventListener('close', () => {
      console.log('Remote channel closed!');
      setconnected(false);
    });
  }

  const onRemoteMessageReceived=(event:any)=> {
    console.log(`Local message received by remote: ${event.data}`);
    setremoteMessages(remoteMessages += event.data + '\n');
  }
  const handleInputs = (e: { target: { name: any;value:any; }; }) =>{
    const name= e.target.name;   
    const value= e.target.value;  //console.log(name);
    setUserRegisteration({...clientOffer,[name] : value})
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
                <button onClick={clickHandler()}>Connect</button>

                <label>Enter response:</label>
                <textarea onChange={handleInputs} name="offerstring" value={clientOffer.offerstring} >
               </textarea>
               <button onClick={clickForEstablish()}>Establish connection</button>
               <label>Enter message:</label>
               <textarea onChange={handleInputs} name="chatmessages" value={clientOffer.chatmessages} >
               </textarea>
               <button onClick={clickforsend()}>send message</button>
               
            </div>
        </div>
    </div>
      );
}
export default ChatBot;