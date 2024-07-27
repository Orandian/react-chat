import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRoomId } from "../utils/common";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ChatRoom({ userId }: { userId: string }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();

    const roomId = getRoomId(user?.userId, userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => doc.data());
      setMessages([...allMessages]);
    });

    return () => unsub();
  }, [userId]);


  const createRoomIfNotExists = async () => {
    const roomId = getRoomId(user?.userId, userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    const message = text.trim();
    if (!message) return;
    try {
      const roomId = getRoomId(user?.userId, userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      setText("");
      if (inputRef.current) inputRef.current.value = "";
      await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      alert("Message", error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div>hello</div>
      <ChatRoomHeader userId={userId} navigate={navigate} />
      <div className="border-b border-neutral-300"></div>
      <div className="flex flex-col justify-between bg-neutral-100 overflow-auto">
        <div className="flex-1">
          <MessageList
            scrollViewRef={scrollViewRef}
            messages={messages}
            currentUser={user}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between bg-white border p-2 border-neutral-300 rounded-full">
            <input
              ref={inputRef}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type message..."
              className="flex-1 mr-2 text-lg p-2"
            />
            <button
              onClick={handleSendMessage}
              className="bg-neutral-200 p-2 rounded-full"
            >
              <Feather name="send" size={24} color="#737373" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
