"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ResponsiveAppBar from "@/components/BarberShopBar";
import { Iconify } from "@/components/Iconify";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <ResponsiveAppBar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        maxWidth="xl"
      >
        <Grid container spacing={2}>
          <Grid
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
            item
            xs={12}
          >
            <Box
              sx={{
                width: "75%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                }}
                variant="h1"
              >
                Esse é o melhor gerenciador de barbearia da História.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider
          sx={{
            color: "white",
          }}
        ></Divider>
        <Grid
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center", // Alinha verticalmente ao centro
            justifyContent: "center", // Alinha horizontalmente ao centro
          }}
          container
          spacing={2}
        >
          <Grid
            item
            xs={8}
            sx={{
              paddingLeft: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "0.2rem",
                justifyContent: "flex-start", // Alinha horizontalmente ao centro dentro do Box
                alignItems: "center", // Alinha verticalmente ao centro dentro do Box
              }}
            >
              <Typography sx={{ marginRight: "0.4rem" }}>
                Disponível em
              </Typography>
              <Iconify size={2} icon="ri:instagram-fill" color="white" />
              <Iconify size={2} icon="ic:baseline-facebook" color="white" />
            </Box>
            <Box>
              <Typography sx={{ paddingTop: "1.8rem" }} variant="h3">
                Transfira a aplicação BarberShop
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1.8rem",
              }}
            >
              <Typography variant="body1">
                Reserve experiências inesquecíveis de beleza e bem-estar com o
                aplicativo móvel BarberShop
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#262626",
                  marginTop: "1.8rem",
                  alignSelf: "flex-start",
                }}
                variant="contained"
              >
                Saiba Mais
              </Button>
            </Box>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Alinha verticalmente ao centro dentro do grid item
            }}
            item
            xs={4}
          >
            <Image
              src="/images/phone.png"
              height={512}
              width={350}
              alt="Picture of the author"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </>
  );
}
