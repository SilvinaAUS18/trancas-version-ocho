"use client";

import React, { useEffect, useState } from "react";
import Input from "./Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const FormularioRegistro= () => {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = state;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    // Regular expression pattern for a basic email validation
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!pattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setIsLoading(true);

      const newUser = {
        name,
        email,
        password,
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newUser),
      });

      if (response?.status === 201) {
        setSuccess("Usuario registrado correctamente");
        const res = await signIn('credentials',{
          email: newUser.email,
          password: newUser.password,
          redirect:false,
        })
        console.log(res);
        setTimeout(() => {
          router.push("/panel/noticias", { scroll: false });
        }, 1000);
      } else {
        setError("El correo ya existe");
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleChange = (event) => {
    setError("");
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <section className="container">
      <form
        onSubmit={handleSubmit}
        className="border-2 bg-blue-300 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5"
      >
        <h2 className="text-center text-white font-bold">REGISTRAR USUARIO</h2>

        <Input
          label="Nombre"
          type="text"
          name="name"
          onChange={handleChange}
          value={state.name}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />

        {error && <div className="bg-red-500 text-white">{error}</div>}

        {success && <div className="text-green-700">{success}</div>}

          <div className="mx-auto">
          <button type="submit" className="py-2 w-full bg-blue-800  text-white p-5 rounded-lg">
                    {isLoading ? "Loading..." : "REGISTRAR"}
                  </button>

          </div>
        <p className="text-center">
         Ya Tiene USUARIO? {"==>  "}
          <Link href={"/panel/login"} className="text-primaryColor">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default FormularioRegistro;
