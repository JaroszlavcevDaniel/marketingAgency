<?php

require_once("../cors.php");
require_once("../config.php");

header("Content-Type: application/json; charset=UTF-8");

try {
    $stmt = $pdo->prepare("
        SELECT *
        FROM footer
        LIMIT 1
    ");

    $stmt->execute();
    $footer = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$footer) {
        $footer = new stdClass(); 
    }

    echo json_encode([
        "success" => true,
        "data" => $footer
    ], JSON_UNESCAPED_UNICODE);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}