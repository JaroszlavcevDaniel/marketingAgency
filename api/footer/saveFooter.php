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
    // 1. Megkeressük a meglévő rekord ID-ját, ha az Angular nem küldött ID-t
    $targetId = $data['id'] ?? null;

    if (!$targetId) {
        $firstRowStmt = $pdo->query("SELECT id FROM footer LIMIT 1");
        $firstRow = $firstRowStmt->fetch(PDO::FETCH_ASSOC);
        if ($firstRow) {
            $targetId = $firstRow['id'];
        }
    }

    // Ha még egyáltalán nincs rekord a táblában, akkor beszúrjuk (INSERT)
    if (!$targetId) {
        $sql = "INSERT INTO footer (companyNameHu) VALUES (:companyNameHu)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['companyNameHu' => $data['companyNameHu'] ?? '']);

        echo json_encode(["success" => true, "message" => "Új rekord létrehozva"]);
        exit;
    }

    // 2. Ha van rekord, frissítjük az adott ID-jú sort
    $sql = "
    UPDATE footer SET
        companyNameHu = :companyNameHu,
        companyNameEn = :companyNameEn,
        footerDescHu = :footerDescHu,
        footerDescEn = :footerDescEn,
        footerServicesHu = :footerServicesHu,
        footerServicesEn = :footerServicesEn,
        footerServiceOneHu = :footerServiceOneHu,
        footerServiceOneEn = :footerServiceOneEn,
        footerServiceTwoHu = :footerServiceTwoHu,
        footerServiceTwoEn = :footerServiceTwoEn,
        footerServiceThreeHu = :footerServiceThreeHu,
        footerServiceThreeEn = :footerServiceThreeEn,
        footerServiceFourHu = :footerServiceFourHu,
        footerServiceFourEn = :footerServiceFourEn,
        footerServiceFiveHu = :footerServiceFiveHu,
        footerServiceFiveEn = :footerServiceFiveEn,
        footerContactHu = :footerContactHu,
        footerContactEn = :footerContactEn,
        footerWorkTogetherHu = :footerWorkTogetherHu,
        footerWorkTogetherEn = :footerWorkTogetherEn,
        footerCallUsHu = :footerCallUsHu,
        footerCallUsEn = :footerCallUsEn,
        footerEmail = :footerEmail,
        footerPhone = :footerPhone,
        footerInfoHu = :footerInfoHu,
        footerInfoEn = :footerInfoEn,
        footerDataHu = :footerDataHu,
        footerDataEn = :footerDataEn,
        footerASZFHu = :footerASZFHu,
        footerASZFEn = :footerASZFEn
    WHERE id = :id
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        "id"                    => $targetId,
        "companyNameHu"         => $data["companyNameHu"] ?? '',
        "companyNameEn"         => $data["companyNameEn"] ?? '',
        "footerDescHu"          => $data["footerDescHu"] ?? '',
        "footerDescEn"          => $data["footerDescEn"] ?? '',
        "footerServicesHu"      => $data["footerServicesHu"] ?? '',
        "footerServicesEn"      => $data["footerServicesEn"] ?? '',
        "footerServiceOneHu"    => $data["footerServiceOneHu"] ?? '',
        "footerServiceOneEn"    => $data["footerServiceOneEn"] ?? '',
        "footerServiceTwoHu"    => $data["footerServiceTwoHu"] ?? '',
        "footerServiceTwoEn"    => $data["footerServiceTwoEn"] ?? '',
        "footerServiceThreeHu"  => $data["footerServiceThreeHu"] ?? '',
        "footerServiceThreeEn"  => $data["footerServiceThreeEn"] ?? '',
        "footerServiceFourHu"   => $data["footerServiceFourHu"] ?? '',
        "footerServiceFourEn"   => $data["footerServiceFourEn"] ?? '',
        "footerServiceFiveHu"   => $data["footerServiceFiveHu"] ?? '',
        "footerServiceFiveEn"   => $data["footerServiceFiveEn"] ?? '',
        "footerContactHu"       => $data["footerContactHu"] ?? '',
        "footerContactEn"       => $data["footerContactEn"] ?? '',
        "footerWorkTogetherHu"  => $data["footerWorkTogetherHu"] ?? '',
        "footerWorkTogetherEn"  => $data["footerWorkTogetherEn"] ?? '',
        "footerCallUsHu"        => $data["footerCallUsHu"] ?? '',
        "footerCallUsEn"        => $data["footerCallUsEn"] ?? '',
        "footerEmail"           => $data["footerEmail"] ?? '',
        "footerPhone"           => $data["footerPhone"] ?? '',
        "footerInfoHu"          => $data["footerInfoHu"] ?? '',
        "footerInfoEn"          => $data["footerInfoEn"] ?? '',
        "footerDataHu"          => $data["footerDataHu"] ?? '',
        "footerDataEn"          => $data["footerDataEn"] ?? '',
        "footerASZFHu"          => $data["footerASZFHu"] ?? '',
        "footerASZFEn"          => $data["footerASZFEn"] ?? ''
    ]);

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