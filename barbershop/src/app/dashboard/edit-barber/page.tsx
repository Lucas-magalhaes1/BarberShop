"use client";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import SideNav from "@/components/SideNav";
import { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [barbers, setBarbers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
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

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      number: "",
      name: "",
      bio: "",
      type: "",
      services: [{ name: "", price: 0 }],
      queueLength: 0
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleButtonClick = (barber: any) => {
    //console.log(barber,'barber')
    setSelectedBarber(barber);
    setValue("email", barber.email);
    setValue("password", barber.password);
    setValue("number", barber.number);
    setValue("name", barber.name);
    setValue("bio", barber.bio);
    setValue("type", barber.type);
    setValue("services", barber.services);
    setValue("queueLength", barber.queueLength);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    try {
      // console.log(data,'data')
      // console.log(selectedBarber._id, "selectedBarber");
      const response = await fetch(
        `http://localhost:5000/api/barbers/uptotal/${selectedBarber._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const updatedBarber = await response.json();
        
        setBarbers((prevBarbers) =>
          prevBarbers.map((barber) =>
            barber._id === updatedBarber.barber._id
              ? updatedBarber.barber
              : barber
          )
        );

        setOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(`Erro ao atualizar barbeiro: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Erro ao atualizar dados do barbeiro:", err);
      alert(
        "Ocorreu um erro ao atualizar os dados do barbeiro. Por favor, tente novamente."
      );
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
              <StyledTableRow key={row._id}>
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
                    Editar Barbeiro
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Barbeiro</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 3 }}
          >
            <Typography color={"black"}>Email</Typography>
            <TextField
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de email inválido",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />

            <Typography color={"black"}>Senha</Typography>
            <TextField
              type="password"
              fullWidth
              margin="normal"
              {...register("password", { required: "Senha é obrigatória" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />

            <Typography color={"black"}>Número de telefone</Typography>
            <TextField
              fullWidth
              margin="normal"
              {...register("number", {
                required: "Número de telefone é obrigatório",
              })}
              error={!!errors.number}
              helperText={errors.number ? errors.number.message : ""}
            />

            <Typography color={"black"}>Nome</Typography>
            <TextField
              fullWidth
              margin="normal"
              {...register("name", { required: "Nome é obrigatório" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />

            <Typography color={"black"}>Bio</Typography>
            <TextField
              fullWidth
              margin="normal"
              {...register("bio")}
              multiline
              rows={4}
            />

            <Typography color="black">Tipo de Barbeiro</Typography>
            <Select
              labelId="demo-select-barber-type"
              id="demo-barber-type"
              fullWidth
              label="Tipo"
              defaultValue={{...register("type")}}
              {...register("type", { required: true })} // Integrando com o register do React Hook Form
            >
              <MenuItem value="barber">Barbeiro</MenuItem>
              <MenuItem value="queue">Fila</MenuItem>
            </Select>
            <Typography color={"black"}>Tamanho da Fila</Typography>
            <TextField
              margin="normal"
              {...register("queueLength", {
                pattern: {
                  value: /^[0-9]*$/, // Aceita apenas números
                  message: 'Por favor, digite apenas números.',
                },
              })}
            />
            <Typography color={"black"}>Serviços</Typography>
            {fields.map((service, index) => (
              <Box
                key={service.id}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <TextField
                  fullWidth
                  margin="normal"
                  {...register(`services.${index}.name`, {
                    required: "Nome do serviço é obrigatório",
                  })}
                  error={!!errors.services?.[index]?.name}
                  helperText={
                    errors.services?.[index]?.name
                      ? errors?.services[index]?.name?.message
                      : ""
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="number"
                  {...register(`services.${index}.price`, {
                    required: "Preço do serviço é obrigatório",
                    min: {
                      value: 0,
                      message: "Preço deve ser maior ou igual a zero",
                    },
                  })}
                  error={!!errors.services?.[index]?.price}
                  helperText={
                    errors.services?.[index]?.price
                      ? errors?.services[index]?.price?.message
                      : ""
                  }
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => remove(index)}
                >
                  <Typography sx={{ fontSize: "0.7em" }}>Remover</Typography>
                </Button>
              </Box>
            ))}

            <Button
              variant="outlined"
              color="primary"
              onClick={() => append({ name: "", price: 0 })}
            >
              Adicionar Serviço
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
            >
              Atualizar Barbeiro
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
