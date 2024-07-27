import React, { Dispatch, SetStateAction } from 'react';
import ChatItem from './ChatItem';

interface ChatListProps {
  currentUser: any;
  users: Array<any>;
  setUserId: Dispatch<SetStateAction<string>>;
}

const ChatList: React.FC<ChatListProps> = ({ currentUser, users, setUserId }) => {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2 p-6 overflow-y-auto">
        {users.map((user, index) => (
          <ChatItem
            key={user.userId}
            noBorder={index + 1 === users.length}
            item={user}
            setUserId={setUserId}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
