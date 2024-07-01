'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Iconify } from "@/components/Iconify";
import { useState, useEffect } from "react";

const links = [
  { name: "Home", href: "/dashboard", icon: "ion:home" },
  {
    name: "Marcar um Horário",
    href: "/dashboard/appointments",
    icon: "heroicons:document-duplicate-solid",
  },
  {
    name: "Horários Marcados",
    href: "/dashboard/scheduled-times",
    icon: "heroicons:document-duplicate-solid",
  },
  {
    name: "Horários Marcados / Barbeiro",
    href: "/dashboard/scheduled-times-barber",
    icon: "heroicons:document-duplicate-solid",
  },
  {
    name: "Usuário",
    href: "/dashboard/users",
    icon: "heroicons:user-group-16-solid",
  },
  {
    name: "Registrar Barbeiro",
    href: "/dashboard/register-barber",
    icon: "heroicons:user-group-16-solid",
  },
  {
    name: "Editar Barbeiros",
    href: "/dashboard/edit-barber",
    icon: "heroicons:user-group-16-solid",
  },
];

export default function NavLinks() {
    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  const pathname = usePathname();

  return (
    <>
    <Box>
      {links.map((link) => (
      <Box key={link.name}>
        <Link href={link.href} passHref>
          <ListItemButton
            sx={{
              // Estilos base
              backgroundColor: "inherit",
              color: "inherit",
              // Expressões ternárias para estilos condicionais
              ...(pathname === link.href && {
                backgroundColor: "sky.100", // Substitua pela cor desejada do tema do Material-UI
                color: "black.600", // Substitua pela cor desejada do tema do Material-UI
              }),
            }}
          >
            <ListItemIcon>
              <Box sx={{ width: "1.5rem" }}>
                <Iconify size={5} icon={link.icon} />
              </Box>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: { xs: "none", md: "block" },
                color: "black",
              }}
              primary={link.name}
              className="hidden md:block"
            />
          </ListItemButton>
        </Link>
        </Box>
      ))}
      </Box>
    </>
  );
}
