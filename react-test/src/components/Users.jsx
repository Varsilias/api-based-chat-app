import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window !== undefined) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (user && token) {
        setLoggedInUser(user);
        setAccessToken(token);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${baseURL}/api/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUsers((prev) => [...prev, ...res.data.data]);
    };

    fetchUsers().catch((error) => console.log(error.message));
  }, [loggedInUser, accessToken]);

  const setReceiverId = (id) => {
    localStorage.setItem("receiver_id", id);
    navigate("/chat");
  };

  return users.length === 0 ? (
    <p>Fetching Users...</p>
  ) : (
    <div className="w-4/5 border-2 border-gray-400 my-4 mx-auto p-4 rounded-md h-4/5">
      <h1 className="text-gray-700 text-center font-bold text-3xl mb-2">
        Users
      </h1>
      <p className="text-gray-700 text-center font-normal text-base">
        Click a user to start chatting
      </p>
      {users.map((user, index) => (
        <div key={index} className="border-b-2 border-gray-300 py-2">
          <ul>
            <li
              className="text-blue-500 text-medium cursor-pointer hover:underline"
              onClick={() => setReceiverId(user.id)}
            >
              {user.name}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Users;
