"use client";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SideNav from "@/components/SideNav";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();

  const [barbers, setBarbers] = useState<any[]>([]);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openQueue, setOpenQueue] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/barbers/getBarbers"
        );
        const data = await response.json();
        setBarbers(data);
      } catch (error) {
        console.error("Erro ao buscar dados dos barbeiros:", error);
      }
    };

    fetchData();
  }, []);

  interface Service {
    name: string;
    price: number;
  }

  // Define a type for the default values
  const defaultValues = {
    service: "",
    price: 0,
  };

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = React.useState(true);

  const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "services",
  // });

  const handleButtonClick = (barber: any) => {
    setSelectedBarber(barber);

    if (barber.type === "barber") {
      setOpenSchedule(true);
    } else if (barber.type === "queue") {
      setOpenQueue(true);
    }
  };

  const handleCloseSchedule = () => {
    setOpenSchedule(false);
  };

  const handleCloseQueue = () => {
    setOpenQueue(false);
  };

  console.log(!!errors.services);
  console.log(errors.services);

  const onSubmitSchedule = async (data: any) => {
    try {
      console.log(data, "data");
      const response = await fetch(
        `http://localhost:5000/api/appointments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            barberId: selectedBarber._id,
            userId: localStorage.getItem("id"), // Replace with actual user ID
          }),
        }
      );

      if (response.ok) {
        const newAppointment = await response.json();
        alert("Agendamento criado com sucesso");
        setOpenSchedule(false);
      } else {
        const errorData = await response.json();
        throw new Error(`Erro ao criar agendamento: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
      alert(
        "Ocorreu um erro ao criar o agendamento. Por favor, tente novamente."
      );
    }
  };

  const onSubmitQueue = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/barbers/queue-add/${selectedBarber._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('id'), // Replace with actual user ID
        }),
      });

      if (response.ok) {
        alert('Entrou na fila com sucesso');
        setOpenQueue(false);
      } else {
        const errorData = await response.json();
        throw new Error(`Erro ao entrar na fila: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Erro ao entrar na fila:', err);
      alert('Ocorreu um erro ao entrar na fila. Por favor, tente novamente.');
    }
  };

  const onRemoveFromQueue = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/barbers/queue-remove/${selectedBarber._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('id'), // Replace with actual user ID
        }),
      });

      if (response.ok) {
        alert('Removido da fila com sucesso');
        setOpenQueue(false);
      } else {
        const errorData = await response.json();
        throw new Error(`Erro ao remover da fila: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Erro ao remover da fila:', err);
      alert('Ocorreu um erro ao remover da fila. Por favor, tente novamente.');
    }
  };

  const getQueueLength = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/barbers/queue-length/${selectedBarber._id}`);
      if (response.ok) {
        const length = await response.json();
        console.log
        alert(`Comprimento da fila: ${length.queueLength}`);
      } else {
        const errorData = await response.json();
        throw new Error(`Erro ao obter o comprimento da fila: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Erro ao obter o comprimento da fila:', err);
      alert('Ocorreu um erro ao obter o comprimento da fila. Por favor, tente novamente.');
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Barbeiros</StyledTableCell>
              <StyledTableCell align="right">Nome</StyledTableCell>
              <StyledTableCell align="right">
                Número de Telefone
              </StyledTableCell>
              <StyledTableCell colSpan={2} align="center">
                Modalidade de Trabalho
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {barbers.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.number}</StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(row)}
                  >
                    Marcar Horário
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openSchedule}
        onClose={handleCloseSchedule}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Marcar Horário</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitSchedule)}
            noValidate
            sx={{ mt: 3 }}
          >
            <Typography color={"black"}>Data</Typography>
            <Controller
              name="date"
              control={control}
              defaultValue="" // Defina um valor padrão aqui se necessário
              rules={{ required: "Data é obrigatória" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  type="datetime-local"
                  {...field}
                  error={!!errors.date}
                />
              )}
            />

            <Typography color={"black"}>Serviço</Typography>
            <Controller
              name="services"
              control={control}
              defaultValue={selectedBarber?.services?.[0]?.name || ""}
              rules={{ required: "Serviço é obrigatório" }}
              render={({ field }) => (
                <Select
                  labelId="demo-select-barber-type"
                  id="demo-barber-type"
                  fullWidth
                  label="Serviço"
                  error={!!errors.services}
                  {...register("services", {
                    required: "Data é obrigatória",
                  })}
                >
                  {selectedBarber?.services?.map((service: any) => (
                    <MenuItem key={service._id} value={service.name}>
                      {service.name} - R${service.price}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ ml: 2, mt: 2 }}
            >
              Marcar
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSchedule} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openQueue} onClose={handleCloseQueue} maxWidth="sm" fullWidth>
        <DialogTitle>Gerenciar Fila - {selectedBarber?.name}</DialogTitle>
        <DialogContent>
          <Typography color="black">
            Você está prestes a entrar na fila para o barbeiro{' '}
            {selectedBarber?.name}.
          </Typography>
          <Typography color={"black"}>
            Se você confirmar a presença e por acaso não comparecer, essa função poderá
            ser desativada para você por até 1 mês.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitQueue}
              sx={{ mb: 2 }}
            >
              Entrar na Fila
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onRemoveFromQueue}
              sx={{ mb: 2 }}
            >
              Remover da Fila
            </Button>
            <Button
              variant="contained"
              onClick={getQueueLength}
              sx={{ mb: 2 }}
            >
              Obter Comprimento da Fila
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQueue} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
