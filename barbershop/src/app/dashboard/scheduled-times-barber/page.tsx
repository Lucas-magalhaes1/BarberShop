"use client";

// ScheduledAppointments.tsx

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useEffect, SetStateAction } from "react";
import moment from "moment";

const ScheduledAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openBarberInfoModal, setOpenBarberInfoModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [barberInfo, setBarberInfo] = useState<any>(null);
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const storageId =  localStorage.getItem("id");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/barber/${storageId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          throw new Error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleOpenUpdateModal = (appointment: SetStateAction<null>) => {
    setSelectedAppointment(appointment);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedAppointment(null);
  };

  const handleOpenDeleteModal = (appointment: SetStateAction<null>) => {
    setSelectedAppointment(appointment);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedAppointment(null);
  };

  const handleOpenBarberInfoModal = async (barberId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/barbers/getBarberById/${barberId}`
      );
      if (response.ok) {
        const data = await response.json();
        setBarberInfo(data);
        setOpenBarberInfoModal(true);
      } else {
        throw new Error("Failed to fetch barber info");
      }
    } catch (error) {
      console.error("Error fetching barber info:", error);
    }
  };

  const handleCloseBarberInfoModal = () => {
    setOpenBarberInfoModal(false);
    setBarberInfo(null);
  };

  const handleUpdateAppointment = async (id: any, newData: {}) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (response.ok) {
        const updatedAppointment = await response.json();
        // Handle success (e.g., update state, show success message)
        console.log("Appointment updated:", updatedAppointment);
        handleCloseUpdateModal();
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to update appointment: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleDeleteAppointment = async (id: any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Handle success (e.g., update state, show success message)
        console.log("Appointment deleted successfully");
        setAppointments((prevAppointments) => 
            prevAppointments.filter((appointment:any) => appointment._id !== id)
          );
        handleCloseDeleteModal();
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to delete appointment: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      // Handle error (e.g., show error message)
    }
  };

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

  return (
    <Box sx={{ marginTop: 4, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Horários Marcados Barbeiro
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="scheduled-appointments-table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Data</StyledTableCell>
              <StyledTableCell>Barbeiro</StyledTableCell>
              <StyledTableCell>Serviço</StyledTableCell>
              <StyledTableCell>Ações</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment: any) => (
              <StyledTableRow key={appointment._id}>
                <StyledTableCell>{appointment.date}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() =>
                      handleOpenBarberInfoModal(appointment.barberId)
                    }
                  >
                    {appointment.barberName}
                  </Button>
                </StyledTableCell>
                <StyledTableCell>{appointment.services}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenUpdateModal(appointment)}
                    sx={{ marginRight: 2 }}
                  >
                    Atualizar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenDeleteModal(appointment)}
                    sx={{ marginRight: 2 }}
                  >
                    Excluir
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Appointment Modal */}
      <Dialog
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Atualizar Agendamento</DialogTitle>
        <DialogContent>
          {/* Update Appointment Form */}
          {/* Replace with your update appointment form fields */}
          <Typography>Formulário de Atualização Aqui</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() =>
              handleUpdateAppointment(selectedAppointment?._id, {
                /* pass updated data here */
              })
            }
            color="primary"
          >
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Appointment Confirmation Modal */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir o agendamento?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteAppointment(selectedAppointment?._id)}
            color="primary"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Barber Info Modal */}
      <Dialog
        open={openBarberInfoModal}
        onClose={handleCloseBarberInfoModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Informações do Barbeiro</DialogTitle>
        <DialogContent>
          {barberInfo ? (
            <Box>
              <Typography>Número: {barberInfo.barber.number}</Typography>
              <Typography>Nome: {barberInfo.barber.name}</Typography>
              <Typography>Bio: {barberInfo.barber.bio}</Typography>
            </Box>
          ) : (
            <Typography>Carregando...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBarberInfoModal} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScheduledAppointments;
