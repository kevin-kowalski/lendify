import { useEffect, useContext } from "react";
import { HeaderContext, HeaderContextProps } from "../../contexts/HeaderContext";
import { SocketContext, SocketContextProps } from "../../contexts/SocketContext";

import ChatSingle from "./ChatSingle";

function InboxCombined() {

  const { setActionButtonGroupData } = useContext<HeaderContextProps>(HeaderContext);
  const {
    chats,
    currentChatId,
    setCurrentChatId,
    currentItemId,
  } = useContext<SocketContextProps>(SocketContext);

  // Initialize the header
  useEffect(() => {
    setActionButtonGroupData([]);
  }, [setActionButtonGroupData]);

  /* Event Handlers */

  // When the user clicks on a chat
  function handleChatClick (chatId: string) {
    setCurrentChatId(chatId);
  }

  /* Render Component */

  return (<>
    <div className="inbox">
      <div className="chat-preview-container">
      {chats && chats
        .map((chat, index) => (
        <div className={`chat-preview-wrapper ${chat.id === currentChatId ? 'active' : ''}`} key={index}>
          <div
            className={`chat-preview ${(chat.unreadMessages && chat.unreadMessages > 0) && 'unread'}`}
            onClick={() => handleChatClick(chat.id)}
            style={{backgroundImage: `url(${chat.img_url})`}}
          ></div>
        </div>
      ))}
      </div>

      {chats && <ChatSingle currentChatId={currentChatId} currentItemId={currentItemId} />}
    </div>

  </>);
}

export default InboxCombined;
