<?php
session_start();

require_once("../cors.php");
require_once("../config.php");


$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["username"]) || !isset($data["password"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Hiányzó felhasználónév vagy jelszó a kérésben."
    ]);
    exit;
}

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