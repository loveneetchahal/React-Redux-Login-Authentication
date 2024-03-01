import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageInputSmall, VirtualizedMessageList, Window, ChannelList } from 'stream-chat-react';
import Left_nav from '../layout/Left-nav/Left_nav';
import 'stream-chat-react/dist/css/index.css';
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
const ChatBox = () =>{  
const chatClient = StreamChat.getInstance('dz5f4d5kzrue');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibWlzdHktbGFrZS02IiwiZXhwIjoxNjM4ODAzNTk1fQ.moPn8-tgr9zDGGQVEsnbuJOqmEHS8vyFmm9U85IAWHA';

chatClient.connectUser(
    {
      id: 'misty-lake-6',
      name: 'misty',
      image: 'https://getstream.io/random_png/?id=misty-lake-6&name=misty',
    },
    userToken,
  );
  

  const filters = { type: 'messaging', members: { $in: ['wispy-violet-1'] } };
  const sort = { last_message_at: -1 };
  
const channel = chatClient.channel('livestream', 'spacex', {
  image: 'https://goo.gl/Zefkbx',
  name: 'Evolvous Chat Bot',
});
return (
    <div className="holder">
      <Left_nav/>
        <div className="page-container">
        <div style={style.container}>
            <Chat client={chatClient} theme='messaging light'>
            <ChannelList filters={filters} />
                <Channel channel={channel}>
                    <Window>
                        <ChannelHeader live />
                        <VirtualizedMessageList />
                        <MessageInput Input={MessageInputSmall} focus />
                    </Window>
                </Channel>                
            </Chat>
            </div>
        </div>
    </div>
  );
}
export default ChatBox;