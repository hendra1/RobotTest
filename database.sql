-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2015 at 11:25 AM
-- Server version: 5.6.14
-- PHP Version: 5.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `robot_test`
--
CREATE DATABASE IF NOT EXISTS `robot_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `robot_test`;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionStart` datetime DEFAULT '0000-00-00 00:00:00',
  `sessionFinish` datetime DEFAULT '0000-00-00 00:00:00',
  `ipAddress` varchar(50) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Truncate table before insert `session`
--

TRUNCATE TABLE `session`;
--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `sessionStart`, `sessionFinish`, `ipAddress`) VALUES
(1, '2014-05-10 00:00:00', '0000-00-00 00:00:00', '192.168.1.10'),
(2, '2015-01-29 00:00:00', '2015-01-29 00:00:00', '::1'),
(3, '2015-01-29 08:45:39', '2015-01-29 08:45:39', '::1'),
(4, '2015-01-29 08:54:21', '2015-01-29 08:54:21', '::1'),
(5, '2015-01-29 08:55:38', '2015-01-29 08:55:38', '::1'),
(6, '2015-01-29 08:56:55', '2015-01-29 08:56:55', '::1'),
(7, '2015-01-29 08:58:22', '2015-01-29 08:58:22', '::1'),
(8, '2015-02-01 16:33:20', '2015-02-01 10:34:46', '::1'),
(9, '2015-02-01 16:33:20', '2015-02-01 10:35:15', '::1'),
(10, '2015-02-01 16:47:29', '2015-02-01 10:49:21', '::1'),
(11, '2015-02-01 16:47:29', '2015-02-01 10:50:39', '::1'),
(12, '2015-02-01 17:01:42', '2015-02-01 11:01:58', '::1'),
(13, '2015-02-01 17:05:24', '2015-02-01 11:05:44', '::1'),
(14, '2015-02-01 17:12:28', '2015-02-01 17:12:35', '::1'),
(15, '2015-02-01 17:19:32', '2015-02-01 17:20:13', '::1'),
(16, '2015-02-01 17:20:46', '2015-02-01 17:24:10', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `sessiondetail`
--

DROP TABLE IF EXISTS `sessiondetail`;
CREATE TABLE IF NOT EXISTS `sessiondetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idSession` int(11) DEFAULT '0',
  `xPosition` int(11) DEFAULT '0',
  `yPosition` int(11) DEFAULT '0',
  `face` varchar(50) DEFAULT '0',
  `createdAt` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Truncate table before insert `sessiondetail`
--

TRUNCATE TABLE `sessiondetail`;
--
-- Dumping data for table `sessiondetail`
--

INSERT INTO `sessiondetail` (`id`, `idSession`, `xPosition`, `yPosition`, `face`, `createdAt`) VALUES
(1, 11, 1, 0, 'east', '2015-02-01 16:50:39'),
(2, 12, 2, 0, 'east', '2015-02-01 17:01:58'),
(3, 13, 0, 2, 'north', '2015-02-01 17:05:44'),
(4, 15, 4, 0, 'north', '2015-02-01 17:20:13'),
(5, 16, 4, 0, 'south', '2015-02-01 17:24:10');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
