import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ChatWindow = () => {
  const [senderId, setSenderId] = useState(0);
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [user, setUser] = useState({});
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
    setReceiverId(parseInt(localStorage.getItem("receiver_id")));
    setSenderId(loggedInUser.id);
  }, [senderId, receiverId]);

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = import.meta.env.VITE_ENABLE_LOGGING;

    let pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: "mt1",
      authEndpoint: `${baseURL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `${user.access_token}`,
        },
      },
    });

    let channel = pusher.subscribe(`private-chat-${user.id}`);
    channel.bind("message", function (payload) {
      console.log(payload);
      setMessages((prev) => [...prev, payload]);
    });
  }, [user]);

  const handleSubmit = async (e) => {
    console.log(senderId, receiverId);
    e.preventDefault();
    await axios.post(
      `${baseURL}/api/messages`,
      {
        sender: senderId,
        receiver: receiverId,
        message,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    setMessage("");
    setReceiverId("");
    setSenderId("");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="w-4/5 border-2 border-gray-400 my-4 mx-auto p-4 rounded-md h-4/5">
      <div className="w-full flex justify-between py-2">
        <h1 className="text-gray-700 text-center font-bold text-xl">
          {user && user.name}
        </h1>
        <button
          onClick={logout}
          className="font-medium shadow-md border-2 border-gray-300 bg-gray-700 p-1.5 text-yellow-100 rounded-md"
        >
          Logout
        </button>
      </div>

      <h3 className="mb-4 text-lg font-medium text-center py-2 bg-gray-600 text-yellow-50">
        Messages
      </h3>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className={``}>
            <p>
              <strong>message:</strong> {message.message}
            </p>
            <p>
              <strong>From:</strong> {message.senderName}
            </p>
            <p>
              <strong>To:</strong> {message.receiverName}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center">No Messages Available</p>
      )}

      <form onSubmit={handleSubmit} className="flex justify-between mt-64">
        <div className="flex-1  mr-0.5">
          <label htmlFor="sender">
            <input
              className="w-full p-1.5 mt-1 outline-slate-500"
              autoFocus={true}
              type="text"
              name="message"
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                setTyping(true);
              }}
              onKeyUp={(e) => {
                setTimeout(() => {
                  setTyping(false);
                }, 1500);
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          className="font-medium shadow-md border-2 border-gray-300 bg-gray-700 p-2 text-yellow-100 rounded-md"
        >
          <AiOutlineSend fontSize="23" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
