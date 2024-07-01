'use client'
import Link from "next/link";
import NavLinks from "./NavLinks"; 
import { Iconify } from "@/components/Iconify";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";
import  { useRouter } from "next/navigation";

export default function SideNav() {
    const [isClient, setIsClient] = useState(false)
    const router = useRouter()
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  function logOff(){
    AuthService().logOut();
    router.push('/')
  }

      const theme = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: 3,
        paddingY: 4,
        md: { paddingX: 2 },
      }}
    >
      <Link href="/" passHref>
        <Box
          sx={{
            marginBottom: 2,
            display: "flex",
            height: 20,
            alignItems: "flex-end",
            justifyContent: "start",
            borderRadius: "md",
            backgroundColor: "blue.600",
            padding: 4,
            md: { height: 40 },
          }}
        >
          <Box sx={{ width: 32, color: "white", md: { width: 40 } }}>
            <Iconify size={5} icon="noto:barber-pole" />
          </Box>
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
          [theme.breakpoints.down('lg')]: {
            flexDirection: "column", gap: 0, spaceY: 2
          }
        }}
      >
        <NavLinks />
        <Box
          sx={{
            display: { md: "block" },
            height: "auto",
            width: "full",
            flexGrow: 1,
            borderRadius: "md",
            backgroundColor: "gray.50",
          }}
        >
           <Button onClick={logOff}
            sx={{
              display: "flex",
              height: 48,
              width: "full",
              flexGrow: 0,
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              borderRadius: "md",
              backgroundColor: "gray.50",
              padding: 3,
              fontSize: "sm",
              fontWeight: "medium",
              "&:hover": { backgroundColor: "sky.100", color: "blue.600" },
              md: {
                flexGrow: 0,
                justifyContent: "start",
                paddingX: 2,
                paddingY: 3,
              },
            }}
          >
            <Iconify size={5} icon="mynaui:power" />
            <Box sx={{ display: { md: "block" } }}>Sair</Box>
          </Button>
        </Box>
         
       
      </Box>
    </Box>
  );
}
