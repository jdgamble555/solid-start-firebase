import { loginWithGoogle, logout } from "./use-user";

export const Loading = () => <p>Loading...</p>;

export const Login = () => (
  <button
    type="button"
    class="border p-2 rounded-md text-white bg-red-600"
    onClick={() => loginWithGoogle()}
  >
    Sign in with Google
  </button>
);

export const Logout = () => (
  <p>
    <button
      type="button"
      class="border p-2 rounded-md text-white bg-lime-600"
      onClick={() => logout()}
    >
      Logout
    </button>
  </p>
);
