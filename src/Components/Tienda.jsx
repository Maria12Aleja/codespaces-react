import React, { useState, useEffect } from "react";
import "./Tienda.css";

export const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Obtenemos los productos de FakeStore API
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al consultar la API");
        }
        return respuesta.json();
      })
      .then(async (datos) => {
        // 2. Traducimos el título y la descripción de cada producto al español
        const productosTraducidos = await Promise.all(
          datos.map(async (producto) => {
            try {
              // Traducción del título
              const resTitulo = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(producto.title)}&langpair=en|es`
              );
              const dataTitulo = await resTitulo.json();

              // Traducción de la descripción
              const resDesc = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(producto.description)}&langpair=en|es`
              );
              const dataDesc = await resDesc.json();

              return {
                ...producto,
                title: dataTitulo.responseData.translatedText || producto.title,
                description: dataDesc.responseData.translatedText || producto.description,
              };
            } catch (err) {
              return producto; // Si falla la traducción, muestra el texto original
            }
          })
        );

        setProductos(productosTraducidos);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No fue posible cargar los productos.");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando productos y traduciendo al español...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4 text-primary fw-bold">
        Catálogo de Productos - Tienda
      </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {productos.map((producto) => (
          <div className="col" key={producto.id}>
            <div className="card h-100 shadow-sm border-0 product-card">
              <div className="img-container p-3 d-flex align-items-center justify-content-center">
                <img
                  src={producto.image}
                  className="card-img-top product-img"
                  alt={producto.title}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" title={producto.title}>
                  {producto.title}
                </h5>
                <p className="card-text text-muted text-description">
                  {producto.description}
                </p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5 text-success">
                    ${Math.round(producto.price * 4000).toLocaleString("es-CO")} COP
                  </span>
                  <button className="btn btn-outline-primary btn-sm">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};