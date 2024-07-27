import React, { Dispatch, SetStateAction } from 'react';

interface ChatItemProps {
  noBorder: boolean;
  item: any;
  currentUser: any;
  setUserId: Dispatch<SetStateAction<string>>
}

const ChatItem: React.FC<ChatItemProps> = ({ noBorder, item, setUserId }) => {
  const handleClick = () => {
    setUserId(item?.userId)
  };

  return (
    <div
      className={`p-4 flex items-center justify-between border-b ${noBorder ? 'border-transparent' : 'border-gray-200'}`}
      onClick={handleClick}
    >
      <div>
        <p className="text-lg font-semibold">{item.username}</p>
        <p className="text-gray-500">{item.email}</p>
      </div>
      <img src={item.profileUrl} alt={item.username} className="w-10 h-10 rounded-full" />
    </div>
  );
};

export default ChatItem;
