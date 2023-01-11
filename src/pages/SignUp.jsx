import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import bg from "../assets/captcha-bg.png";
import verify from "../assets/verify.svg";
import ReplayIcon from "@mui/icons-material/Replay";
// react-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Your Website</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {
  const [captchaValue, setCaptchaValue] = useState("");
  const [correctCaptchaValue, setCorrectCaptchaValue] = useState();
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // schema for validation
  const schema = yup.object().shape({
    firstname: yup.string().required("firstname is required"),
    lastname: yup.string().required("lastname is required"),
    email: yup.string().email().required("email is required"),
    password: yup.string().min(4).max(15).required("password is required"),
    captcha: yup
      .string()
      .required("captcha is required")
      .test("captcha-match", "invalid captcha", function (value) {
        return value === correctCaptchaValue;
      }),
  });

  // useForm from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (data.captcha === correctCaptchaValue) {
      setVerificationSuccess(true);
    }
  };

  function generateCaptcha() {
    // generate a random string of numbers and letters
    const newCaptchaValue = Math.random().toString(36).substring(2, 8);
    setCorrectCaptchaValue(newCaptchaValue);
    setCaptchaValue("");
  }

  // To call the generateCaptcha at the start of the app
  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <>
      {verificationSuccess ? (
        <div className="success-message">
          <img className="verify-svg" src={verify} />
          Verification Success!
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="firstname"
                      name="firstName"
                      // required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      {...register("firstname")}
                    />
                    <p className="error">{errors.firstname?.message}</p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      {...register("lastname")}
                    />
                    <p className="error">{errors.lastname?.message}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...register("email")}
                    />
                    <p className="error">{errors.email?.message}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password")}
                    />
                    <p className="error">{errors.password?.message}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="captcha-area">
                      <div className="captcha-img">
                        <img src={bg} className="a" />
                        <span className="captcha">{correctCaptchaValue}</span>
                        <Button onClick={generateCaptcha}>
                          <ReplayIcon />
                        </Button>
                      </div>
                    </div>
                    <TextField
                      fullWidth
                      name="Captcha"
                      label="Captcha"
                      type="captcha"
                      id="captcha"
                      autoComplete="captcha"
                      {...register("captcha")}
                      value={captchaValue}
                      onChange={(e) => setCaptchaValue(e.target.value)}
                    />
                    <p className="error">{errors.captcha?.message}</p>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default SignUp;
