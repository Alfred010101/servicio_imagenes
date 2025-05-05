const API_URL = "http://localhost:8080/api/productos";

export const crearProducto = async (
  nombre: string,
  descripcion: string,
  imagen: File
) => {
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("descripcion", descripcion);
  formData.append("imagen", imagen);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Error al crear producto");
  return await response.json();
};

export const obtenerImagen = (id: number) => {
  return `${API_URL}/${id}/imagen`;
};
