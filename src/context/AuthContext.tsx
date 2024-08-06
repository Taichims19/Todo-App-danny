import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { findUserByEmail, saveUser } from "../hooks/userService";

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  displayName: string | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: { email: string; displayName: string };
}

const initialState: AuthState = {
  isAuthenticated: false,
  userEmail: null,
  displayName: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        userEmail: action.payload?.email || null,
        displayName: action.payload?.displayName || null,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        userEmail: null,
        displayName: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, displayName: string) => void;
  loginWithGoogle: (token: string) => void;
  logout: () => void;
  error: string | null;
}>({
  state: initialState,
  dispatch: () => {},
  login: () => {},
  register: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
  error: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const displayName = localStorage.getItem("displayName");
    if (userEmail && displayName) {
      dispatch({
        type: "LOGIN",
        payload: { email: userEmail, displayName },
      });
    }
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem("userEmail", state.userEmail || "");
      localStorage.setItem("displayName", state.displayName || "");
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("displayName");
    }
  }, [state.isAuthenticated, state.userEmail, state.displayName]);

  const login = (email: string, password: string) => {
    const user = findUserByEmail(email);
    if (user && user.password === password) {
      dispatch({
        type: "LOGIN",
        payload: { email: user.email, displayName: user.displayName },
      });
      setError(null);
      navigate("/");
    } else {
      setError("Credenciales incorrectas");
      console.error("Credenciales incorrectas");
    }
  };

  const register = (email: string, password: string, displayName: string) => {
    const user = { email, password, displayName };
    saveUser(user);
    dispatch({
      type: "LOGIN",
      payload: { email, displayName },
    });
    setError(null);
    navigate("/");
  };

  const loginWithGoogle = (token: string) => {
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((userInfo) => {
        const email = userInfo.email;
        const displayName = userInfo.name;
        dispatch({
          type: "LOGIN",
          payload: { email, displayName },
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error en la autenticación con Google:", error);
      });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setError(null);
    navigate("/auth/login");
    googleLogout();
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        register,
        loginWithGoogle,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
