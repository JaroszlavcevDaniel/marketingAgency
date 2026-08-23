<?php

require_once("../cors.php");
require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

try {

    $sql = "
    UPDATE heroOne SET
        ctaTextBigHu=:ctaTextBigHu,
        ctaTextBigEn=:ctaTextBigEn,
        ctaTextSecondHu=:ctaTextSecondHu,
        ctaTextSecondEn=:ctaTextSecondEn,
        ctaTextThirdHu=:ctaTextThirdHu,
        ctaTextThirdEn=:ctaTextThirdEn,
        ctaTextButtonHu=:ctaTextButtonHu,
        ctaTextButtonEn=:ctaTextButtonEn,

        heroTwoHeadlineOneHu=:heroTwoHeadlineOneHu,
        heroTwoHeadlineOneEn=:heroTwoHeadlineOneEn,
        heroTwoHeadlineTwoHu=:heroTwoHeadlineTwoHu,
        heroTwoHeadlineTwoEn=:heroTwoHeadlineTwoEn,

        stepOneHeadlineHu=:stepOneHeadlineHu,
        stepOneHeadlineEn=:stepOneHeadlineEn,
        stepOneTextHu=:stepOneTextHu,
        stepOneTextEn=:stepOneTextEn,

        stepTwoHeadlineHu=:stepTwoHeadlineHu,
        stepTwoHeadlineEn=:stepTwoHeadlineEn,
        stepTwoTextHu=:stepTwoTextHu,
         stepTwoTextEn=:stepTwoTextEn,

          stepThreeHeadlineHu=:stepThreeHeadlineHu,
           stepThreeHeadlineEn=:stepThreeHeadlineEn,
            stepThreeTextHu=:stepThreeTextHu,
             stepThreeTextEn=:stepThreeTextEn,

             stepFourHeadlineHu=:stepFourHeadlineHu,
             stepFourHeadlineEn=:stepFourHeadlineEn,
             stepFourTextHu=:stepFourTextHu,
             stepFourTextEn=:stepFourTextEn,
             
             stepFiveHeadlineHu=:stepFiveHeadlineHu,
             stepFiveHeadlineEn=:stepFiveHeadlineEn,
             stepFiveTextHu=:stepFiveTextHu,
              stepFiveTextEn=:stepFiveTextEn,

               stepSixHeadlineHu=:stepSixHeadlineHu,
                stepSixHeadlineEn=:stepSixHeadlineEn,
                 stepSixTextHu=:stepSixTextHu,
                  stepSixTextEn=:stepSixTextEn,

                heroTwoHelpTextHu=:heroTwoHelpTextHu,
                heroTwoHelpTextEn=:heroTwoHelpTextEn,
                heroTwoHelpTextBackHu=:heroTwoHelpTextBackHu,
                heroTwoHelpTextBackEn=:heroTwoHelpTextBackEn,

                heroTwoCtaHu=:heroTwoCtaHu,
                heroTwoCtaEn=:heroTwoCtaEn

    WHERE id=1
    ";

    $stmt = $pdo->prepare($sql);

    // Kifejezetten csak azokat a mezőket adjuk át, amiket a SQL vár! Így az 'id' nem zavar be.
    $stmt->execute([
        "ctaTextBigHu"    => $data["ctaTextBigHu"] ?? '',
        "ctaTextBigEn"   => $data["ctaTextBigEn"] ?? '',
        "ctaTextSecondHu"         => $data["ctaTextSecondHu"] ?? '',
        "ctaTextSecondEn"         => $data["ctaTextSecondEn"] ?? '',
        "ctaTextThirdHu"      => $data["ctaTextThirdHu"] ?? '',
        "ctaTextThirdEn"      => $data["ctaTextThirdEn"] ?? '',
        "ctaTextButtonHu"      => $data["ctaTextButtonHu"] ?? '',
        "ctaTextButtonEn"      => $data["ctaTextButtonEn"] ?? '',

        "heroTwoHeadlineOneHu"    => $data["heroTwoHeadlineOneHu"] ?? '',
        "heroTwoHeadlineOneEn"    => $data["heroTwoHeadlineOneEn"] ?? '',
        "heroTwoHeadlineTwoHu"     => $data["heroTwoHeadlineTwoHu"] ?? '',
        "heroTwoHeadlineTwoEn"     => $data["heroTwoHeadlineTwoEn"] ?? '',

        "stepOneHeadlineHu"     => $data["stepOneHeadlineHu"] ?? '',
        "stepOneHeadlineEn"     => $data["stepOneHeadlineEn"] ?? '',
        "stepOneTextHu"      => $data["stepOneTextHu"] ?? '',
        "stepOneTextEn"      => $data["stepOneTextEn"] ?? '',

        "stepTwoHeadlineHu"     => $data["stepTwoHeadlineHu"] ?? '',
        "stepTwoHeadlineEn"     => $data["stepTwoHeadlineEn"] ?? '',
        "stepTwoTextHu"      => $data["stepTwoTextHu"] ?? '',
        "stepTwoTextEn"      => $data["stepTwoTextEn"] ?? '',

        "stepThreeHeadlineHu"     => $data["stepThreeHeadlineHu"] ?? '',
        "stepThreeHeadlineEn"     => $data["stepThreeHeadlineEn"] ?? '',
        "stepThreeTextHu"      => $data["stepThreeTextHu"] ?? '',
        "stepThreeTextEn"      => $data["stepThreeTextEn"] ?? '',

        "stepFourHeadlineHu"     => $data["stepFourHeadlineHu"] ?? '',
        "stepFourHeadlineEn"     => $data["stepFourHeadlineEn"] ?? '',
        "stepFourTextHu"      => $data["stepFourTextHu"] ?? '',
        "stepFourTextEn"      => $data["stepFourTextEn"] ?? '',

        "stepFiveHeadlineHu"   => $data["stepFiveHeadlineHu"] ?? '',
        "stepFiveHeadlineEn"  => $data["stepFiveHeadlineEn"] ?? '',
        "stepFiveTextHu"  => $data["stepFiveTextHu"] ?? '',
        "stepFiveTextEn"     => $data["stepFiveTextEn"] ?? '',


        "stepSixHeadlineHu"   => $data["stepSixHeadlineHu"] ?? '',
        "stepSixHeadlineEn"  => $data["stepSixHeadlineEn"] ?? '',
        "stepSixTextHu"  => $data["stepSixTextHu"] ?? '',
        "stepSixTextEn"     => $data["stepSixTextEn"] ?? '',

        "heroTwoHelpTextHu" => $data["heroTwoHelpTextHu"] ?? '',
        "heroTwoHelpTextEn" => $data["heroTwoHelpTextEn"] ?? '',
        "heroTwoHelpTextBackHu" => $data["heroTwoHelpTextBackHu"] ?? '',
        "heroTwoHelpTextBackEn" => $data["heroTwoHelpTextBackEn"] ?? '',

        "heroTwoCtaHu" => $data["heroTwoCtaHu"] ?? '',
        "heroTwoCtaEn" => $data["heroTwoCtaEn"] ?? ''

    ]);

    $refreshStmt = $pdo->prepare("SELECT * FROM heroOne LIMIT 1");
    $refreshStmt->execute();
    $updatedHero = $refreshStmt->fetch();

    echo json_encode([
        "success" => true,
        "data" => $updatedHero // <-- Így az Angular azonnal megkapja az új állapotot!
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
