import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import Left_nav from '../layout/Left-nav/Left_nav';
import styles from '../ChatComponents/SignalRChatBot.module.css';
import { MessageModel } from '../../Entities/MessageModel';
import { useDispatch, useSelector } from 'react-redux';
import { ChatService } from '../../Services/ChatService';
import { AddNewUserToChatList, CheckUserIsOnline, DeleteMessage, GetMessageData, SearchUserByNameOrEmail, SendMessage,GetAllSubscribedTopics } from '../../Services/ChatDataProvider';
import { confirmPopup } from 'primereact/confirmpopup';
import { AutoComplete } from 'primereact/autocomplete';
import { AxiosResponse } from 'axios';
import { User } from '../../Entities/User';
import { Popover, Typography } from '@material-ui/core';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import jwtDecode from 'jwt-decode';
import { StoreMessages } from 'src/reducers/SaveChatMessages';

const SignalRChatBot=()=>{
    const [clientOffer, setUserRegisteration]=useState({
        chatmessages: "" ,
        uploadFile:""
    }); 
    //const message = useMemo(()=> { return new ChatService(); }, [])
    //var message: MutableRefObject<ChatService> = useRef(new ChatService());  
    const dispatch =useDispatch();   
    const [UserChatSummary,setUserChatSummary]=useState([]as any);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedUserForGroup, setSelectedUserForGroup] = useState<any>(null);
    const [ResponseMessage,setResponseMessage]=useState([]as any);
    const [messages,setmessages]=useState([]as any);
    const [userId,setUserID]=useState(localStorage.getItem('UserId')?localStorage.getItem('UserId'):"");
    const [TopicId,setTopicID]=useState(localStorage.getItem('TopicId')?localStorage.getItem('TopicId'):"");
    const [userOnline,SetUserOnline]=useState(false);
    const [connection, setConnection] = useState<null | ChatService>(null);
    const [sendMessageResponse,setMessageResponse]=useState(false);
    const [visibleLeft,setvisibleLeft]=useState(true);
    const [receiverId,setReceiverId]=useState(localStorage.getItem('ReceiverId')?localStorage.getItem('ReceiverId'):"");
    const [filteredUsers, setFilteredUsers] = useState<any>(null);
    const [receivername,setReceiverName]=useState("");
    const [receiverEmail,setReceiverEmail]=useState("");
    const [TopicName,setTopicName]=useState(localStorage.getItem('TopicName')?localStorage.getItem('TopicName'):"");
    const [GroupName,setGroupName]=useState("");
    const [TopicType,setTopicType]=useState("");
    const [currentTopicType,setcurrentTopicType]=useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [GroupNameonCreate,setGroupNameonCreate]= useState("");
    //const CurrentActiveTopicId = React.useMemo(() => TopicId , [TopicId]); 
    useEffect(()=>{
      GetMessagesFromDb()
    },[TopicId]);
    useEffect(() => {
      let token=localStorage.getItem('AccessToken');
      if(token){
        var chatservice=new ChatService(token);      
        setConnection(chatservice); 
      }                
      GetMessagesFromDb();
      GetUserSummaryFromDb();      
      //SetUserOnline(receiverId!=""?true:false);      
      return () => {
        setmessages([]); 
        localStorage.setItem('ReceiverId',"");
        
      };      
      }, []);  
      useEffect(()=>{
        if(connection)
          connection.subject.subscribe({
            next: (message:any) => {
              setResponseMessage(message);
              if(message.type=="file")
              {
                GetMessagesFromDb();
              }
               }    
          }); 
      });  
      useEffect(()=>{        
          if (ResponseMessage.messsageid !== "") {
            if(ResponseMessage.length!==0){
            setmessages([...messages,ResponseMessage]);
            dispatch(StoreMessages(ResponseMessage)); 
            }            
          }
      },[ResponseMessage]);
const sendMsg=()=>{ 
  //new Date().toISOString()
    var data=new MessageModel(new Date().getTime().toPrecision(),(userId?.length!=null?userId:""),
    TopicId!=null?TopicId:"",GroupName,TopicType,"text",clientOffer.chatmessages,new Date(),""); 

    //var dat=new MessageModel(new Date().toString(),(userId?.length!=null?userId:""),
    //TopicId,"text",clientOffer.chatmessages,new Date().toISOString(),""); 
    //var dataForUseState=data.date;//=new Date().toISOString();
    setmessages([...messages,data]);
    sendMessageToDB(data);
    if(connection)       
      connection.sendMessage(receiverId!=null?receiverId:"",data);   
}  
const GetUserSummaryFromDb=()=>{
  (async () => {
    try {
      let res:any = await GetAllSubscribedTopics(userId!=null?userId:"");
      setUserChatSummary(res);
    } catch (err) {
      console.log(err);
    }
  })(); 
}
const sendMessageToDB=(msg:MessageModel)=>{
  (async () => {
    try {
      let res:any = await SendMessage(msg);
      if(res.data.statusCode === 200){        
        setMessageResponse(true);
      }else{        
        setMessageResponse(false);
      }   
    } catch (err) {
      console.log(err);
    }
  })();
}
const GetMessagesFromDb=()=>{
  (async () => {
    try {
      let res:any = await GetMessageData(TopicId!=null?TopicId:""); 
      setmessages(res.data.data);
    } catch (err) {
      console.log(err);
    }
  })(); 
}
const clickforsend = () => {
    return (event: React.MouseEvent) => {        
        sendMsg();
        clientOffer.chatmessages="";
      event.preventDefault();
    }
  }
  const handleInputs = (e: { target: { name: any;value:any; }; }) =>{
    const name= e.target.name;   
    const value= e.target.value; 
    setUserRegisteration({...clientOffer,[name] : value})
}

  const handleRemoveItem = (e:any) => {      
    confirmPopup({      
      target: e.currentTarget,      
      message: 'Delete Message?',
      accept: () => {        
        const id = e.target.id;               
        DeleteMessage(id);
      setmessages(messages.filter((item: { id: number; }) => item.id !== parseInt(id)));
      }
  });
  }
  const clickForFileUpload=()=>{    
    let element: HTMLElement= document.getElementById('imageFile') as HTMLElement;
    element.click(); 
  }
  const handleChangeUploadFile=(e:any)=>{
    const file = e.target.files[0];    
    let reader = new FileReader();
    reader.readAsDataURL(file);
   reader.onload = function () {
    if(reader.result!=null){
      let Base64string=(reader.result).toString();
      var filetype = Base64string.substring(5,10);
      var data=new MessageModel(        
        new Date().getTime().toPrecision(),
        (userId?.length!=null?userId:""),
        TopicId!=null?TopicId:"",GroupName,TopicType,filetype=="image"?"image":"file","",new Date(),Base64string);
        setmessages([...messages,data]);         
      sendMessageToDB(data);      
      if(connection)      
      {
        var dta=new MessageModel(
          new Date().getTime().toPrecision(),
          (userId?.length!=null?userId:""),
          TopicId!=null?TopicId:"",GroupName,TopicType,filetype=="image"?"image":"file","",new Date(),"");
        connection.sendMessage(receiverId!=null?receiverId:"",dta);
      } 
        
    }   
   };
  }
  const ClickToChangeCurrentTopic=async (receiverName:any, receiverEmail: any,
    receiverUserId: any,topicId: any,topicType: any,topicName: any)=>{
      setTopicID(topicId); 
      localStorage.setItem('ReceiverId',receiverUserId);   
      localStorage.setItem('TopicId',topicId);  
      localStorage.setItem('TopicName',receiverName);
      setReceiverId(receiverUserId); 
      setReceiverName(receiverName);
      setReceiverEmail(receiverEmail);      
      setTopicType(topicType);
      if(topicType=="private")
      {
        setTopicName(receiverName);
      }else{
        setTopicName(topicName);
        setGroupName(topicName);
      }
      setcurrentTopicType(topicType);
      SetUserOnline(await CheckUserIsOnline(receiverUserId));
  }
const setVisibleLeft=(val:boolean)=>{

}
const handleGroupAdd=(event:any)=>{
  setAnchorEl(event.currentTarget);
}
const searchUsers = (event: { query: string }) => {
  setTimeout(async () => {    
      let _SearchUsers: Promise<AxiosResponse<any>>;
      let _filterUser;
        _SearchUsers = SearchUserByNameOrEmail(event.query);
        let dta=(await _SearchUsers).data.data;
        setTimeout(()=> {  
          _filterUser = dta.filter((user:any) => {
            return user.userName.toLowerCase().startsWith(event.query.toLowerCase());
        });        
          setFilteredUsers(_filterUser);    
        },500);
  }, 100);
}
const AddNewUserToChat=async (event:any)=>{
  var dt=event.value;
  var userdt=new User(dt.id,dt.userName,dt.email,dt.firstName,dt.lastName); 
  setReceiverId(dt.id); 
  localStorage.setItem('ReceiverId',dt.id);
  let topicid=await AddNewUserToChatList(userdt);
  setTimeout(()=>{
    localStorage.setItem('TopicId',topicid);
    setTopicID(topicid);   
    
  },1000);  
  setTimeout(()=>{
    GetUserSummaryFromDb(); 
    GetMessagesFromDb();   
  },2000); 
  SetUserOnline(await CheckUserIsOnline(dt.id));
}
const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

const handleClose = () => {
  setAnchorEl(null);
};

const onClickforAddGroup = () => {
  setAnchorEl(null);
  setDisplayResponsive(true);
}
const onHide = () => {
  setDisplayResponsive(false);
}
const CreateGroup=()=>{  
  var Ulist= []as any;
  var res = new Promise<void>((resolve, reject) => {
    if(selectedUserForGroup!=null)
    selectedUserForGroup.forEach((e: { id: string; userName: string; email: string; firstName: string; lastName: string; }, index: number, array: string | any[]) => {
      var user=new User(e.id,e.userName,e.email,e.firstName,e.lastName);
      Ulist.push(user);        
      if (index === array.length -1) resolve();
    });  
});
res.then(() => {
  if(connection)      
  {
    var token=localStorage.getItem('AccessToken');
    if(Ulist!=null&&GroupNameonCreate!=""&&localStorage.getItem('AccessToken')){
      if(token){
        const decoded: any = jwtDecode(token);
      var user=new User(decoded.UserId,decoded.userName,decoded.email,decoded.firstName,decoded.lastName);
      Ulist.push(user);
      connection.createNewGroup(GroupNameonCreate,Ulist);
      }      
    }
  } 
});
}

const renderFooter = () => {
  return (
      <div>
          <Button label="Create" onClick={() => CreateGroup()} autoFocus />
      </div>
  );
}
 return(
    <div className="holder">
        <Left_nav/>
          <div className="page-container">    
            <div className={styles.container}>
            <div className={styles.sidebarleft} style={{overflow:"scroll",height:"auto"}}>
              <div className={styles.card}>
                <div className={styles.fixedsearchbar} >
                <div className="row" >
                  <div className={[styles.searchleft,"p-fluid"].join(' ')}>
                    <AutoComplete value={selectedUser} suggestions={filteredUsers} 
                    completeMethod={searchUsers} 
                    onSelect={ (event) =>AddNewUserToChat(event)} field="userName" style={{padding:"5px"}} onChange={(e) => setSelectedUser(e.value)} />
                   </div>
                  <div className={styles.searchright}>
                  <a onClick={(event)=>handleGroupAdd(event)} className={styles.verticalDots}>&#8942;</a> 
                  <Popover  id={id} open={open} anchorEl={anchorEl}
                    onClose={handleClose} anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}>
                    <Typography style={{ padding:"14px" }}>
                      <a onClick={onClickforAddGroup}>Create a group</a>
                      </Typography>
                  </Popover>  
                  <Dialog header="Create Group" style={{ width: '45%',height:"95%" }} position={'top'} visible={displayResponsive} onHide={onHide} breakpoints={{'960px': '75vw'}} footer={renderFooter()} >
                     <div className="p-field">
                    <label htmlFor="name">Group Name</label>
                    <InputText id="name" placeholder='Enter group name' value={GroupNameonCreate} onChange={(e)=>setGroupNameonCreate(e.currentTarget.value)} required autoFocus style={{ width:"100%" }} />
                    </div>
                    <div className="p-fluid">
                    <label htmlFor="name">Search User</label>                    
                    <AutoComplete  value={selectedUserForGroup} placeholder='Type email' style={{ width:"100%" }} suggestions={filteredUsers} 
                    completeMethod={searchUsers} field="userName" multiple onChange={(e) => setSelectedUserForGroup(e.value)} />
                    </div>
                    
                </Dialog>            
                  </div>
                </div>
                </div>
                <div className="row" style={{padding:"50px 0 0 0"}}>
                <div className={styles.ListCard}>
                {
                  UserChatSummary.map(function(list:any){
                    return (
                  <div className={[styles.usersListCard,"row"].join(' ')} onClick={()=>{
                        return ClickToChangeCurrentTopic(
                          list.receiverName, list.receiverEmail, list.receiverUserId, list.topicId, list.topicType, list.topicName);
                      }}>
                  <img src="./image/profileimage.svg" style={{height:"35px"}}></img>
                  <span className="tooltip" title={list.receiverEmail}>{list.receiverName}</span>
                  </div>
                    );
                  })
                }
                </div>
                </div>
              </div>
            </div>
            <div className={styles.sidebarright}> 
                <div>
                <div className={styles.Profile_wrapper}>
                <img src="./image/profileimage.svg"  alt="Avatar" className={styles.imgavatar}/>
                  <div className={userOnline?styles.verified_UserOnlineCheck:styles.verified_UserOfflineCheck}>
                  {userOnline?<span>✓</span>:<span>x</span>}</div>                               
                </div>
                <div className={styles.TextTopicName}><span>{TopicName}</span></div>
                </div>
                <div className={styles.messaging}>
                    <div className={styles.inbox_msg}>
                        <div className={styles.mesgs}>
                        <div className={styles.msg_history}>
                            <div>
                                {  
                                messages.map(function(d:any){                                
                                    if(d.senderId!=userId)
                                    { 
                                      if(d.type=='image')
                                      {
                                        return (                                    
                                          <div key={d.clientuniqueid}  className={styles.incoming_msg_img} >
                                              <div className={styles.received_withd_msg}> 
                                              <img src={d.docData} width="100" height="120"></img>  
                                                  <sub key={d.date}>&nbsp;&nbsp;&nbsp;{(new Date(d.date)).getHours()}:{(new Date(d.date)).getMinutes()} {(new Date(d.date)).getHours()>=12?'pm':'am'}</sub>                                                 
                                              </div>                                            
                                          </div>                                        
                                        );
                                      }
                                      else if(d.type=='file')
                                      {
                                        return (                                    
                                          <div key={d.clientuniqueid}  className={styles.incoming_msg_img} >
                                              <div className={styles.received_withd_msg}> 
                                              <img src="./image/fileimg.svg" width="100" height="120"></img>  
                                                  <sub key={d.date}>&nbsp;&nbsp;&nbsp;{(new Date(d.date)).getHours()}:{(new Date(d.date)).getMinutes()} {(new Date(d.date)).getHours()>=12?'pm':'am'}</sub>                                                 
                                              </div>                                            
                                          </div>                                        
                                        );
                                      }
                                      else{
                                        return (                                    
                                          <div key={d.clientuniqueid}  className={styles.incoming_msg_img}>
                                              <div className={styles.received_withd_msg}>                                                  
                                                  <p key={d.messsageid} id={d.messsageId}>
                                                    {d.message}
                                                  <sub key={d.date}>&nbsp;&nbsp;&nbsp;{(new Date(d.date)).getHours()}:{(new Date(d.date)).getMinutes()} {(new Date(d.date)).getHours()>=12?'pm':'am'}</sub>
                                                  </p>
                                              </div>                                            
                                          </div>                                        
                                        );
                                      }                                    
                                    }else if(d.senderId==userId)
                                    {
                                      if(d.type=='image')
                                      {
                                        return (                                    
                                          <div key={d.clientuniqueid} className={styles.outgoing_msg}>
                                            <div className={styles.sent_msg} >
                                            <img src={d.docData} width="100" height="120"></img>                                            
                                             <sub key={d.date}>&nbsp;&nbsp;&nbsp;{(new Date(d.date)).getHours()}:{(new Date(d.date)).getMinutes()} {(new Date(d.date)).getHours()>=12?'pm':'am'}</sub> 
                                            </div>
                                          </div>                                     
                                        );
                                      }
                                      else if(d.type=='file')
                                      {
                                        return (                                    
                                          <div key={d.clientuniqueid} className={styles.outgoing_msg}>
                                            <div className={styles.sent_msg} >
                                            <img src="./image/fileimg.svg" width="100" height="120"></img>                                            
                                             <sub key={d.date}>&nbsp;&nbsp;&nbsp;{(new Date(d.date)).getHours()}:{(new Date(d.date)).getMinutes()} {(new Date(d.date)).getHours()>=12?'pm':'am'}</sub> 
                                            </div>
                                          </div>                                     
                                        );
                                      }
                                      else{
                                        return(
                                        <div key={d.clientuniqueid} className={styles.outgoing_msg}>
                                          <div className={styles.sent_msg} >
                                          <p key={d.messsageid} id={d.messsageId}>{d.message} 
                                          <sub key={d.date}>&nbsp;&nbsp;&nbsp;{(new Date(d.date)).getHours()}:{(new Date(d.date)).getMinutes()} {(new Date(d.date)).getHours()>=12?'pm':'am'}</sub> 
                                          </p>                              
                                          </div>
                                      </div>
                                      );
                                      }                                       
                                    }
                                })                            
                                }               
                            </div>
                        </div>
                        <div className={styles.type_msg}>
                            <div className={styles.wrapper}>
                              <div className={[styles.left,styles.input_msg_write].join(' ')}>
                              <input type="text" className={styles.write_msg} name="chatmessages" onChange={handleInputs}
                             placeholder="Type a message" value={clientOffer.chatmessages} />
                              </div>
                              <div className={styles.right}>                              
                              <button className={styles.Uploadbtn} type="button" onClick={clickForFileUpload} >
                              <i className="fa fa-paperclip" aria-hidden="true"></i></button>
                              <input type="file" id="imageFile" onChange={handleChangeUploadFile} className={styles.file_UploadIcon} />                          
                              <button className={styles.msg_send_btn} type="button" onClick={clickforsend()} >
                              <i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                              </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>
      );
}
export default SignalRChatBot;


