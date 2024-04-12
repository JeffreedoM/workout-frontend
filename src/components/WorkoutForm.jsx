import axios from "../../api/axios";
import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import { useSnackbar } from "notistack";

function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
      return;
    }
    axios
      .post(
        "workouts",
        { title, load, reps },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setError(null);
        setTitle("");
        setLoad("");
        setReps("");
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: response.data });
        enqueueSnackbar("Successfully created a new workout", {
          variant: "success",
        });
        console.log("sa then");
      })
      .catch((err) => {
        const { emptyFields, error } = err.response.data;
        console.log(err);
        console.log("sa catch");
        setEmptyFields(emptyFields);
        setError(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 w-full bg-white px-8 py-7 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <h1 className="mb-8 text-lg font-semibold">Add a New Workout</h1>
      <div className="mb-3">
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`w-full rounded-sm border p-2 py-3 ${
            emptyFields.includes("title")
              ? "border-red-400"
              : "border-slate-400"
          }`}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="load" className="font-semibold">
          Load (in kg)
        </label>
        <input
          type="number"
          id="load"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          min={0}
          className={`w-full rounded-sm border p-2 py-3 ${
            emptyFields.includes("load") ? "border-red-400" : "border-slate-400"
          }`}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reps" className="font-semibold">
          Reps
        </label>
        <input
          type="number"
          id="reps"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          min={0}
          className={`w-full rounded-sm border p-2 py-3 ${
            emptyFields.includes("reps") ? "border-red-400" : "border-slate-400"
          }`}
        />
      </div>
      {error && <div className=" text-red-500">{error}</div>}
      <button className="mt-3 w-full rounded-sm bg-black p-4 text-center text-white hover:bg-zinc-900">
        Add Workout
      </button>
    </form>
  );
}

export default WorkoutForm;
