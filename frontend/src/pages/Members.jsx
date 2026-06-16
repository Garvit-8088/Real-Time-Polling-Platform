import { useEffect, useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function Members() {
  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers =
    async () => {
      try {
        const res =
          await api.get(
            "/members"
          );

        setMembers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <>
        <Navbar />
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "20px"
        }}
      >
        <h2>
          Organization Members
        </h2>

        {members.map(
          (member) => (
            <div
              key={member._id}
              style={{
                border:
                  "1px solid #ddd",
                padding: "10px",
                marginBottom:
                  "10px"
              }}
            >
              <h4>
                {member.name}
              </h4>

              <p>
                {member.email}
              </p>

              <p>
                Role:
                {" "}
                {member.role}
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Members;