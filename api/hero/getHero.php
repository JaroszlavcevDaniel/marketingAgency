<?php

require_once("../cors.php");
require_once("../config.php");

try {

    $stmt = $pdo->prepare("
        SELECT *
        FROM heroOne
        LIMIT 1
    ");

    $stmt->execute();

    $heroOne = $stmt->fetch();

    echo json_encode([
        "success" => true,
        "data" => $heroOne
    ]);

} catch(PDOException $e){

    http_response_code(500);

    echo json_encode([
        "success"=>false,
        "message"=>$e->getMessage()
    ]);
}