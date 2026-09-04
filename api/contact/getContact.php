<?php

require_once("../cors.php");
require_once("../config.php");

header("Content-Type: application/json; charset=UTF-8");

try {
    $stmt = $pdo->prepare("
        SELECT *
        FROM contact
        LIMIT 1
    ");

    $stmt->execute();
   
    $contact = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$contact) {
        $contact = new stdClass(); 
    }

    echo json_encode([
        "success" => true,
        "data" => $contact
    ], JSON_UNESCAPED_UNICODE);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}