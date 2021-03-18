-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2021 at 05:46 PM
-- Server version: 10.5.9-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ny_water_consumption`
--

-- --------------------------------------------------------

--
-- Table structure for table `Borough`
--

CREATE TABLE `Borough` (
  `Borough` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Population` int(11) DEFAULT NULL,
  `Size` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `BoroughWater`
--

CREATE TABLE `BoroughWater` (
  `ID` int(11) NOT NULL,
  `Borough` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Consumption` int(11) NOT NULL,
  `Charges` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `City`
--

CREATE TABLE `City` (
  `City` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Population` int(11) DEFAULT NULL,
  `Size` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CityWater`
--

CREATE TABLE `CityWater` (
  `ID` int(11) NOT NULL,
  `City` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Consumption` int(11) NOT NULL,
  `Charges` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `FutureBorough`
--

CREATE TABLE `FutureBorough` (
  `ID` int(11) NOT NULL,
  `Borough` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StartDate` date NOT NULL,
  `EndData` date NOT NULL,
  `Consumption` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `FutureCity`
--

CREATE TABLE `FutureCity` (
  `ID` int(11) NOT NULL,
  `City` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StartDate` date NOT NULL,
  `EndData` date NOT NULL,
  `Consumption` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserWater`
--

CREATE TABLE `UserWater` (
  `ID` int(11) NOT NULL,
  `User` int(11) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Consumption` int(11) NOT NULL,
  `Charges` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `WaterUser`
--

CREATE TABLE `WaterUser` (
  `ID` int(11) NOT NULL,
  `Borough` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Region` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FundingSource` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TDS` int(11) DEFAULT NULL,
  `StreetLocation` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BuildingType` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Borough`
--
ALTER TABLE `Borough`
  ADD PRIMARY KEY (`Borough`,`City`,`Country`),
  ADD KEY `City` (`City`,`Country`);

--
-- Indexes for table `BoroughWater`
--
ALTER TABLE `BoroughWater`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Borough` (`Borough`,`City`,`Country`);

--
-- Indexes for table `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`City`,`Country`);

--
-- Indexes for table `CityWater`
--
ALTER TABLE `CityWater`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `City` (`City`,`Country`);

--
-- Indexes for table `FutureBorough`
--
ALTER TABLE `FutureBorough`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Borough` (`Borough`,`City`,`Country`);

--
-- Indexes for table `FutureCity`
--
ALTER TABLE `FutureCity`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `City` (`City`,`Country`);

--
-- Indexes for table `UserWater`
--
ALTER TABLE `UserWater`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User` (`User`);

--
-- Indexes for table `WaterUser`
--
ALTER TABLE `WaterUser`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Borough` (`Borough`,`City`,`Country`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Borough`
--
ALTER TABLE `Borough`
  ADD CONSTRAINT `Borough_ibfk_1` FOREIGN KEY (`City`,`Country`) REFERENCES `City` (`City`, `Country`);

--
-- Constraints for table `BoroughWater`
--
ALTER TABLE `BoroughWater`
  ADD CONSTRAINT `BoroughWater_ibfk_1` FOREIGN KEY (`Borough`,`City`,`Country`) REFERENCES `Borough` (`Borough`, `City`, `Country`);

--
-- Constraints for table `CityWater`
--
ALTER TABLE `CityWater`
  ADD CONSTRAINT `CityWater_ibfk_1` FOREIGN KEY (`City`,`Country`) REFERENCES `City` (`City`, `Country`);

--
-- Constraints for table `FutureBorough`
--
ALTER TABLE `FutureBorough`
  ADD CONSTRAINT `FutureBorough_ibfk_1` FOREIGN KEY (`Borough`,`City`,`Country`) REFERENCES `Borough` (`Borough`, `City`, `Country`);

--
-- Constraints for table `FutureCity`
--
ALTER TABLE `FutureCity`
  ADD CONSTRAINT `FutureCity_ibfk_1` FOREIGN KEY (`City`,`Country`) REFERENCES `City` (`City`, `Country`);

--
-- Constraints for table `UserWater`
--
ALTER TABLE `UserWater`
  ADD CONSTRAINT `UserWater_ibfk_1` FOREIGN KEY (`User`) REFERENCES `WaterUser` (`ID`);

--
-- Constraints for table `WaterUser`
--
ALTER TABLE `WaterUser`
  ADD CONSTRAINT `WaterUser_ibfk_1` FOREIGN KEY (`Borough`,`City`,`Country`) REFERENCES `Borough` (`Borough`, `City`, `Country`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
