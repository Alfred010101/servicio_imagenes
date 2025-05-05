package com.CrudImagenes.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/imagenes")
public class ImagenController 
{

    private final ImagenRepository imagenRepository;

    @Value("${upload.dir}")
    private String uploadDir;

    public ImagenController(ImagenRepository imagenRepository) {
        this.imagenRepository = imagenRepository;
    }

    @PostMapping("/subir")
    public ResponseEntity<String> subirImagen(
            @RequestParam("name") String nombre,
            @RequestParam("imageFile") MultipartFile imageFile
    ) throws IOException {
        if (imageFile.isEmpty()) {
            return ResponseEntity.badRequest().body("Imagen vacía");
        }

        // Generar nombre único
        String originalFilename = imageFile.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String nuevoNombre = UUID.randomUUID() + extension;

        // Guardar archivo en disco
        File destino = new File(uploadDir + nuevoNombre);
        imageFile.transferTo(destino);

        // Guardar en BD
        Imagen imagen = new Imagen();
        imagen.setNombre(nombre);
        imagen.setImagen(nuevoNombre);
        imagenRepository.save(imagen);

        return ResponseEntity.ok("Imagen guardada con nombre: " + nuevoNombre);
    }

    @GetMapping("/listar")
    public List<Imagen> listarImagenes() 
    {
        return imagenRepository.findAll();
    }
}
