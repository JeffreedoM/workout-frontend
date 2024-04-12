import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <div className="flex h-[10vh] w-full items-center justify-between bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="wrapper flex items-center justify-between">
        <h1 className="text-xl font-bold lg:text-2xl">
          <Link to="/">Workout Buddy</Link>
        </h1>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <p>{user.email}</p>
              <button
                onClick={handleClick}
                className="rounded border-2 border-emerald-600 p-2 px-3 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
              >
                Log out
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login">
                <button className="rounded border-2 border-emerald-600 p-2 px-3 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded border-2 border-emerald-600 p-2 px-3 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
