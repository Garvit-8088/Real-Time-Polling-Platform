import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import socket from "../socket";

import { useAuth } from "../context/AuthContext";

function PollDetails() {

  const { id } = useParams();

  const { user } = useAuth();

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoll();
  }, []);

  const fetchPoll = async () => {
    try {

      const res = await api.get(`/polls/${id}`);
      setPoll(res.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const handleVote = (updatedPoll) => {
      if (updatedPoll._id === id) {
        setPoll(updatedPoll);
      }
    };

    const handleClose = (updatedPoll) => {
      if (updatedPoll._id === id) {
        setPoll(updatedPoll);
      }
    };

    socket.on("poll:vote", handleVote);
    socket.on("poll:close", handleClose);

    return () => {
      socket.off("poll:vote", handleVote);
      socket.off("poll:close", handleClose);
    };

  }, [id]);

  const handleVote = async (optionId) => {
    try {

      await api.post("/polls/vote", {
        pollId: poll._id,
        optionId
      });

      fetchPoll();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to vote");
    }
  };

  const handleClosePoll = async () => {
    try {

      await api.put(`/polls/close/${poll._id}`);
      fetchPoll();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to close poll");
    }
  };

  if (loading) return <><Navbar /><h2>Loading...</h2></>;

  if (!poll) return <><Navbar /><h2>Poll Not Found</h2></>;

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h2>{poll.question}</h2>
        <p>{poll.description}</p>

        <p>
          <strong>Status:</strong> {poll.status}
        </p>

        <hr />

        {user?.role === "admin" && poll.status === "active" && (
          <button onClick={handleClosePoll}>
            Close Poll
          </button>
        )}

        <h3>Options</h3>

        {poll.options.map(option => (
          <div
            key={option._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <strong>{option.text}</strong>

            <p>Votes: {option.votes}</p>

            {poll.status === "active" && (
              <button onClick={() => handleVote(option._id)}>
                Vote
              </button>
            )}
          </div>
        ))}

      </div>
    </>
  );
}

export default PollDetails;