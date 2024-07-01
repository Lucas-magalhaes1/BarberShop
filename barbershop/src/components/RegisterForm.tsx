'use client'

import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, InputAdornment, Link, Paper, TextField, Typography, useTheme } from "@mui/material";

import React from "react";
import { Iconify } from "@/components/Iconify";
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        BarberShop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function RegisterForm(props: any) {
  const theme = useTheme();

//   if (AuthService.isLoggedIn()) {
//     props.history.push("./dashboard");
//   }

  const{register,handleSubmit} = useForm()
  const onSubmit = async (data: any) => {
    // console.log(data)
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        props.history.push("/dashboard");
      } else {
        const error = await response.json();
        alert(`Register failed: ${error.msg}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Grid container component="main" sx={{
      height: "100vh",
      backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding:'1rem',
          margin: theme.spacing(2, 6)
        }}
      >
          <Avatar sx={{  margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main }}>
            <Iconify size={5} icon="noto:barber-pole" />
          </Avatar>
          
          <Typography component="h1" variant="h5">
            Registrar-se
          </Typography>
          <Box sx={{ width: "100%", marginTop: theme.spacing(1) }}>
          <form onSubmit={handleSubmit((onSubmit))} >
          <TextField
              {...register("number")}
              type="tel"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Número"
              autoFocus
            />
            <TextField
              {...register("email")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              autoFocus
            />
            <TextField
              {...register("name")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nome"
              autoFocus
            />
            <TextField
           {...register("password")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: theme.spacing(3, 0, 2) }}
            >
              Iniciar Sessão
            </Button>
            <Grid container>
              <Grid item>
                <Link href="http://localhost:3000/login" variant="body2">
                  {"Já tem uma conta? Inicie a sessão aqui."}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          </Box>
      </Grid>
    </Grid>
  );
}

export default RegisterForm;
