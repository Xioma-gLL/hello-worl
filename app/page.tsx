"use client";

import { useState, useEffect } from "react";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  emoji: string;
};

const todosLosProductos: Producto[] = [
  { id: 1, nombre: "Laptop Lenovo", precio: 3500, categoria: "Electrónica", emoji: "💻" },
  { id: 2, nombre: "Celular Samsung", precio: 1200, categoria: "Electrónica", emoji: "📱" },
  { id: 3, nombre: "Audífonos Sony", precio: 450, categoria: "Electrónica", emoji: "🎧" },
  { id: 4, nombre: "Smartwatch Xiaomi", precio: 320, categoria: "Electrónica", emoji: "⌚" },
  { id: 5, nombre: "Camisa Polo", precio: 80, categoria: "Ropa", emoji: "👕" },
  { id: 6, nombre: "Pantalón Jeans", precio: 120, categoria: "Ropa", emoji: "👖" },
  { id: 7, nombre: "Zapatillas Nike", precio: 350, categoria: "Ropa", emoji: "👟" },
  { id: 8, nombre: "Gorra Adidas", precio: 65, categoria: "Ropa", emoji: "🧢" },
  { id: 9, nombre: "Mesa de Escritorio", precio: 650, categoria: "Muebles", emoji: "🪑" },
  { id: 10, nombre: "Silla Gamer", precio: 900, categoria: "Muebles", emoji: "🖥️" },
  { id: 11, nombre: "Estante Modular", precio: 480, categoria: "Muebles", emoji: "📦" },
  { id: 12, nombre: "Lámpara LED", precio: 150, categoria: "Muebles", emoji: "💡" },
];

const categorias = ["Todos", "Electrónica", "Ropa", "Muebles"];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Todos: { bg: "#1a1a2e", text: "#ffffff", border: "#1a1a2e" },
  Electrónica: { bg: "#6c63ff", text: "#ffffff", border: "#6c63ff" },
  Ropa: { bg: "#ff6584", text: "#ffffff", border: "#ff6584" },
  Muebles: { bg: "#43b89c", text: "#ffffff", border: "#43b89c" },
};

const badgeColors: Record<string, { bg: string; text: string }> = {
  Electrónica: { bg: "#ede9ff", text: "#6c63ff" },
  Ropa: { bg: "#ffe9ee", text: "#ff6584" },
  Muebles: { bg: "#e6f9f5", text: "#43b89c" },
};

export default function TareaPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("Todos");
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>(todosLosProductos);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => {
      if (categoriaSeleccionada === "Todos") {
        setProductosFiltrados(todosLosProductos);
      } else {
        setProductosFiltrados(
          todosLosProductos.filter((p) => p.categoria === categoriaSeleccionada)
        );
      }
      setAnimating(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [categoriaSeleccionada]);

  const total = productosFiltrados.reduce((acc, p) => acc + p.precio, 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        padding: "2.5rem 1.5rem",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#fff",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            background: "linear-gradient(90deg, #a78bfa, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          🛍️ Tienda Online
        </h1>
        <p style={{ color: "#a0aec0", marginTop: "0.5rem", fontSize: "1rem" }}>
          Filtra y explora nuestros productos
        </p>
      </div>

      {/* Filtros */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {categorias.map((cat) => {
          const activo = categoriaSeleccionada === cat;
          const col = categoryColors[cat];
          return (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              style={{
                padding: "0.55rem 1.4rem",
                borderRadius: "999px",
                border: `2px solid ${col.border}`,
                backgroundColor: activo ? col.bg : "transparent",
                color: activo ? col.text : "#ccc",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: activo ? "scale(1.07)" : "scale(1)",
                boxShadow: activo ? `0 4px 20px ${col.bg}88` : "none",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Productos", valor: productosFiltrados.length },
          { label: "Total S/.", valor: `S/. ${total.toLocaleString()}` },
        ].map(({ label, valor }) => (
          <div
            key={label}
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              padding: "0.75rem 1.5rem",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#a0aec0", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</p>
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>{valor}</p>
          </div>
        ))}
      </div>

      {/* Grid de productos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
          gap: "1.25rem",
          maxWidth: "1000px",
          margin: "0 auto",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        {productosFiltrados.map((producto) => {
          const badge = badgeColors[producto.categoria];
          return (
            <div
              key={producto.id}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "1.25rem",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 30px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Emoji */}
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                {producto.emoji}
              </div>

              {/* Nombre */}
              <h3 style={{ margin: "0 0 0.4rem", fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
                {producto.nombre}
              </h3>

              {/* Precio */}
              <p style={{ margin: "0 0 0.75rem", fontSize: "1.2rem", fontWeight: 800, color: "#a78bfa" }}>
                S/. {producto.precio.toLocaleString()}
              </p>

              {/* Badge categoría */}
              <span
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  backgroundColor: badge.bg,
                  color: badge.text,
                }}
              >
                {producto.categoria}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p style={{ textAlign: "center", color: "#4a5568", marginTop: "3rem", fontSize: "0.8rem" }}>
        Laboratorio N°9 — Next.js CSR · useState & useEffect
      </p>
    </main>
  );
}