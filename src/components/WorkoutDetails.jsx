import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// libraries
import { format, formatDistanceToNow } from "date-fns";
import { useSnackbar } from "notistack";

function Workouts({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const { title, load, reps, createdAt, updatedAt } = workout;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const handleClick = () => {
    if (!user) return;
    axios
      .delete(`http://localhost:5000/workouts/${workout._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        dispatch({ type: "DELETE_WORKOUT", payload: response.data });
        enqueueSnackbar("Successfully deleted workout", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mb-6 mt-4 w-full bg-white px-6 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h1 className="mb-5 mt-3 text-lg font-semibold uppercase">{title}</h1>
      <div className="mb-2 sm:flex">
        <div className="w-full bg-slate-200 p-2 font-semibold sm:w-[150px]">
          Load
        </div>
        <div className="p-2">{load}</div>
      </div>
      <div className="mb-2 sm:flex">
        <div className="w-full bg-slate-200 p-2 font-semibold sm:w-[150px]">
          Reps
        </div>
        <div className="p-2">{reps}</div>
      </div>
      <div className="mb-2 sm:flex">
        <div className="w-full bg-slate-200 p-2 font-semibold sm:w-[150px]">
          Date Created
        </div>
        <div className="p-2">{format(new Date(createdAt), "PPP")}</div>
      </div>
      <div className="mb-2 sm:flex">
        <div className="w-full bg-slate-200 p-2 font-semibold sm:w-[150px]">
          Last Update
        </div>
        <div className="p-2">
          {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button
          onClick={handleClick}
          className="rounded bg-black px-4 py-2.5 text-sm  text-white hover:bg-zinc-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Workouts;
