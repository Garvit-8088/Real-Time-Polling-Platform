import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function CreatePoll() {

  const navigate =
    useNavigate();

  const [question,
    setQuestion] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [options,
    setOptions] =
    useState([
      "",
      ""
    ]);

  const handleOptionChange =
    (index, value) => {

      const updated =
        [...options];

      updated[index] =
        value;

      setOptions(updated);
    };

  const addOption = () => {

    setOptions([
      ...options,
      ""
    ]);
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/polls",
          {
            question,
            description,
            options:
              options.map(
                (option) => ({
                  text: option
                })
              )
          }
        );

        navigate("/");

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
          Create Poll
        </h2>

        <form
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Question"
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
          />

          <br />
          <br />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <br />
          <br />

          {options.map(
            (
              option,
              index
            ) => (
              <div key={index}>
                <input
                  placeholder={`Option ${
                    index + 1
                  }`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      e.target.value
                    )
                  }
                />
              </div>
            )
          )}

          <br />

          <button
            type="button"
            onClick={addOption}
          >
            Add Option
          </button>

          <br />
          <br />

          <button type="submit">
            Create Poll
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePoll;