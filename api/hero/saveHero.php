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
                heroTwoCtaEn=:heroTwoCtaEn,

    techOneIcon=:techOneIcon,
    techOneNameHu=:techOneNameHu,
    techOneNameEn=:techOneNameEn,
    techOneDescriptionHu=:techOneDescriptionHu,
    techOneDescriptionEn=:techOneDescriptionEn,

    techTwoIcon=:techTwoIcon,
    techTwoNameHu=:techTwoNameHu,
    techTwoNameEn=:techTwoNameEn,
    techTwoDescriptionHu=:techTwoDescriptionHu,
    techTwoDescriptionEn=:techTwoDescriptionEn,

    techThreeIcon=:techThreeIcon,
    techThreeNameHu=:techThreeNameHu,
    techThreeNameEn=:techThreeNameEn,
    techThreeDescriptionHu=:techThreeDescriptionHu,
    techThreeDescriptionEn=:techThreeDescriptionEn,

    techFourIcon=:techFourIcon,
    techFourNameHu=:techFourNameHu,
    techFourNameEn=:techFourNameEn,
    techFourDescriptionHu=:techFourDescriptionHu,
    techFourDescriptionEn=:techFourDescriptionEn,

    techFiveIcon=:techFiveIcon,
    techFiveNameHu=:techFiveNameHu,
    techFiveNameEn=:techFiveNameEn,
    techFiveDescriptionHu=:techFiveDescriptionHu,
    techFiveDescriptionEn=:techFiveDescriptionEn,

    techSixIcon=:techSixIcon,
    techSixNameHu=:techSixNameHu,
    techSixNameEn=:techSixNameEn,
    techSixDescriptionHu=:techSixDescriptionHu,
    techSixDescriptionEn=:techSixDescriptionEn,

    techSevenIcon=:techSevenIcon,
    techSevenNameHu=:techSevenNameHu,
    techSevenNameEn=:techSevenNameEn,
    techSevenDescriptionHu=:techSevenDescriptionHu,
    techSevenDescriptionEn=:techSevenDescriptionEn,

    techEightIcon=:techEightIcon,
    techEightNameHu=:techEightNameHu,
    techEightNameEn=:techEightNameEn,
    techEightDescriptionHu=:techEightDescriptionHu,
    techEightDescriptionEn=:techEightDescriptionEn,

    techNineIcon=:techNineIcon,
    techNineNameHu=:techNineNameHu,
    techNineNameEn=:techNineNameEn,
    techNineDescriptionHu=:techNineDescriptionHu,
    techNineDescriptionEn=:techNineDescriptionEn,

    techTenIcon=:techTenIcon,
    techTenNameHu=:techTenNameHu,
    techTenNameEn=:techTenNameEn,
    techTenDescriptionHu=:techTenDescriptionHu,
    techTenDescriptionEn=:techTenDescriptionEn,

    techElevenIcon=:techElevenIcon,
    techElevenNameHu=:techElevenNameHu,
    techElevenNameEn=:techElevenNameEn,
    techElevenDescriptionHu=:techElevenDescriptionHu,
    techElevenDescriptionEn=:techElevenDescriptionEn,

    techTwelveIcon=:techTwelveIcon,
    techTwelveNameHu=:techTwelveNameHu,
    techTwelveNameEn=:techTwelveNameEn,
    techTwelveDescriptionHu=:techTwelveDescriptionHu,
    techTwelveDescriptionEn=:techTwelveDescriptionEn,

    techThirteenIcon=:techThirteenIcon,
    techThirteenNameHu=:techThirteenNameHu,
    techThirteenNameEn=:techThirteenNameEn,
    techThirteenDescriptionHu=:techThirteenDescriptionHu,
    techThirteenDescriptionEn=:techThirteenDescriptionEn,

    techFourteenIcon=:techFourteenIcon,
    techFourteenNameHu=:techFourteenNameHu,
    techFourteenNameEn=:techFourteenNameEn,
    techFourteenDescriptionHu=:techFourteenDescriptionHu,
    techFourteenDescriptionEn=:techFourteenDescriptionEn,

    techFifteenIcon=:techFifteenIcon,
    techFifteenNameHu=:techFifteenNameHu,
    techFifteenNameEn=:techFifteenNameEn,
    techFifteenDescriptionHu=:techFifteenDescriptionHu,
    techFifteenDescriptionEn=:techFifteenDescriptionEn,

    techSixteenIcon=:techSixteenIcon,
    techSixteenNameHu=:techSixteenNameHu,
    techSixteenNameEn=:techSixteenNameEn,
    techSixteenDescriptionHu=:techSixteenDescriptionHu,
    techSixteenDescriptionEn=:techSixteenDescriptionEn,

    techSeventeenIcon=:techSeventeenIcon,
    techSeventeenNameHu=:techSeventeenNameHu,
    techSeventeenNameEn=:techSeventeenNameEn,
    techSeventeenDescriptionHu=:techSeventeenDescriptionHu,
    techSeventeenDescriptionEn=:techSeventeenDescriptionEn,

    techEighteenIcon=:techEighteenIcon,
    techEighteenNameHu=:techEighteenNameHu,
    techEighteenNameEn=:techEighteenNameEn,
    techEighteenDescriptionHu=:techEighteenDescriptionHu,
    techEighteenDescriptionEn=:techEighteenDescriptionEn,

    techNineteenIcon=:techNineteenIcon,
    techNineteenNameHu=:techNineteenNameHu,
    techNineteenNameEn=:techNineteenNameEn,
    techNineteenDescriptionHu=:techNineteenDescriptionHu,
    techNineteenDescriptionEn=:techNineteenDescriptionEn,

    techTwentyIcon=:techTwentyIcon,
    techTwentyNameHu=:techTwentyNameHu,
    techTwentyNameEn=:techTwentyNameEn,
    techTwentyDescriptionHu=:techTwentyDescriptionHu,
    techTwentyDescriptionEn=:techTwentyDescriptionEn,

    techTwentyOneIcon=:techTwentyOneIcon,
    techTwentyOneNameHu=:techTwentyOneNameHu,
    techTwentyOneNameEn=:techTwentyOneNameEn,
    techTwentyOneDescriptionHu=:techTwentyOneDescriptionHu,
    techTwentyOneDescriptionEn=:techTwentyOneDescriptionEn,

    techTwentyTwoIcon=:techTwentyTwoIcon,
    techTwentyTwoNameHu=:techTwentyTwoNameHu,
    techTwentyTwoNameEn=:techTwentyTwoNameEn,
    techTwentyTwoDescriptionHu=:techTwentyTwoDescriptionHu,
    techTwentyTwoDescriptionEn=:techTwentyTwoDescriptionEn,

    techTwentyThreeIcon=:techTwentyThreeIcon,
    techTwentyThreeNameHu=:techTwentyThreeNameHu,
    techTwentyThreeNameEn=:techTwentyThreeNameEn,
    techTwentyThreeDescriptionHu=:techTwentyThreeDescriptionHu,
    techTwentyThreeDescriptionEn=:techTwentyThreeDescriptionEn,

    techTwentyFourIcon=:techTwentyFourIcon,
    techTwentyFourNameHu=:techTwentyFourNameHu,
    techTwentyFourNameEn=:techTwentyFourNameEn,
    techTwentyFourDescriptionHu=:techTwentyFourDescriptionHu,
    techTwentyFourDescriptionEn=:techTwentyFourDescriptionEn,

    heroThreeTextHu=:heroThreeTextHu,
    heroThreeTextEn=:heroThreeTextEn,
    heroThreeCtaHu=:heroThreeCtaHu,
    heroThreeCtaEn=:heroThreeCtaEn,

    heroFourBigTextHu=:heroFourBigTextHu,
    heroFourBigTextEn=:heroFourBigTextEn,

    heroFourCardOneTextOneHu=:heroFourCardOneTextOneHu,
    heroFourCardOneTextOneEn=:heroFourCardOneTextOneEn,
     heroFourCardOneTextTwoHu=:heroFourCardOneTextTwoHu,
    heroFourCardOneTextTwoEn=:heroFourCardOneTextTwoEn,

    heroFourCardTwoTextOneHu=:heroFourCardTwoTextOneHu,
    heroFourCardTwoTextOneEn=:heroFourCardTwoTextOneEn,
    heroFourCardTwoTextTwoHu=:heroFourCardTwoTextTwoHu,
    heroFourCardTwoTextTwoEn=:heroFourCardTwoTextTwoEn,

    heroFourCardThreeTextOneHu=:heroFourCardThreeTextOneHu,
    heroFourCardThreeTextOneEn=:heroFourCardThreeTextOneEn,
    heroFourCardThreeTextTwoHu=:heroFourCardThreeTextTwoHu,
    heroFourCardThreeTextTwoEn=:heroFourCardThreeTextTwoEn,

    heroFourCountextBigHu=:heroFourCountextBigHu,
    heroFourCountextBigEn=:heroFourCountextBigEn,
    heroFourCountextSmallHu=:heroFourCountextSmallHu,
    heroFourCountextSmallEn=:heroFourCountextSmallEn,

    heroFourResultBigTextHu=:heroFourResultBigTextHu,
    heroFourResultBigTextEn=:heroFourResultBigTextEn,
    heroFourResultSmallTextOneHu=:heroFourResultSmallTextOneHu,
    heroFourResultSmallTextOneEn=:heroFourResultSmallTextOneEn,
    heroFourResultSmallTextTwoHu=:heroFourResultSmallTextTwoHu,
    heroFourResultSmallTextTwoEn=:heroFourResultSmallTextTwoEn,
    heroFourResultSmallTextThreeHu=:heroFourResultSmallTextThreeHu,
    heroFourResultSmallTextThreeEn=:heroFourResultSmallTextThreeEn,

    heroFourCtaHu=:heroFourCtaHu,
    heroFourCtaEn=:heroFourCtaEn,

    heroFiveBigTextHu=:heroFiveBigTextHu,
    heroFiveBigTextEn=:heroFiveBigTextEn,
    heroFiveSmallTextHu=:heroFiveSmallTextHu,
    heroFiveSmallTextEn=:heroFiveSmallTextEn,
    heroFiveCtaOneHu=:heroFiveCtaOneHu,
    heroFiveCtaOneEn=:heroFiveCtaOneEn,
    heroFiveCtaTwoHu=:heroFiveCtaTwoHu,
    heroFiveCtaTwoEn=:heroFiveCtaTwoEn,

    heroFourSmallTextHu=:heroFourSmallTextHu,
    heroFourSmallTextEn=:heroFourSmallTextEn

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
        "heroTwoCtaEn" => $data["heroTwoCtaEn"] ?? '',

    "techOneIcon" => $data["techOneIcon"] ?? '',
    "techOneNameHu" => $data["techOneNameHu"] ?? '',
    "techOneNameEn" => $data["techOneNameEn"] ?? '',
    "techOneDescriptionHu" => $data["techOneDescriptionHu"] ?? '',
    "techOneDescriptionEn" => $data["techOneDescriptionEn"] ?? '',

    "techTwoIcon" => $data["techTwoIcon"] ?? '',
    "techTwoNameHu" => $data["techTwoNameHu"] ?? '',
    "techTwoNameEn" => $data["techTwoNameEn"] ?? '',
    "techTwoDescriptionHu" => $data["techTwoDescriptionHu"] ?? '',
    "techTwoDescriptionEn" => $data["techTwoDescriptionEn"] ?? '',

    "techThreeIcon" => $data["techThreeIcon"] ?? '',
    "techThreeNameHu" => $data["techThreeNameHu"] ?? '',
    "techThreeNameEn" => $data["techThreeNameEn"] ?? '',
    "techThreeDescriptionHu" => $data["techThreeDescriptionHu"] ?? '',
    "techThreeDescriptionEn" => $data["techThreeDescriptionEn"] ?? '',

    "techFourIcon" => $data["techFourIcon"] ?? '',
    "techFourNameHu" => $data["techFourNameHu"] ?? '',
    "techFourNameEn" => $data["techFourNameEn"] ?? '',
    "techFourDescriptionHu" => $data["techFourDescriptionHu"] ?? '',
   "techFourDescriptionEn" => $data["techFourDescriptionEn"] ?? '',

    "techFiveIcon" => $data["techFiveIcon"] ?? '',
    "techFiveNameHu" => $data["techFiveNameHu"] ?? '',
    "techFiveNameEn" => $data["techFiveNameEn"] ?? '',
    "techFiveDescriptionHu" => $data["techFiveDescriptionHu"] ?? '',
    "techFiveDescriptionEn" => $data["techFiveDescriptionEn"] ?? '',

    "techSixIcon" => $data["techSixIcon"] ?? '',
    "techSixNameHu" => $data["techSixNameHu"] ?? '',
    "techSixNameEn" => $data["techSixNameEn"] ?? '',
    "techSixDescriptionHu" => $data["techSixDescriptionHu"] ?? '',
    "techSixDescriptionEn" => $data["techSixDescriptionEn"] ?? '',

    "techSevenIcon" => $data["techSevenIcon"] ?? '',
    "techSevenNameHu" => $data["techSevenNameHu"] ?? '',
    "techSevenNameEn" => $data["techSevenNameEn"] ?? '',
    "techSevenDescriptionHu" => $data["techSevenDescriptionHu"] ?? '',
    "techSevenDescriptionEn" => $data["techSevenDescriptionEn"] ?? '',

    "techEightIcon" => $data["techEightIcon"] ?? '',
    "techEightNameHu" => $data["techEightNameHu"] ?? '',
    "techEightNameEn" => $data["techEightNameEn"] ?? '',
    "techEightDescriptionHu" => $data["techEightDescriptionHu"] ?? '',
    "techEightDescriptionEn" => $data["techEightDescriptionEn"] ?? '',

    "techNineIcon" => $data["techNineIcon"] ?? '',
    "techNineNameHu" => $data["techNineNameHu"] ?? '',
    "techNineNameEn" => $data["techNineNameEn"] ?? '',
    "techNineDescriptionHu" => $data["techNineDescriptionHu"] ?? '',
    "techNineDescriptionEn" => $data["techNineDescriptionEn"] ?? '',

    "techTenIcon" => $data["techTenIcon"] ?? '',
    "techTenNameHu" => $data["techTenNameHu"] ?? '',
    "techTenNameEn" => $data["techTenNameEn"] ?? '',
    "techTenDescriptionHu" => $data["techTenDescriptionHu"] ?? '',
    "techTenDescriptionEn" => $data["techTenDescriptionEn"] ?? '',

    "techElevenIcon" => $data["techElevenIcon"] ?? '',
    "techElevenNameHu" => $data["techElevenNameHu"] ?? '',
    "techElevenNameEn" => $data["techElevenNameEn"] ?? '',
    "techElevenDescriptionHu" => $data["techElevenDescriptionHu"] ?? '',
    "techElevenDescriptionEn" => $data["techElevenDescriptionEn"] ?? '',

    "techTwelveIcon" => $data["techTwelveIcon"] ?? '',
    "techTwelveNameHu" => $data["techTwelveNameHu"] ?? '',
    "techTwelveNameEn" => $data["techTwelveNameEn"] ?? '',
    "techTwelveDescriptionHu" => $data["techTwelveDescriptionHu"] ?? '',
    "techTwelveDescriptionEn" => $data["techTwelveDescriptionEn"] ?? '',

    "techThirteenIcon" => $data["techThirteenIcon"] ?? '',
    "techThirteenNameHu" => $data["techThirteenNameHu"] ?? '',
    "techThirteenNameEn" => $data["techThirteenNameEn"] ?? '',
    "techThirteenDescriptionHu" => $data["techThirteenDescriptionHu"] ?? '',
    "techThirteenDescriptionEn" => $data["techThirteenDescriptionEn"] ?? '',

    "techFourteenIcon" => $data["techFourteenIcon"] ?? '',
    "techFourteenNameHu" => $data["techFourteenNameHu"] ?? '',
    "techFourteenNameEn" => $data["techFourteenNameEn"] ?? '',
    "techFourteenDescriptionHu" => $data["techFourteenDescriptionHu"] ?? '',
    "techFourteenDescriptionEn" => $data["techFourteenDescriptionEn"] ?? '',

    "techFifteenIcon" => $data["techFifteenIcon"] ?? '',
    "techFifteenNameHu" => $data["techFifteenNameHu"] ?? '',
    "techFifteenNameEn" => $data["techFifteenNameEn"] ?? '',
    "techFifteenDescriptionHu" => $data["techFifteenDescriptionHu"] ?? '',
    "techFifteenDescriptionEn" => $data["techFifteenDescriptionEn"] ?? '',

    "techSixteenIcon" => $data["techSixteenIcon"] ?? '',
    "techSixteenNameHu" => $data["techSixteenNameHu"] ?? '',
    "techSixteenNameEn" => $data["techSixteenNameEn"] ?? '',
    "techSixteenDescriptionHu" => $data["techSixteenDescriptionHu"] ?? '',
    "techSixteenDescriptionEn" => $data["techSixteenDescriptionEn"] ?? '',

    "techSeventeenIcon" => $data["techSeventeenIcon"] ?? '',
    "techSeventeenNameHu" => $data["techSeventeenNameHu"] ?? '',
    "techSeventeenNameEn" => $data["techSeventeenNameEn"] ?? '',
    "techSeventeenDescriptionHu" => $data["techSeventeenDescriptionHu"] ?? '',
    "techSeventeenDescriptionEn" => $data["techSeventeenDescriptionEn"] ?? '',

    "techEighteenIcon" => $data["techEighteenIcon"] ?? '',
    "techEighteenNameHu" => $data["techEighteenNameHu"] ?? '',
    "techEighteenNameEn" => $data["techEighteenNameEn"] ?? '',
    "techEighteenDescriptionHu" => $data["techEighteenDescriptionHu"] ?? '',
    "techEighteenDescriptionEn" => $data["techEighteenDescriptionEn"] ?? '',

    "techNineteenIcon" => $data["techNineteenIcon"] ?? '',
    "techNineteenNameHu" => $data["techNineteenNameHu"] ?? '',
    "techNineteenNameEn" => $data["techNineteenNameEn"] ?? '',
    "techNineteenDescriptionHu" => $data["techNineteenDescriptionHu"] ?? '',
    "techNineteenDescriptionEn" => $data["techNineteenDescriptionEn"] ?? '',

    "techTwentyIcon" => $data["techTwentyIcon"] ?? '',
    "techTwentyNameHu" => $data["techTwentyNameHu"] ?? '',
    "techTwentyNameEn" => $data["techTwentyNameEn"] ?? '',
    "techTwentyDescriptionHu" => $data["techTwentyDescriptionHu"] ?? '',
    "techTwentyDescriptionEn" => $data["techTwentyDescriptionEn"] ?? '',

    "techTwentyOneIcon" => $data["techTwentyOneIcon"] ?? '',
    "techTwentyOneNameHu" => $data["techTwentyOneNameHu"] ?? '',
    "techTwentyOneNameEn" => $data["techTwentyOneNameEn"] ?? '',
    "techTwentyOneDescriptionHu" => $data["techTwentyOneDescriptionHu"] ?? '',
    "techTwentyOneDescriptionEn" => $data["techTwentyOneDescriptionEn"] ?? '',

    "techTwentyTwoIcon" => $data["techTwentyTwoIcon"] ?? '',
    "techTwentyTwoNameHu" => $data["techTwentyTwoNameHu"] ?? '',
    "techTwentyTwoNameEn" => $data["techTwentyTwoNameEn"] ?? '',
    "techTwentyTwoDescriptionHu" => $data["techTwentyTwoDescriptionHu"] ?? '',
    "techTwentyTwoDescriptionEn" => $data["techTwentyTwoDescriptionEn"] ?? '',

    "techTwentyThreeIcon" => $data["techTwentyThreeIcon"] ?? '',
    "techTwentyThreeNameHu" => $data["techTwentyThreeNameHu"] ?? '',
    "techTwentyThreeNameEn" => $data["techTwentyThreeNameEn"] ?? '',
    "techTwentyThreeDescriptionHu" => $data["techTwentyThreeDescriptionHu"] ?? '',
    "techTwentyThreeDescriptionEn" => $data["techTwentyThreeDescriptionEn"] ?? '',

    "techTwentyFourIcon" => $data["techTwentyFourIcon"] ?? '',
    "techTwentyFourNameHu" => $data["techTwentyFourNameHu"] ?? '',
    "techTwentyFourNameEn" => $data["techTwentyFourNameEn"] ?? '',
    "techTwentyFourDescriptionHu" => $data["techTwentyFourDescriptionHu"] ?? '',
    "techTwentyFourDescriptionEn" => $data["techTwentyFourDescriptionEn"] ?? '',

    "heroThreeTextHu" => $data["heroThreeTextHu"] ?? '',
    "heroThreeTextEn" => $data["heroThreeTextEn"] ?? '',
    "heroThreeCtaHu" => $data["heroThreeCtaHu"] ?? '',
    "heroThreeCtaEn" => $data["heroThreeCtaEn"] ?? '',

    "heroFourBigTextHu" => $data["heroFourBigTextHu"] ?? '',
    "heroFourBigTextEn" => $data["heroFourBigTextEn"] ?? '',

    "heroFourCardOneTextOneHu" => $data["heroFourCardOneTextOneHu"] ?? '',
    "heroFourCardOneTextOneEn" => $data["heroFourCardOneTextOneEn"] ?? '',
     "heroFourCardOneTextTwoHu" => $data["heroFourCardOneTextTwoHu"] ?? '',
    "heroFourCardOneTextTwoEn" => $data["heroFourCardOneTextTwoEn"] ?? '',

    "heroFourCardTwoTextOneHu" => $data["heroFourCardTwoTextOneHu"] ?? '',
    "heroFourCardTwoTextOneEn" => $data["heroFourCardTwoTextOneEn"] ?? '',
    "heroFourCardTwoTextTwoHu" => $data["heroFourCardTwoTextTwoHu"] ?? '',
    "heroFourCardTwoTextTwoEn" => $data["heroFourCardTwoTextTwoEn"] ?? '',

    "heroFourCardThreeTextOneHu" => $data["heroFourCardThreeTextOneHu"] ?? '',
    "heroFourCardThreeTextOneEn" => $data["heroFourCardThreeTextOneEn"] ?? '',
    "heroFourCardThreeTextTwoHu" => $data["heroFourCardThreeTextTwoHu"] ?? '',
    "heroFourCardThreeTextTwoEn" => $data["heroFourCardThreeTextTwoEn"] ?? '',

    "heroFourCountextBigHu" => $data["heroFourCountextBigHu"] ?? '',
    "heroFourCountextBigEn" => $data["heroFourCountextBigEn"] ?? '',
    "heroFourCountextSmallHu" => $data["heroFourCountextSmallHu"] ?? '',
    "heroFourCountextSmallEn" => $data["heroFourCountextSmallEn"] ?? '',

    "heroFourResultBigTextHu" => $data["heroFourResultBigTextHu"] ?? '',
    "heroFourResultBigTextEn" => $data["heroFourResultBigTextEn"] ?? '',
    "heroFourResultSmallTextOneHu" => $data["heroFourResultSmallTextOneHu"] ?? '',
    "heroFourResultSmallTextOneEn" => $data["heroFourResultSmallTextOneEn"] ?? '',
    "heroFourResultSmallTextTwoHu" => $data["heroFourResultSmallTextTwoHu"] ?? '',
    "heroFourResultSmallTextTwoEn" => $data["heroFourResultSmallTextTwoEn"] ?? '',
    "heroFourResultSmallTextThreeHu" => $data["heroFourResultSmallTextThreeHu"] ?? '',
    "heroFourResultSmallTextThreeEn" => $data["heroFourResultSmallTextThreeEn"] ?? '',

    "heroFourCtaHu" => $data["heroFourCtaHu"] ?? '',
    "heroFourCtaEn" => $data["heroFourCtaEn"] ?? '',

    "heroFiveBigTextHu" => $data["heroFiveBigTextHu"] ?? '',
    "heroFiveBigTextEn" => $data["heroFiveBigTextEn"] ?? '',
    "heroFiveSmallTextHu" => $data["heroFiveSmallTextHu"] ?? '',
    "heroFiveSmallTextEn" => $data["heroFiveSmallTextEn"] ?? '',
    "heroFiveCtaOneHu" => $data["heroFiveCtaOneHu"] ?? '',
    "heroFiveCtaOneEn" => $data["heroFiveCtaOneEn"] ?? '',
    "heroFiveCtaTwoHu" => $data["heroFiveCtaTwoHu"] ?? '',
    "heroFiveCtaTwoEn" => $data["heroFiveCtaTwoEn"] ?? '',
        "heroFourSmallTextHu" => $data["heroFourSmallTextHu"] ?? '',
            "heroFourSmallTextEn" => $data["heroFourSmallTextEn"] ?? ''


    ]);

    $refreshStmt = $pdo->prepare("SELECT * FROM heroOne LIMIT 1");
    $refreshStmt->execute();
    $updatedHero = $refreshStmt->fetch();

    echo json_encode([
        "success" => true,
        "data" => $updatedHero 
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
