import React, { useState, useEffect, useRef} from 'react';
import Socket from '../third-party/socket';

import './chat.scss';

interface IChatProps {
  username: string;
};

interface IChatMessage {
  username: string;
  message: string;  
}

const Chat: React.FC<IChatProps> = ({ username }: IChatProps ) => {
    const [ currentMessage, setCurrentMessage ] = useState<string>('');
    const [ messageList, setMessageList ] = useState<IChatMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (username) {
        Socket.emit('connected', username);
      }
    }, [ username ]);

    useEffect(() => {
      Socket.on('messages', message => {
        console.log('Recibido: ', message);
        setMessageList([...messageList, message])
      });
      
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
      }

      return () => {
        Socket.off();
      }
    }, [messageList]);
    
    // useEffect(() => {
    //   if (messagesEndRef && messagesEndRef.current != null) {
    //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
    //   }
    // }, [messageList]);
    
    const sendMessage = (e: React.FormEvent ) => {
      e.preventDefault();
      Socket.emit('message', username, currentMessage);
      setCurrentMessage('');
    };
    
    return (
        <div className="chat">
          <div>
            <div className="chat-messages">
              { messageList.map((message: any, idx) =>
                <div key={ idx } className="message-item">
                  <div className="username">
                    { message.username }:
                  </div>
                  <div className="message-text">
                    { message.message }
                  </div>
                  <div ref={ messagesEndRef } />
                 </div>
              )}
              </div>
              <form onSubmit={ sendMessage }>
                <label>Type your message here...</label>
                <textarea
                  cols={ 30 }
                  rows={ 10 }
                  value={ currentMessage }
                  onChange={ e => setCurrentMessage(e.target.value) }
                  />
                <button>Send</button>
              </form>
        </div>
      </div>
    );
};

export default Chat;