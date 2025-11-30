import "../styles/globals.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  // โหลด token → decode → เก็บเป็น user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      setUser(payload);
    } catch {
      setUser(null);
    }
  }, []);

  // ฟังก์ชัน logout
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <div>
      {/* Navbar ได้รับ user ที่ decode แล้ว */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* ส่ง user เผื่อ Component ต้องใช้ด้วย */}
      <Component {...pageProps} user={user} />
    </div>
  );
}
