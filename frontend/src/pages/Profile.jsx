import { jwtDecode }
from "jwt-decode";

import Navbar
from "../components/Navbar";

function Profile() {

  const token =
    localStorage.getItem(
      "token"
    );

  let user = null;

  if (token) {
    user =
      jwtDecode(token);
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "20px"
        }}
      >
        <h2>Profile</h2>

        {user ? (
          <>
            <p>
              User ID:
              {" "}
              {user.userId}
            </p>

            <p>
              Role:
              {" "}
              {user.role}
            </p>

            <p>
              Organization:
              {" "}
              {
                user.organizationId
              }
            </p>
          </>
        ) : (
          <p>
            No user found
          </p>
        )}
      </div>
    </>
  );
}

export default Profile;