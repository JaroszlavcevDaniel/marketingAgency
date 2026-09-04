<?php

require_once("../cors.php");
require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

try {

    $sql = "
    UPDATE navbar SET
        companyName=:companyName,
        emailAddress=:emailAddress,
        servHu=:servHu,
        servEn=:servEn,
        servOneHu=:servOneHu,
        servOneEn=:servOneEn,
        servTwoHu=:servTwoHu,
        servTwoEn=:servTwoEn,
        servThreeHu=:servThreeHu,
        servThreeEn=:servThreeEn,
        servFourHu=:servFourHu,
        servFourEn=:servFourEn,
        servFiveHu=:servFiveHu,
        servFiveEn=:servFiveEn,
        contactHu=:contactHu,
        contactEn=:contactEn,
        facebookLink=:facebookLink,
        instagramLink=:instagramLink,
        tiktokLink=:tiktokLink,
         aboutHu=:aboutHu,
 aboutEn=:aboutEn,
 referenceHu=:referenceHu,
 referenceEn=:referenceEn;
        use market;



    WHERE id=1
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        "companyName"    => $data["companyName"] ?? '',
        "emailAddress"   => $data["emailAddress"] ?? '',
        "servHu"         => $data["servHu"] ?? '',
        "servEn"         => $data["servEn"] ?? '',
        "servOneHu"      => $data["servOneHu"] ?? '',
        "servOneEn"      => $data["servOneEn"] ?? '',
        "servTwoHu"      => $data["servTwoHu"] ?? '',
        "servTwoEn"      => $data["servTwoEn"] ?? '',
        "servThreeHu"    => $data["servThreeHu"] ?? '',
        "servThreeEn"    => $data["servThreeEn"] ?? '',
        "servFourHu"     => $data["servFourHu"] ?? '',
        "servFourEn"     => $data["servFourEn"] ?? '',
        "servFiveHu"     => $data["servFiveHu"] ?? '',
        "servFiveEn"     => $data["servFiveEn"] ?? '',
        "contactHu"      => $data["contactHu"] ?? '',
        "contactEn"      => $data["contactEn"] ?? '',
        "facebookLink"   => $data["facebookLink"] ?? '',
        "instagramLink"  => $data["instagramLink"] ?? '',
        "tiktokLink"     => $data["tiktokLink"] ?? '',

         "aboutHu"     => $data["aboutHu"] ?? '',
          "aboutEn"     => $data["aboutEn"] ?? '',
           "referenceHu"     => $data["referenceHu"] ?? '',
            "referenceEn"     => $data["referenceEn"] ?? '',

    ]);

    echo json_encode([
        "success"=>true
    ]);

} catch(PDOException $e){
    http_response_code(500);
    echo json_encode([
        "success"=>false,
        "message"=>$e->getMessage()
    ]);
}