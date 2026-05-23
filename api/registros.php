y<?php
// ============================================================
//  API REST — registros académicos
//  GET  ?uid=xxx   → devuelve todos los registros del usuario
//  POST (body JSON) → guarda un nuevo registro
// ============================================================

// Permite peticiones desde Angular en desarrollo (localhost:4200)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Preflight OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// ── GET: obtener registros de un usuario ──────────────────────
if ($method === 'GET') {

    $uid = trim($_GET['uid'] ?? '');

    if ($uid === '') {
        http_response_code(400);
        echo json_encode(['error' => 'El parámetro uid es obligatorio']);
        exit;
    }

    $stmt = $pdo->prepare(
        'SELECT id, uid, displayName, email, asignatura, nota, creditos,
                DATE_FORMAT(createdAt, "%Y-%m-%dT%H:%i:%s") AS createdAt
         FROM registros
         WHERE uid = ?
         ORDER BY createdAt DESC'
    );
    $stmt->execute([$uid]);
    $registros = $stmt->fetchAll();

    // Convertir tipos numéricos para que Angular los reciba correctamente
    foreach ($registros as &$r) {
        $r['nota']     = (float) $r['nota'];
        $r['creditos'] = (int)   $r['creditos'];
        $r['id']       = (int)   $r['id'];
    }

    echo json_encode($registros);
    exit;
}

// ── POST: guardar un nuevo registro ──────────────────────────
if ($method === 'POST') {

    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Cuerpo JSON inválido']);
        exit;
    }

    // Validar campos obligatorios
    $required = ['uid', 'displayName', 'email', 'asignatura', 'nota', 'creditos'];
    foreach ($required as $campo) {
        if (!array_key_exists($campo, $data) || $data[$campo] === '') {
            http_response_code(400);
            echo json_encode(['error' => "Campo obligatorio faltante: $campo"]);
            exit;
        }
    }

    // Validar rango de nota
    $nota = (float) $data['nota'];
    if ($nota < 0 || $nota > 5) {
        http_response_code(400);
        echo json_encode(['error' => 'La nota debe estar entre 0 y 5']);
        exit;
    }

    $stmt = $pdo->prepare(
        'INSERT INTO registros (uid, displayName, email, asignatura, nota, creditos, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, NOW())'
    );
    $stmt->execute([
        $data['uid'],
        $data['displayName'],
        $data['email'],
        $data['asignatura'],
        $nota,
        (int) $data['creditos'],
    ]);

    $nuevoId = (int) $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode(['id' => $nuevoId, 'message' => 'Registro guardado correctamente']);
    exit;
}

// ── Método no permitido ───────────────────────────────────────
http_response_code(405);
echo json_encode(['error' => 'Método HTTP no permitido']);
