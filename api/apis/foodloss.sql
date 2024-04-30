-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 03, 2024 at 06:24 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodloss`
--

-- --------------------------------------------------------

--
-- Table structure for table `claimed_items`
--

CREATE TABLE `claimed_items` (
  `claim_id` int(11) NOT NULL,
  `food_item_id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `interaction_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_items`
--

CREATE TABLE `food_items` (
  `itemid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `start_time` time DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `interaction_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `uid` int(11) NOT NULL,
  `category` enum('Fruits','Vegetables','Cooking Oils','Carbohydrates','Proteins','Others') NOT NULL,
  `item_qty` int(5) NOT NULL,
  `endtime` time NOT NULL,
  `expiry_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_status`
--

CREATE TABLE `food_status` (
  `sid` int(11) NOT NULL,
  `sname` varchar(50) NOT NULL DEFAULT 'Expired'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_status`
--

INSERT INTO `food_status` (`sid`, `sname`) VALUES
(1, 'Expired'),
(2, 'Not Expired'),
(3, 'Claimed');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `image_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_size` int(11) NOT NULL,
  `file_type` varchar(50) NOT NULL,
  `upload_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `rid` int(11) NOT NULL,
  `rname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`rid`, `rname`) VALUES
(1, 'Admin'),
(2, 'Receiver'),
(3, 'Sender');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `tel` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `status` enum('sender','receiver') NOT NULL DEFAULT 'sender'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `rid`, `fname`, `lname`, `gender`, `tel`, `email`, `passwd`, `status`) VALUES
(8, 3, 'Sandra', 'Nettey', 'female', '+123456789', 's@gmail.com', '$2y$10$BHr80.lR.aFKX6yy0Qvl1OX3dE2DHwp0.YX3HZeVQQS0o/OHwMsJS', 'sender'),
(9, 3, 'cyrus', 'nettey', 'female', '0244161161', 'cyrus@gmail.com', '$2y$10$piIwbxC2QVwliVvOSy45buj0uGBh7OOupAiL8UY787YMD0nRl6rja', 'sender');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `claimed_items`
--
ALTER TABLE `claimed_items`
  ADD PRIMARY KEY (`claim_id`),
  ADD KEY `fk_claimed_food_item` (`food_item_id`),
  ADD KEY `fk_claimed_user` (`uid`);

--
-- Indexes for table `food_items`
--
ALTER TABLE `food_items`
  ADD PRIMARY KEY (`itemid`),
  ADD KEY `rid` (`rid`),
  ADD KEY `sid` (`sid`),
  ADD KEY `food_items_ibfk_3` (`image_id`),
  ADD KEY `fk_food_user` (`uid`);

--
-- Indexes for table `food_status`
--
ALTER TABLE `food_status`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`rid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `rid` (`rid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `claimed_items`
--
ALTER TABLE `claimed_items`
  MODIFY `claim_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_items`
--
ALTER TABLE `food_items`
  MODIFY `itemid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_status`
--
ALTER TABLE `food_status`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `claimed_items`
--
ALTER TABLE `claimed_items`
  ADD CONSTRAINT `fk_claimed_food_item` FOREIGN KEY (`food_item_id`) REFERENCES `food_items` (`itemid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_claimed_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `food_items`
--
ALTER TABLE `food_items`
  ADD CONSTRAINT `fk_food_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `food_items_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `food_items_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `food_status` (`sid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `food_items_ibfk_3` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
