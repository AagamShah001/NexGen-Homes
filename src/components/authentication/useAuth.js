import { useEffect, useState } from "react";

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    isLoggedin: false,
    role: "",
    loading: true,
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (id && role) {
      setAuthState({ isLoggedin: true, role:role, loading: false });
    } else {
      setAuthState({ isLoggedin: false, role: "", loading: false });
    }
  }, []);

  return authState;
};
