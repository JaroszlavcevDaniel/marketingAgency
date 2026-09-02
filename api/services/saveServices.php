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
        $firstRowStmt = $pdo->query("SELECT id FROM services LIMIT 1");
        $firstRow = $firstRowStmt->fetch(PDO::FETCH_ASSOC);
        if ($firstRow) {
            $targetId = $firstRow['id'];
        }
    }

    if (!$targetId) {
        $sql = "INSERT INTO services (serviceOneNameHu) VALUES (:serviceOneNameHu)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['serviceOneNameHu' => $data['serviceOneNameHu'] ?? '']);

        echo json_encode(["success" => true, "message" => "Új rekord létrehozva"]);
        exit;
    }


    $sql = "
    UPDATE services SET
        
    serviceOneNameHu=:serviceOneNameHu,
    serviceOneNameEn=:serviceOneNameEn,
    serviceOneShortDescriptionHu=:serviceOneShortDescriptionHu,
    serviceOneShortDescriptionEn=:serviceOneShortDescriptionEn,
    serviceOneLongDescriptionOneHu=:serviceOneLongDescriptionOneHu,
    serviceOneLongDescriptionOneEn=:serviceOneLongDescriptionOneEn,
    serviceOneLongDescriptionTwoHu=:serviceOneLongDescriptionTwoHu,
    serviceOneLongDescriptionTwoEn=:serviceOneLongDescriptionTwoEn,

    serviceTwoNameHu=:serviceTwoNameHu,
    serviceTwoNameEn=:serviceTwoNameEn,
    serviceTwoShortDescriptionHu=:serviceTwoShortDescriptionHu,
    serviceTwoShortDescriptionEn=:serviceTwoShortDescriptionEn,
    serviceTwoLongDescriptionOneHu=:serviceTwoLongDescriptionOneHu,
    serviceTwoLongDescriptionOneEn=:serviceTwoLongDescriptionOneEn,
    serviceTwoLongDescriptionTwoHu=:serviceTwoLongDescriptionTwoHu,
    serviceTwoLongDescriptionTwoEn=:serviceTwoLongDescriptionTwoEn,

    serviceThreeNameHu=:serviceThreeNameHu,
    serviceThreeNameEn=:serviceThreeNameEn,
    serviceThreeShortDescriptionHu=:serviceThreeShortDescriptionHu,
    serviceThreeShortDescriptionEn=:serviceThreeShortDescriptionEn,
    serviceThreeLongDescriptionOneHu=:serviceThreeLongDescriptionOneHu,
    serviceThreeLongDescriptionOneEn=:serviceThreeLongDescriptionOneEn,
    serviceThreeLongDescriptionTwoHu=:serviceThreeLongDescriptionTwoHu,
    serviceThreeLongDescriptionTwoEn=:serviceThreeLongDescriptionTwoEn,

    serviceFourNameHu=:serviceFourNameHu,
    serviceFourNameEn=:serviceFourNameEn,
    serviceFourShortDescriptionHu=:serviceFourShortDescriptionHu,
    serviceFourShortDescriptionEn=:serviceFourShortDescriptionEn,
    serviceFourLongDescriptionOneHu=:serviceFourLongDescriptionOneHu,
    serviceFourLongDescriptionOneEn=:serviceFourLongDescriptionOneEn,
    serviceFourLongDescriptionTwoHu=:serviceFourLongDescriptionTwoHu,
    serviceFourLongDescriptionTwoEn=:serviceFourLongDescriptionTwoEn,

    serviceFiveNameHu=:serviceFiveNameHu,
    serviceFiveNameEn=:serviceFiveNameEn,
    serviceFiveShortDescriptionHu=:serviceFiveShortDescriptionHu,
    serviceFiveShortDescriptionEn=:serviceFiveShortDescriptionEn,
    serviceFiveLongDescriptionOneHu=:serviceFiveLongDescriptionOneHu,
    serviceFiveLongDescriptionOneEn=:serviceFiveLongDescriptionOneEn,
    serviceFiveLongDescriptionTwoHu=:serviceFiveLongDescriptionTwoHu,
    serviceFiveLongDescriptionTwoEn=:serviceFiveLongDescriptionTwoEn,

    serviceCTAHu=:serviceCTAHu,
    serviceCTAEn=:serviceCTAEn
     
    WHERE id = :id
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
    "id" => $targetId,
    "serviceOneNameHu"         => $data["serviceOneNameHu"] ?? '',
    "serviceOneNameEn"         => $data["serviceOneNameEn"] ?? '',
    "serviceOneShortDescriptionHu"         => $data["serviceOneShortDescriptionHu"] ?? '',
    "serviceOneShortDescriptionEn"         => $data["serviceOneShortDescriptionEn"] ?? '',
    "serviceOneLongDescriptionOneHu"         => $data["serviceOneLongDescriptionOneHu"] ?? '',
    "serviceOneLongDescriptionOneEn"         => $data["serviceOneLongDescriptionOneEn"] ?? '',
    "serviceOneLongDescriptionTwoHu"         => $data["serviceOneLongDescriptionTwoHu"] ?? '',
    "serviceOneLongDescriptionTwoEn"         => $data["serviceOneLongDescriptionTwoEn"] ?? '',

    "serviceTwoNameHu"         => $data["serviceTwoNameHu"] ?? '',
    "serviceTwoNameEn"         => $data["serviceTwoNameEn"] ?? '',
    "serviceTwoShortDescriptionHu"         => $data["serviceTwoShortDescriptionHu"] ?? '',
    "serviceTwoShortDescriptionEn"         => $data["serviceTwoShortDescriptionEn"] ?? '',
    "serviceTwoLongDescriptionOneHu"         => $data["serviceTwoLongDescriptionOneHu"] ?? '',
    "serviceTwoLongDescriptionOneEn"         => $data["serviceTwoLongDescriptionOneEn"] ?? '',
    "serviceTwoLongDescriptionTwoHu"         => $data["serviceTwoLongDescriptionTwoHu"] ?? '',
    "serviceTwoLongDescriptionTwoEn"         => $data["serviceTwoLongDescriptionTwoEn"] ?? '',

    "serviceThreeNameHu"         => $data["serviceThreeNameHu"] ?? '',
    "serviceThreeNameEn"         => $data["serviceThreeNameEn"] ?? '',
    "serviceThreeShortDescriptionHu"         => $data["serviceThreeShortDescriptionHu"] ?? '',
    "serviceThreeShortDescriptionEn"         => $data["serviceThreeShortDescriptionEn"] ?? '',
    "serviceThreeLongDescriptionOneHu"         => $data["serviceThreeLongDescriptionOneHu"] ?? '',
    "serviceThreeLongDescriptionOneEn"         => $data["serviceThreeLongDescriptionOneEn"] ?? '',
    "serviceThreeLongDescriptionTwoHu"         => $data["serviceThreeLongDescriptionTwoHu"] ?? '',
    "serviceThreeLongDescriptionTwoEn"         => $data["serviceThreeLongDescriptionTwoEn"] ?? '',

    "serviceFourNameHu"         => $data["serviceFourNameHu"] ?? '',
    "serviceFourNameEn"         => $data["serviceFourNameEn"] ?? '',
    "serviceFourShortDescriptionHu"         => $data["serviceFourShortDescriptionHu"] ?? '',
    "serviceFourShortDescriptionEn"         => $data["serviceFourShortDescriptionEn"] ?? '',
    "serviceFourLongDescriptionOneHu"         => $data["serviceFourLongDescriptionOneHu"] ?? '',
    "serviceFourLongDescriptionOneEn"         => $data["serviceFourLongDescriptionOneEn"] ?? '',
    "serviceFourLongDescriptionTwoHu"         => $data["serviceFourLongDescriptionTwoHu"] ?? '',
    "serviceFourLongDescriptionTwoEn"         => $data["serviceFourLongDescriptionTwoEn"] ?? '',

    "serviceFiveNameHu"         => $data["serviceFiveNameHu"] ?? '',
    "serviceFiveNameEn"         => $data["serviceFiveNameEn"] ?? '',
    "serviceFiveShortDescriptionHu"         => $data["serviceFiveShortDescriptionHu"] ?? '',
    "serviceFiveShortDescriptionEn"         => $data["serviceFiveShortDescriptionEn"] ?? '',
    "serviceFiveLongDescriptionOneHu"         => $data["serviceFiveLongDescriptionOneHu"] ?? '',
    "serviceFiveLongDescriptionOneEn"         => $data["serviceFiveLongDescriptionOneEn"] ?? '',
    "serviceFiveLongDescriptionTwoHu"         => $data["serviceFiveLongDescriptionTwoHu"] ?? '',
    "serviceFiveLongDescriptionTwoEn"         => $data["serviceFiveLongDescriptionTwoEn"] ?? '',

    "serviceCTAHu"         => $data["serviceCTAHu"] ?? '',
    "serviceCTAEn"         => $data["serviceCTAEn"] ?? ''
       
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
