<?php
header("Access-Control-Allow-Origin: https://n17.hu");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: text/html; charset=UTF-8");

$host = "localhost";
$dbname = "n17hu000_market";      
$username = "n17hu000_boss";
$password = "UIBfw124214nk";

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Adatbázis kapcsolat sikertelen.",
        "error" => $e->getMessage()
    ]);

    exit;
}