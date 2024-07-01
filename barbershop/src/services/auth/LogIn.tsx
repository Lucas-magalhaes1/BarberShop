// import { useRouter } from "next/router";
// import { useEffect } from "react";

// export default function LogOff() {
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.localStorage) {
//         localStorage.setItem("username", username);
//         localStorage.setItem("isLoggedIn", 'true');
//       }
//     if (typeof window !== "undefined" && window.localStorage) {
//       localStorage.removeItem("username");
//       localStorage.removeItem("isLoggedIn");
//       router.push('/das');
//     }
//   }, [router]);

//   return null;
// }