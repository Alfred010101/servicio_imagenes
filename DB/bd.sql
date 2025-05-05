CREATE DATABASE imagenes_db;

CREATE TABLE imagenes_db.imagen (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  imagen VARCHAR(512) NOT NULL
);

drop database imagenes_db;

select * from imagenes_db.imagen;