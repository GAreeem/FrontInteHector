import React, { useEffect, useState } from "react";
import LayoutCliente from "../CLIENT/LayoutCliente";

const MisReservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const idUser = localStorage.getItem("idUser");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!idUser || !token) return;

    fetch(`http://localhost:8080/reservacion/usuario/${idUser}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener las reservaciones");
        }
        return res.json();
      })
      .then((data) => setReservaciones(data))
      .catch((err) => console.error(err));
  }, [idUser, token]);

  return (
    <LayoutCliente>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Mis Reservaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservaciones.length > 0 ? (
            reservaciones.map((res) => (
              <div
                key={res.idReservacion}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold">{res.nombre}</h3>
                <p className="text-gray-700">{res.descripcion}</p>
                <p className="mt-2">
                  <span className="font-semibold">Status: </span>
                  {res.status ? "Activa" : "Inactiva"}
                </p>
                <p>
                  <span className="font-semibold">Servicio: </span>
                  {res.servicio?.nombre}
                </p>
                <p>
                  <span className="font-semibold">Fecha: </span>
                  {new Date(res.reservationDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Hora: </span>
                  {new Date(res.reservationDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
          ) : (
            <p>No tienes reservaciones</p>
          )}
        </div>
      </div>
    </LayoutCliente>
  );
};

export default MisReservaciones;
