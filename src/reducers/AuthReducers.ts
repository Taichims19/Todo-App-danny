type AuthState = {
  isAuthenticated: boolean;
  userEmail: string | null;
  displayName: string | null;
};

type AuthAction =
  | { type: "setAuthenticated"; payload: boolean }
  | { type: "setUserEmail"; payload: string | null }
  | { type: "setDisplayName"; payload: string | null };

const AuthReducers = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "setAuthenticated":
      return { ...state, isAuthenticated: action.payload };
    case "setUserEmail":
      return { ...state, userEmail: action.payload };
    case "setDisplayName":
      return { ...state, displayName: action.payload };
    default:
      return state;
  }
};
export default AuthReducers;
