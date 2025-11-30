import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Register Success!");
      router.push("/login");       // ⬅⬅ Redirect ไปหน้า Login
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white px-3 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
