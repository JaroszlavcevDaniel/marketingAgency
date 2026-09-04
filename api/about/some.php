use market;

CREATE TABLE `about` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aboutTextHu` text DEFAULT NULL,
  `aboutTextEn` text DEFAULT NULL,
    `aboutLongTextHu` text DEFAULT NULL,
  `aboutLongTextEn` text DEFAULT NULL,
   `aboutLongTextTwoHu` text DEFAULT NULL,
  `aboutLongTextTwoEn` text DEFAULT NULL,
  `aboutLittleOneHu` text DEFAULT NULL,
  `aboutLittleOneEn` text DEFAULT NULL,
  `aboutLittleTwoHu` text DEFAULT NULL,
  `aboutLittleTwoEn` text DEFAULT NULL,
  `aboutLittleThreeHu` text DEFAULT NULL,
  `aboutLittleThreeEn` text DEFAULT NULL,
  `aboutLittleFourHu` text DEFAULT NULL,
  `aboutLittleFourEn` text DEFAULT NULL,
 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;