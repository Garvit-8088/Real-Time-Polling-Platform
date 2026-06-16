import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import PollCard from "../components/PollCard";
import socket from "../api/socket";

useEffect(() => {

  socket.on(
    "poll:create",
    () => {
      fetchPolls();
    }
  );

  socket.on(
    "poll:vote",
    () => {
      fetchPolls();
    }
  );

  socket.on(
    "poll:close",
    () => {
      fetchPolls();
    }
  );

  return () => {

    socket.off(
      "poll:create"
    );

    socket.off(
      "poll:vote"
    );

    socket.off(
      "poll:close"
    );

  };

}, []);

function Dashboard() {

  const [polls, setPolls] =
    useState([]);

  useEffect(() => {

    fetchPolls();

  }, []);

  const fetchPolls =
    async () => {

      try {

        const res =
          await api.get("/polls");

        setPolls(res.data);

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "20px"
        }}
      >
        <h2>
          Poll Dashboard
        </h2>

        {polls.map((poll) => (
          <PollCard
            key={poll._id}
            poll={poll}
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;