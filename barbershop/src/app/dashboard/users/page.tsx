'use client'
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface UserFormInput {
  email: string;
  password: string;
  number: string;
}

const EditUser: React.FC = () => {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserFormInput>();
  const userId = localStorage.getItem("id");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/user/${userId}`); // Substitua USER_ID pelo ID real do usuário
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados do usuário: ${response.status}`);
        }
        const userData= await response.json();
        // console.log(userData,'userData')

        // Popula o formulário com as informações do usuário
        setValue('email', userData.user.email);
        setValue('password', userData.user.password);
        setValue('number', userData.user.number.toString());
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      }
    };

    fetchUserData();
  }, [setValue, userId]);

  const onSubmit: SubmitHandler<UserFormInput> = async data => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Atualização bem-sucedida
        router.push('/dashboard');
      } else {
        // Erro na atualização
        const errorData = await response.json();
        throw new Error(`Erro ao atualizar usuário: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Erro ao atualizar dados do usuário:', err);
      alert('Ocorreu um erro ao atualizar os dados do usuário. Por favor, tente novamente.');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fffafc",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
      display="flex"
      height="100vh"
    >
      <Box
        sx={{
          width: "75%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>

          <Typography color={'black'}>email</Typography>
          <TextField
            fullWidth
            margin="normal"
            {...register('email', { required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Formato de email inválido' } })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <Typography color={'black'}>senha</Typography>
          <TextField

            type="password"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Senha é obrigatória' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />

          <Typography color={'black'}>numero</Typography>
          <TextField
            fullWidth
            margin="normal"
            {...register('number', { required: 'Número de telefone é obrigatório', })}
            error={!!errors.number}
            helperText={errors.number ? errors.number.message : ''}
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Atualizar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUser;
