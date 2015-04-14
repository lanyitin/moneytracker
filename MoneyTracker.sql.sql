-- phpMyAdmin SQL Dump
-- version 3.4.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 04, 2011 at 05:28 AM
-- Server version: 5.1.59
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `MoneyTracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cate`
--

CREATE TABLE IF NOT EXISTS `Cate` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(2) NOT NULL,
  `name` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `RGB` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '#000000',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

--
-- Dumping data for table `Cate`
--

INSERT INTO `Cate` (`id`, `userid`, `name`, `RGB`) VALUES
(9, 4, 'Book', 'rgb(4, 4, 4)'),
(7, 4, 'Foods', 'rgb(224, 7, 224)'),
(8, 4, 'Body washing', '#FACEBA'),
(11, 4, 'Kevin', 'rgb(224, 7, 7)');

-- --------------------------------------------------------

--
-- Table structure for table `Expense`
--

CREATE TABLE IF NOT EXISTS `Expense` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `cateid` int(3) unsigned NOT NULL,
  `userid` int(2) NOT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `day` int(2) NOT NULL,
  `month` int(2) NOT NULL,
  `year` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=81 ;

--
-- Dumping data for table `Expense`
--

INSERT INTO `Expense` (`id`, `cateid`, `userid`, `description`, `amount`, `day`, `month`, `year`) VALUES
(72, 9, 4, '123', 32, 19, 12, 2011),
(74, 9, 4, 'wert', 0, 28, 11, 2011),
(75, 7, 4, 's1', 123, 18, 12, 2011),
(76, 8, 4, 'gift', 123, 19, 12, 2011),
(77, 9, 4, 'hg', 12, 27, 12, 2011),
(78, 9, 4, '432', 123, 13, 12, 2011),
(79, 9, 4, 'asd', 123, 12, 12, 2011),
(80, 7, 4, 'beef', 132, 5, 12, 2011);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `id` int(2) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_identifier` (`email`,`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `email`, `name`) VALUES
(4, 'lanyitin800830@gmail.com', 'lanyitin');
