import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getDocs,
  query,
  where,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { userRef, db } from "../firebaseConfig";
import { getRoomId } from "../utils/common";
import MessageItem from "../components/MessageItem";

const Home = () => {
  const { user, logout } = useAuth();
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollViewRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogut = async () => {
    await logout();
  }

  useEffect(() => {
    if (user.uid) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    const q = query(userRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
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
      if (inputRef){
        inputRef.current.value = "";
      }
      await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error: any) {
      console.log("Message", error.message);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {users.length > 0 ? (
        <div className="h-screen flex">
          <div className="h-full w-1/3 bg-slate-400 relative">
            <div className="flex flex-col gap-2 p-6 overflow-y-auto">
              {users.map((user, index) => (
                <div
                  key={index}
                  className={`p-4 flex items-center justify-between border-b ${index + 1 === users.length ? "border-transparent" : "border-gray-200"}`}
                  onClick={() => setUserId(user.userId)}
                >
                  <div>
                    <p className="text-lg font-semibold">{user.username}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <img
                    src={user.profileUrl}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              ))}
            </div>
            <button onClick={handleLogut} className="absolute bottom-8 right-6 bg-white rounded-md px-6 py-4">
              <p>Logout</p>
            </button>
          </div>
          <div className="h-full w-2/3">
            {!userId ? (
              <div>
                <p>no chat</p>
              </div>
            ) : (
              <div className="py-10 px-10 relative h-full">
                <div
                  className="pb-32 overflow-y-scroll h-screen flex-col"
                  ref={scrollViewRef}
                >
                  {messages.map((message: any, index: number) => (
                    <MessageItem
                      message={message}
                      key={index}
                      currentUser={user}
                    />
                  ))}
                </div>
                <div className="absolute bottom-0 w-11/12 bg-white">
                  <div className="pt-2 mb-7">
                    <div className="flex mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                      <input
                      ref={inputRef}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type message..."
                        className="flex-1 mr-2 text-base outline-none"
                        style={{ fontSize: "1rem" }}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-neutral-200 p-2 mr-px rounded-full"
                      >
                        <p>Send</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
