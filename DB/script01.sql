CREATE DATABASE IF NOT EXISTS server_img 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;
    
CREATE TABLE IF NOT EXISTS server_img.product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    image_path VARCHAR(255)
);