import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FormInput from "../../components/form/FormInput";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "example@empresa.com",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Ingresa tu contraseña",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      required: true,
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      history.push("/home");
      console.log("usuario logueado", user);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        setError("No existe el usuario");
      }
      if(error.code === "auth/wrong-password"){
        setError("Clave inválida")
      }
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>{error && <p>{error}</p>}</div>

      <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
        <CardContent>
          <p>Inicia Sesión</p>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={user[input.name]}
                  onChange={onChange}
                />
              ))}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Iniciar sesión
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid>
            <Typography variant="h6" gutterBottom component="div">
              ¿No tienes cuenta?
              <Link to="/register">Regístrate</Link>
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Login;
