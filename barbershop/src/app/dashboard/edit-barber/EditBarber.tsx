'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';

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

const EditBarber: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<BarberFormInput>({
    defaultValues: {
      services: [{ name: '', price: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/barbers/${id}`);
        const data = await response.json();
        setValue('email', data.email);
        setValue('number', data.number);
        setValue('name', data.name);
        setValue('bio', data.bio);
        setValue('services', data.services);
      } catch (error) {
        console.error('Erro ao buscar dados do barbeiro:', error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<BarberFormInput> = async data => {
    try {
      const response = await fetch(`http://localhost:5000/api/barbers/uptotal/${id}`, {
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
        throw new Error(`Erro ao atualizar barbeiro: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Erro ao atualizar dados do barbeiro:', err);
      alert('Ocorreu um erro ao atualizar os dados do barbeiro. Por favor, tente novamente.');
    }
  };

  return (
    <Container>
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
          {...register('password')}
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
            <Button variant="outlined" color="error" onClick={() => remove(index)}>
              <Typography sx={{ fontSize: '0.7em' }}>Remover</Typography>
            </Button>
          </Box>
        ))}

        <Button variant="outlined" color="primary" onClick={() => append({ name: '', price: 0 })}>Adicionar Serviço</Button>

        <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
          Atualizar Barbeiro
        </Button>
      </Box>
    </Container>
  );
};

export default EditBarber;
