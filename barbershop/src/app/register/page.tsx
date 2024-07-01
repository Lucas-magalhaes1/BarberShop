
import RegisterForm from "@/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Register',
  };
   
  export default function LoginPage() {
    return <RegisterForm />
  }