import React, { useState, useEffect } from "react";

interface Imagen {
  id: number;
  nombre: string;
  imagen: string;
}

const ImageList: React.FC = () => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/imagenes/listar"
        );
        const data = await response.json();
        setImagenes(data);
      } catch (error) {
        console.error("Error al obtener las imágenes", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {imagenes.map((img) => (
        <div key={img.id} className="border rounded shadow p-2 text-center">
          <p className="font-medium">{img.nombre}</p>
          <img
            src={`http://localhost:8080/imgs/${img.imagen}`}
            alt={img.nombre}
            className="w-full h-48 object-contain"
            width={200}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
