import { useRouter } from "next/router";

const AuthService = () => {

  const doLogIn = (username:any,id:any) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("username", username);
      localStorage.setItem("id", id);
      localStorage.setItem("isLoggedIn", 'true');
    }
  };
  
  const isLoggedIn = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return Boolean(localStorage.getItem("isLoggedIn"));
    }
    return false;
  };
  
  const logOut = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      localStorage.removeItem("isLoggedIn");
    }
  };

  return { doLogIn, isLoggedIn, logOut };
};

export default AuthService;