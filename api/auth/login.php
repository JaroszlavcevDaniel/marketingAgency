<?php
session_start();

require_once("../cors.php");
require_once("../config.php");

// JSON adatok beolvasása
$data = json_decode(file_get_contents("php://input"), true);

// BIZTONSÁGI ELLENŐRZÉS: Ha üresen jönne az adat az Angulartól
if (!$data || !isset($data["username"]) || !isset($data["password"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Hiányzó felhasználónév vagy jelszó a kérésben."
    ]);
    exit;
}

// Innen mehet tovább a te kódod...
$stmt = $pdo->prepare("
    SELECT *
    FROM admin
    WHERE username = :username
    LIMIT 1
");

$stmt->execute([
    "username" => $data["username"]
]);

$user = $stmt->fetch();

if (!$user) {
    echo json_encode([
        "success" => false,
        "message" => "Hibás felhasználónév vagy jelszó. (Nincs ilyen felhasználó)"
    ]);
    exit;
}

if (!password_verify($data["password"], $user["password"])) {
    echo json_encode([
        "success" => false,
        "message" => "Hibás felhasználónév vagy jelszó. (Jelszó nem egyezik)"
    ]);
    exit;
}

$_SESSION["admin"] = true;
echo json_encode([
    "success" => true
]);