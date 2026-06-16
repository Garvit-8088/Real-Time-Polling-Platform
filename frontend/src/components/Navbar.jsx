import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "15px",
        padding: "15px",
        borderBottom: "1px solid #ddd"
      }}
    >
      <Link to="/">Dashboard</Link>

      <Link to="/create-poll">
        Create Poll
      </Link>

      <Link to="/members">
        Members
      </Link>

      <Link to="/profile">
        Profile
      </Link>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;