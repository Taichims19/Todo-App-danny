import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const googleLogin = useGoogleLogin({
  flow: "auth-code",
  onSuccess: async (codeResponse) => {
    console.log(codeResponse);
    try {
      const response = await axios.post("http://localhost:3001/auth/google", {
        code: codeResponse.code,
      });
      console.log(response.data);
      // Maneja la respuesta del servidor (por ejemplo, guarda el token en el contexto o en el localStorage)
    } catch (error) {
      console.error("Error en la autenticación con Google:", error);
    }
  },
  onError: (errorResponse) =>
    console.error("Error en el flujo de Google:", errorResponse),
});
