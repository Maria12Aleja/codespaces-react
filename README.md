# 🛍️ Tienda React

## Descripción

Este proyecto consiste en el desarrollo de una página web tipo tienda utilizando React.

La aplicación consume información de productos desde la API externa Fake Store API y muestra los productos dinámicamente en la interfaz.

## Tecnologías utilizadas

- React
- JavaScript
- Vite
- HTML5
- CSS3
- Bootstrap
- Fake Store API

## API utilizada

Fake Store API:

https://fakestoreapi.com/

Endpoint utilizado:

https://fakestoreapi.com/products?limit=10&offset=0

## Funcionalidades

La aplicación permite:

- Consumir una API externa.
- Utilizar el hook useEffect.
- Utilizar el hook useState.
- Mostrar 10 productos.
- Mostrar el nombre de cada producto.
- Mostrar la descripción.
- Mostrar la categoría.
- Mostrar el precio.
- Mostrar la imagen.
- Utilizar Bootstrap.
- Utilizar CSS personalizado.
- Adaptar la interfaz a diferentes tamaños de pantalla.

## Estructura del proyecto

```text
src/
│
├── components/
│   ├── Tienda.jsx
│   └── Tienda.css
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx