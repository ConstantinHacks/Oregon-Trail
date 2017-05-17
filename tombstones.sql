-- phpMyAdmin SQL Dump
-- version 4.0.10.19
-- https://www.phpmyadmin.net
--
-- Host: studentdb-maria.gl.umbc.edu
-- Generation Time: May 17, 2017 at 03:36 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 5.4.44

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `koehler1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tombstones`
--

CREATE TABLE IF NOT EXISTS `tombstones` (
  `count` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DOD` date NOT NULL,
  `name` text NOT NULL,
  `mile` smallint(6) NOT NULL,
  `message` varchar(140) DEFAULT NULL,
  PRIMARY KEY (`count`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tombstones`
--

INSERT INTO `tombstones` (`count`, `timestamp`, `DOD`, `name`, `mile`, `message`) VALUES
(1, '2017-04-12 18:41:48', '1848-05-14', 'Jacob', 4, 'Nobody Loved Him'),
(2, '2017-04-12 18:41:48', '1848-05-28', 'Kwame', 9, 'Ball was life'),
(3, '2017-04-12 18:41:48', '1848-05-28', 'Bob', 9, 'haga');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
