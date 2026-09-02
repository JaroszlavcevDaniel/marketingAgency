use market;

CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `serviceOneNameHu` text DEFAULT NULL,
  `serviceOneNameEn` text DEFAULT NULL,
  `serviceOneShortDescriptionHu` text DEFAULT NULL,
  `serviceOneShortDescriptionEn` text DEFAULT NULL,
  `serviceOneLongDescriptionOneHu` text DEFAULT NULL,
  `serviceOneLongDescriptionOneEn` text DEFAULT NULL,
  `serviceOneLongDescriptionTwoHu` text DEFAULT NULL,
  `serviceOneLongDescriptionTwoEn` text DEFAULT NULL,

    `serviceTwoNameHu` text DEFAULT NULL,
  `serviceTwoNameEn` text DEFAULT NULL,
  `serviceTwoShortDescriptionHu` text DEFAULT NULL,
  `serviceTwoShortDescriptionEn` text DEFAULT NULL,
  `serviceTwoLongDescriptionOneHu` text DEFAULT NULL,
  `serviceTwoLongDescriptionOneEn` text DEFAULT NULL,
  `serviceTwoLongDescriptionTwoHu` text DEFAULT NULL,
  `serviceTwoLongDescriptionTwoEn` text DEFAULT NULL,

  `serviceThreeNameHu` text DEFAULT NULL,
  `serviceThreeNameEn` text DEFAULT NULL,
  `serviceThreeShortDescriptionHu` text DEFAULT NULL,
  `serviceThreeShortDescriptionEn` text DEFAULT NULL,
  `serviceThreeLongDescriptionOneHu` text DEFAULT NULL,
  `serviceThreeLongDescriptionOneEn` text DEFAULT NULL,
  `serviceThreeLongDescriptionTwoHu` text DEFAULT NULL,
  `serviceThreeLongDescriptionTwoEn` text DEFAULT NULL,

  `serviceFourNameHu` text DEFAULT NULL,
  `serviceFourNameEn` text DEFAULT NULL,
  `serviceFourShortDescriptionHu` text DEFAULT NULL,
  `serviceFourShortDescriptionEn` text DEFAULT NULL,
  `serviceFourLongDescriptionOneHu` text DEFAULT NULL,
  `serviceFourLongDescriptionOneEn` text DEFAULT NULL,
  `serviceFourLongDescriptionTwoHu` text DEFAULT NULL,
  `serviceFourLongDescriptionTwoEn` text DEFAULT NULL,

    `serviceFiveNameHu` text DEFAULT NULL,
  `serviceFiveNameEn` text DEFAULT NULL,
  `serviceFiveShortDescriptionHu` text DEFAULT NULL,
  `serviceFiveShortDescriptionEn` text DEFAULT NULL,
  `serviceFiveLongDescriptionOneHu` text DEFAULT NULL,
  `serviceFiveLongDescriptionOneEn` text DEFAULT NULL,
  `serviceFiveLongDescriptionTwoHu` text DEFAULT NULL,
  `serviceFiveLongDescriptionTwoEn` text DEFAULT NULL,

   `serviceCTAHu` text DEFAULT NULL,
  `serviceCTAEn` text DEFAULT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;