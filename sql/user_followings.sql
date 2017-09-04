DROP TABLE IF EXISTS `user_followings`;

CREATE TABLE `user_followings` (
  `id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `target_id` INT(11) NOT NULL,
  UNIQUE KEY (`user_id`, `target_id`)
);