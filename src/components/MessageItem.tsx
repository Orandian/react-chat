import React from "react";

interface MessageItemProps {
  message: any;
  currentUser: any;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, currentUser }) => {
  if (currentUser?.userId === message?.userId) {
    return (
      <div className="flex justify-end mb-3 mr-3">
        <div className="self-end p-3 rounded-2xl bg-white border border-neutral-200">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-start mb-3 mr-3">
        <div className="self-end p-3 rounded-2xl bg-neutral-200 border border-neutral-200">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    );
  }
};

export default MessageItem;
