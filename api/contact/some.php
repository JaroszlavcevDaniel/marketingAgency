use market;

CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contactHu` text DEFAULT NULL,
  `contactEn` text DEFAULT NULL,
  `contactMessageHu` text DEFAULT NULL,
  `contactMessageEn` text DEFAULT NULL,
  `contactNameHu` text DEFAULT NULL,
  `contactNameEn` text DEFAULT NULL,
  `contactNamePlaceholderHu` text DEFAULT NULL,
  `contactNamePlaceholderEn` text DEFAULT NULL,
  `contactEmailHu` text DEFAULT NULL,
  `contactEmailEn` text DEFAULT NULL,
  `contactEmailPlaceholderHu` text DEFAULT NULL,
  `contactEmailPlaceholderEn` text DEFAULT NULL,
  `contactPhoneHu` text DEFAULT NULL,
  `contactPhoneEn` text DEFAULT NULL,
  `contactPhonePlaceholderHu` text DEFAULT NULL,
  `contactPhonePlaceholderEn` text DEFAULT NULL,
    `contactMessageHu` text DEFAULT NULL,
  `contactMessageEn` text DEFAULT NULL,
  `contactMessagePlaceholderHu` text DEFAULT NULL,
  `contactMessagePlaceholderEn` text DEFAULT NULL,
   `contactSendBtnHu` text DEFAULT NULL,
    `contactSendBtnEn` text DEFAULT NULL,
   `contactQuestionHu` text DEFAULT NULL,
  `contactQuestionEn` text DEFAULT NULL,
   `contactElerHu` text DEFAULT NULL,
  `contactElerEn` text DEFAULT NULL,
     `contactCompany` text DEFAULT NULL,
  `contactAdress` text DEFAULT NULL,
  `contactPhone` text DEFAULT NULL,
  `contactEmail` text DEFAULT NULL,



  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;