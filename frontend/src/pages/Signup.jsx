import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

function Signup() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      organizationName: "",
      name: "",
      email: "",
      password: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/auth/signup",
          formData
        );

        navigate("/login");

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
            "Signup failed"
        );

      }
    };

  return (
    <div>
      <h2>Signup</h2>

      <form
        onSubmit={handleSubmit}
      >
        <input
          name="organizationName"
          placeholder="Organization"
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;