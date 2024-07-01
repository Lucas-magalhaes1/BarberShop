"use client";

import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SideNav from "@/components/SideNav"; 
import React, { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box display="flex" height="100vh">
      <CssBaseline />
      {isLgDown ? (
        <>
          <Button onClick={toggleDrawer(true)}>Open drawer</Button>
          <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            variant="temporary"
            sx={{
              width: 256,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 256,
                boxSizing: "border-box",
              },
            }}
          >
            <SideNav />
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            backgroundColor:'white',
            width: 256,
            flexShrink: 0,
          }}
        >
          <SideNav />
        </Box>
      )}
      <Box
        flexGrow={1}
        overflow={"auto"}
      >
        {children}
      </Box>
    </Box>
  );
}
