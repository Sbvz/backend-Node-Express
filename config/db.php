<?php
// ============================================================
//  Configuración de conexión a MySQL
//  Ajusta host, dbname, user y pass según tu entorno
// ============================================================

define('DB_HOST',    'localhost');
define('DB_NAME',    'rendimiento_academico');
define('DB_USER',    'root');       // ← cambia si usas otro usuario
define('DB_PASS',    '');           // ← tu contraseña de MySQL
define('DB_CHARSET', 'utf8mb4');

$dsn     = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Error de conexión a la base de datos']);
    exit;
}
