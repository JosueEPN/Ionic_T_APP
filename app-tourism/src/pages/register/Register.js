import { useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import FormInput from '../../components/form/FormInput'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useAuth } from '../../context/AuthContext';


function Register() {
  const { signup } = useAuth();
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
    rol: "",
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
    }
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    try {
      await signup(user.email, user.password, user.rol);     
      
      // <Route component={Home} path="/page/Inbox"></Route> 
      history.push("/home");
      console.log("nuevo usuario registrado", user)

      const res = await fetch(
        "https://sheet.best/api/sheets/6861b095-1928-4975-aadc-d9b88e19dcf8",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      /*if (res.ok) {
        history.replace("/");
      }*/
    } catch (error) {
      console.log(error)
      if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres");
      }
      if(error.code === "auth/email-already-in-use"){
        setError("Usa otro correo")
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
          <p>Regístrate</p>
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
                <FormControl>
                  <label>Rol</label>
                  <Select
                    labelId="rol"
                    name="rol" /*misma propiedad q en el inputs y se guarda en el estado */
                    value={user.rol}
                    label="Rol"
                    onChange={onChange}
                  >
                    <MenuItem value="propietario">Propietario</MenuItem>
                    <MenuItem value="turista">Turista</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid>
            <Typography variant="h6" gutterBottom component="div">
              ¿Ya tienes cuenta?
              <Link to="/login">Iniciar sesión</Link>
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Register