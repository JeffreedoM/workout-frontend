import axios from "../../api/axios";
import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Workouts from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      axios
        .get("workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          dispatch({ type: "SET_WORKOUTS", payload: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="mt-2 w-full justify-between gap-x-7 md:flex">
        <div className="md:w-[60%]">
          {workouts && workouts.length > 0 ? (
            workouts.map((workout) => (
              <Workouts key={workout._id} workout={workout} />
            ))
          ) : (
            <div className="py-7 text-center">No workouts available</div>
          )}
        </div>
        <div className="flex-grow">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
