import { Link } from "react-router-dom";

function PollCard({ poll }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        marginBottom: "10px",
        padding: "15px"
      }}
    >
      <h3>{poll.question}</h3>

      <p>{poll.description}</p>

      <p>
        Status: {poll.status}
      </p>

      <Link
        to={`/polls/${poll._id}`}
      >
        View Poll
      </Link>
    </div>
  );
}

export default PollCard;