import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { MessageModel } from "../Entities/MessageModel";
import { Subject } from "rxjs";

export class ChatService {
    private connectionIsEstablished = false;
    public _hubConnection: HubConnection;  
    public subject = new Subject<MessageModel>();
    constructor (accessToken:string) {
        this._hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7274/chatHub",
        //https://chatbookdev.azurewebsites.net
         { accessTokenFactory: () => accessToken 
        }).build();
        this.registerOnServerEvents();
        this.startConnection();
    }
    public  sendMessage(ReceiverId: string,message: MessageModel) {
        this._hubConnection.invoke('NewMessage', ReceiverId,message);
    } 

    public registerOnServerEvents() {                  
        this._hubConnection.on('MessageReceived', (data: any) => {
            this.subject.next(data);
          });
    }

    public startConnection():void {
        this._hubConnection.start().then(() => {
            this.connectionIsEstablished = true;            
            console.log('Hub connection started');                          
          }).catch(err => {
            console.log('Error while establishing connection, retrying...');
            setTimeout( () => { }, 5000);
          });
    }

    public createNewGroup(groupName:string,usersList:any){
        this._hubConnection.invoke('CreateNewGroup',groupName,usersList);
    }
}
