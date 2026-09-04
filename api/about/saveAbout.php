<?php

require_once("../cors.php");
require_once("../config.php");

header("Content-Type: application/json; charset=UTF-8");

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Érvénytelen JSON formátum!"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $targetId = $data['id'] ?? null;

    if (!$targetId) {
        $firstRowStmt = $pdo->query("SELECT id FROM about LIMIT 1");
        $firstRow = $firstRowStmt->fetch(PDO::FETCH_ASSOC);
        if ($firstRow) {
            $targetId = $firstRow['id'];
        }
    }

    $params = [
        "aboutTextHu"         => $data["aboutTextHu"] ?? '',
        "aboutTextEn"         => $data["aboutTextEn"] ?? '',
        "aboutLongTextHu"     => $data["aboutLongTextHu"] ?? '',
        "aboutLongTextEn"     => $data["aboutLongTextEn"] ?? '',
        "aboutLongTextTwoHu"  => $data["aboutLongTextTwoHu"] ?? '',
        "aboutLongTextTwoEn"  => $data["aboutLongTextTwoEn"] ?? '',
        "aboutLittleOneHu"    => $data["aboutLittleOneHu"] ?? '',
        "aboutLittleOneEn"    => $data["aboutLittleOneEn"] ?? '',
        "aboutLittleTwoHu"    => $data["aboutLittleTwoHu"] ?? '',
        "aboutLittleTwoEn"    => $data["aboutLittleTwoEn"] ?? '',
        "aboutLittleThreeHu"  => $data["aboutLittleThreeHu"] ?? '',
        "aboutLittleThreeEn"  => $data["aboutLittleThreeEn"] ?? '',
        "aboutLittleFourHu"   => $data["aboutLittleFourHu"] ?? '',
        "aboutLittleFourEn"   => $data["aboutLittleFourEn"] ?? ''
    ];

    if (!$targetId) {
        $sql = "INSERT INTO about (
            aboutTextHu, aboutTextEn, aboutLongTextHu, aboutLongTextEn, 
            aboutLongTextTwoHu, aboutLongTextTwoEn, aboutLittleOneHu, aboutLittleOneEn, 
            aboutLittleTwoHu, aboutLittleTwoEn, aboutLittleThreeHu, aboutLittleThreeEn, 
            aboutLittleFourHu, aboutLittleFourEn
        ) VALUES (
            :aboutTextHu, :aboutTextEn, :aboutLongTextHu, :aboutLongTextEn, 
            :aboutLongTextTwoHu, :aboutLongTextTwoEn, :aboutLittleOneHu, :aboutLittleOneEn, 
            :aboutLittleTwoHu, :aboutLittleTwoEn, :aboutLittleThreeHu, :aboutLittleThreeEn, 
            :aboutLittleFourHu, :aboutLittleFourEn
        )";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $targetId = $pdo->lastInsertId();

        echo json_encode([
            "success" => true, 
            "message" => "Új rekord létrehozva",
            "updated_id" => $targetId
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $sql = "
    UPDATE about SET
        aboutTextHu = :aboutTextHu,
        aboutTextEn = :aboutTextEn,
        aboutLongTextHu = :aboutLongTextHu,
        aboutLongTextEn = :aboutLongTextEn,
        aboutLongTextTwoHu = :aboutLongTextTwoHu,
        aboutLongTextTwoEn = :aboutLongTextTwoEn,
        aboutLittleOneHu = :aboutLittleOneHu,
        aboutLittleOneEn = :aboutLittleOneEn,
        aboutLittleTwoHu = :aboutLittleTwoHu,
        aboutLittleTwoEn = :aboutLittleTwoEn,
        aboutLittleThreeHu = :aboutLittleThreeHu,
        aboutLittleThreeEn = :aboutLittleThreeEn,
        aboutLittleFourHu = :aboutLittleFourHu,
        aboutLittleFourEn = :aboutLittleFourEn
    WHERE id = :id
    ";

    $params['id'] = $targetId;
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode([
        "success" => true,
        "updated_id" => $targetId
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}