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
        $firstRowStmt = $pdo->query("SELECT id FROM contact LIMIT 1");
        $firstRow = $firstRowStmt->fetch(PDO::FETCH_ASSOC);
        if ($firstRow) {
            $targetId = $firstRow['id'];
        }
    }

    $params = [
        
    "contactHu"         => $data["contactHu"] ?? '',
  "contactEn"         => $data["contactEn"] ?? '',
  "contactMessageHu"         => $data["contactMessageHu"] ?? '',
  "contactMessageEn"         => $data["contactMessageEn"] ?? '',
  "contactNameHu"         => $data["contactNameHu"] ?? '',
  "contactNameEn"         => $data["contactNameEn"] ?? '',
  "contactNamePlaceholderHu"         => $data["contactNamePlaceholderHu"] ?? '',
  "contactNamePlaceholderEn"         => $data["contactNamePlaceholderEn"] ?? '',
  "contactEmailHu"         => $data["contactEmailHu"] ?? '',
  "contactEmailEn"         => $data["contactEmailEn"] ?? '',
  "contactEmailPlaceholderHu"         => $data["contactEmailPlaceholderHu"] ?? '',
  "contactEmailPlaceholderEn"         => $data["contactEmailPlaceholderEn"] ?? '',
  "contactPhoneHu"         => $data["contactPhoneHu"] ?? '',
  "contactPhoneEn"         => $data["contactPhoneEn"] ?? '',
  "contactPhonePlaceholderHu"         => $data["contactPhonePlaceholderHu"] ?? '',
  "contactPhonePlaceholderEn"         => $data["contactPhonePlaceholderEn"] ?? '',
    "contactSendMessageHu"         => $data["contactSendMessageHu"] ?? '',
  "contactSendMessageEn"         => $data["contactSendMessageEn"] ?? '',
  "contactMessagePlaceholderHu"         => $data["contactMessagePlaceholderHu"] ?? '',
  "contactMessagePlaceholderEn"         => $data["contactMessagePlaceholderEn"] ?? '',
   "contactSendBtnHu"         => $data["contactSendBtnHu"] ?? '',
    "contactSendBtnEn"         => $data["contactSendBtnEn"] ?? '',
   "contactQuestionHu"         => $data["contactQuestionHu"] ?? '',
  "contactQuestionEn"         => $data["contactQuestionEn"] ?? '',
   "contactElerHu"         => $data["contactElerHu"] ?? '',
  "contactElerEn"         => $data["contactElerEn"] ?? '',
     "contactCompany"         => $data["contactCompany"] ?? '',
  "contactAdress"         => $data["contactAdress"] ?? '',
  "contactPhone"         => $data["contactPhone"] ?? '',
  "contactEmail"         => $data["contactEmail"] ?? '',

   "sendBtnAfterHu"         => $data["sendBtnAfterHu"] ?? '',
 "sendBtnAfterEn"         => $data["sendBtnAfterEn"] ?? '',
 "acceptRulesHu"         => $data["acceptRulesHu"] ?? '',
 "acceptRulesEn"         => $data["acceptRulesEn"] ?? ''
    ];

    if (!$targetId) {
        $sql = "INSERT INTO contact (
                         contactHu,
  contactEn,
  contactMessageHu,
  contactMessageEn,
  contactNameHu,
  contactNameEn,
  contactNamePlaceholderHu,
  contactNamePlaceholderEn,
  contactEmailHu,
  contactEmailEn,
  contactEmailPlaceholderHu,
  contactEmailPlaceholderEn,
  contactPhoneHu,
  contactPhoneEn,
  contactPhonePlaceholderHu,
  contactPhonePlaceholderEn,
    contactSendMessageHu,
  contactSendMessageEn,
  contactMessagePlaceholderHu,
  contactMessagePlaceholderEn,
   contactSendBtnHu,
    contactSendBtnEn,
   contactQuestionHu,
  contactQuestionEn,
   contactElerHu,
  contactElerEn,
     contactCompany,
  contactAdress,
  contactPhone,
  contactEmail,

   sendBtnAfterHu,     
 sendBtnAfterEn,      
 acceptRulesHu,      
 acceptRulesEn        
        ) VALUES (
    :contactHu,
  :contactEn,
  :contactMessageHu,
  :contactMessageEn,
  :contactNameHu,
  :contactNameEn,
  :contactNamePlaceholderHu,
  :contactNamePlaceholderEn,
  :contactEmailHu,
  :contactEmailEn,
  :contactEmailPlaceholderHu,
  :contactEmailPlaceholderEn,
  :contactPhoneHu,
  :contactPhoneEn,
  :contactPhonePlaceholderHu,
  :contactPhonePlaceholderEn,
    :contactSendMessageHu,
  :contactSendMessageEn,
  :contactMessagePlaceholderHu,
  :contactMessagePlaceholderEn,
   :contactSendBtnHu,
    :contactSendBtnEn,
   :contactQuestionHu,
  :contactQuestionEn,
   :contactElerHu,
  :contactElerEn,
     :contactCompany,
  :contactAdress,
  :contactPhone,
  :contactEmail
    :sendBtnAfterHu,     
 :sendBtnAfterEn,      
 :acceptRulesHu,      
 :acceptRulesEn  
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
    UPDATE contact SET
       
    contactHu = :contactHu,
  contactEn = :contactEn ,
  contactMessageHu = :contactMessageHu ,
  contactMessageEn = :contactMessageEn ,
  contactNameHu = :contactNameHu ,
  contactNameEn = :contactNameEn ,
  contactNamePlaceholderHu = :contactNamePlaceholderHu ,
  contactNamePlaceholderEn = :contactNamePlaceholderEn ,
  contactEmailHu = :contactEmailHu ,
  contactEmailEn = :contactEmailEn ,
  contactEmailPlaceholderHu = :contactEmailPlaceholderHu ,
  contactEmailPlaceholderEn = :contactEmailPlaceholderEn ,
  contactPhoneHu = :contactPhoneHu ,
  contactPhoneEn = :contactPhoneEn ,
  contactPhonePlaceholderHu = :contactPhonePlaceholderHu ,
  contactPhonePlaceholderEn = :contactPhonePlaceholderEn ,
    contactSendMessageHu = :contactSendMessageHu ,
  contactSendMessageEn = :contactSendMessageEn ,
  contactMessagePlaceholderHu = :contactMessagePlaceholderHu ,
  contactMessagePlaceholderEn = :contactMessagePlaceholderEn ,
   contactSendBtnHu = :contactSendBtnHu ,
    contactSendBtnEn = :contactSendBtnEn ,
   contactQuestionHu = :contactQuestionHu ,
  contactQuestionEn = :contactQuestionEn ,
   contactElerHu = :contactElerHu ,
  contactElerEn = :contactElerEn ,
     contactCompany = :contactCompany ,
  contactAdress = :contactAdress ,
  contactPhone = :contactPhone ,
  contactEmail = :contactEmail,
  
    sendBtnAfterHu=:sendBtnAfterHu,     
 sendBtnAfterEn=:sendBtnAfterEn,      
 acceptRulesHu=:acceptRulesHu,      
 acceptRulesEn  =:acceptRulesEn
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