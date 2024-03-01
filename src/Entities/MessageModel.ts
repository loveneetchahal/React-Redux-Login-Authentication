export class MessageModel{
    messsageId: string;
    senderId: string;
    topicId:string;
    topicName:string;
    topicType:string;
    type: string;
    message: string;
    date: Date;      
    docData: string;
    
    constructor( messsageId: string,
      senderId: string,
      topicId:string,
      topicName:string,
      topicType:string,
      type: string,
      message: string,
      date:Date, 
      docData: string)
      {
      this.messsageId = messsageId;
      this.senderId=senderId;
      this.topicId=topicId;
      this.topicName=topicName;
      this.topicType=topicType;
      this.type = type;
      this.message =message;
      this.date=date;
      this.docData=docData;
    }
  }

  