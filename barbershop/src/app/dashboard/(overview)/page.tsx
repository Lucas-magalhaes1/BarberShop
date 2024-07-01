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
} from "@mui/material";
import SideNav from "@/components/SideNav";
import React, { useEffect, useState } from "react";
import { Metadata } from "next";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = React.useState(true);

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
        <Typography color={"#000000"} variant="h4" sx={{ textAlign: "center" }}>
          Você logou na barbearia DuSantous
        </Typography>
      </Box>
    </Box>
  );
}
