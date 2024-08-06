import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

const GoogleLoginButton = () => {
  const { loginWithGoogle } = useAuthContext();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => loginWithGoogle(tokenResponse.access_token),
    onError: () => console.error("Login Failed"),
  });

  return (
    <Button
      onClick={() => handleGoogleLogin()}
      variant="contained"
      fullWidth
      style={{
        position: "relative",
        right: "50%",
        width: "150%",
        height: "38px",
        backgroundColor: "#4285F4",
        color: "white",
        textTransform: "none",
        padding: "10px 0",
        fontSize: "17px",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        style={{ marginRight: "10px", width: "25px", height: "25px" }}
      />
      Acceder con Google
    </Button>
  );
};

export default GoogleLoginButton;
