import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  imageFile: File | null;
}

const ImageUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    imageFile: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.imageFile) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("imageFile", formData.imageFile);

    try {
      const response = await fetch("http://localhost:8080/api/imagenes/subir", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const message = await response.text();
      alert("✅ " + message);

      // Limpiar formulario
      setFormData({ name: "", imageFile: null });
      setPreviewUrl(null);
    } catch (error) {
      alert("❌ Hubo un error al enviar los datos.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-lg font-bold">Subir Imagen</h2>

      <div>
        <label className="block font-medium">Nombre:</label>
        <input
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Imagen:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />
      </div>

      {previewUrl && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Vista previa:</p>
          <img src={previewUrl} alt="Preview" width={200} />
        </div>
      )}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default ImageUploadForm;
