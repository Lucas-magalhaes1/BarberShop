'use client'
import React from 'react';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface BarberFormInput {
  email: string;
  password: string;
  number: string;
  name: string;
  bio: string;
  services: {
    name: string;
    price: number;
  }[];
}



const RegisterBarber: React.FC = () => {
  const router = useRouter()
  const { register, handleSubmit, setValue, setError, control, formState: { errors } } = useForm<BarberFormInput>({
    defaultValues: {
        services: [{ name: '', price: 0 }]
      }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services'
  });
  const onSubmit: SubmitHandler<BarberFormInput> = async data => {
    try {
      const response = await fetch(`http://localhost:5000/api/barbers/register`, {
        method: 'POST',
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

          <Typography color={'black'}>Email</Typography>
          <TextField
            fullWidth
            margin="normal"
            {...register('email', { required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Formato de email inválido' } })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <Typography color={'black'}>Senha</Typography>
          <TextField
            type="password"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Senha é obrigatória' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />

          <Typography color={'black'}>Número de telefone</Typography>
          <TextField
            fullWidth
            margin="normal"
            {...register('number', { required: 'Número de telefone é obrigatório' })}
            error={!!errors.number}
            helperText={errors.number ? errors.number.message : ''}
          />

          <Typography color={'black'}>Nome</Typography>
          <TextField
            fullWidth
            margin="normal"
            {...register('name', { required: 'Nome é obrigatório' })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />

          <Typography color={'black'}>Bio</Typography>
          <TextField
            fullWidth
            margin="normal"
            {...register('bio')}
            multiline
            rows={4}
          />

          <Typography color={'black'}>Serviços</Typography>
          {fields.map((service, index) => (
            <Box key={service.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                {...register(`services.${index}.name`, { required: 'Nome do serviço é obrigatório' })}
                error={!!errors.services?.[index]?.name}
                helperText={errors.services?.[index]?.name ? errors?.services[index]?.name?.message : ''}
              />
              <TextField
                fullWidth
                margin="normal"
                type="number"
                {...register(`services.${index}.price`, { required: 'Preço do serviço é obrigatório', min: { value: 0, message: 'Preço deve ser maior ou igual a zero' } })}
                error={!!errors.services?.[index]?.price}
                helperText={errors.services?.[index]?.price ? errors?.services[index]?.price?.message : ''}
              />
              <Button  variant="outlined" color="error" onClick={() => remove(index)}>
                <Typography sx={{
                fontSize:'0.7em'
              }}  >Remover</Typography>
              </Button>
            </Box>
          ))}

        <Button variant="outlined" color="primary" onClick={() => append({ name: '', price: 0 })}>Adicionar Serviço</Button>

          <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
            Registrar Barbeiro
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterBarber;
