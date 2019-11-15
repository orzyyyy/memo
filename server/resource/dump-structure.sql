CREATE DATABASE  IF NOT EXISTS `toy-box` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `toy-box`;
-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: toy-box
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dictionary`
--

DROP TABLE IF EXISTS `dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dictionary` (
  `sign` int(11) DEFAULT NULL,
  `text` varchar(100) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  `description` text,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `goods_in_and_out`
--

DROP TABLE IF EXISTS `goods_in_and_out`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_in_and_out` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '批号。每批只会有一次运输消耗',
  `type` int(11) DEFAULT NULL COMMENT '入库 / 出库',
  `height` decimal(10,2) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `patch` varchar(45) DEFAULT NULL,
  `material_cost` decimal(10,2) DEFAULT NULL COMMENT '材料单价',
  `freight` decimal(10,2) DEFAULT NULL COMMENT '运费',
  `description` varchar(45) DEFAULT NULL,
  `extra_cost` decimal(10,2) DEFAULT NULL COMMENT '其他费用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `material_id` int(11) DEFAULT NULL COMMENT '材料类别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `material_detail`
--

DROP TABLE IF EXISTS `material_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `类别1` int(11) DEFAULT '0' COMMENT 'sign = 1',
  `类别2` int(11) DEFAULT '0',
  `类别3` int(11) DEFAULT '0',
  `类别4` int(11) DEFAULT '0',
  `材质` varchar(45) DEFAULT '0',
  `制作方式` int(11) DEFAULT '0',
  `制作标准` int(11) DEFAULT '0',
  `处理工艺` int(11) DEFAULT '0',
  `单价` decimal(9,2) DEFAULT '0.00',
  `锯费` decimal(9,2) DEFAULT '0.00',
  `长` decimal(9,2) DEFAULT '0.00',
  `宽` decimal(9,2) DEFAULT '0.00',
  `高` decimal(9,2) DEFAULT '0.00',
  `产地` varchar(45) DEFAULT '',
  `库存长度` decimal(9,2) DEFAULT '0.00',
  `库存重量` decimal(9,2) DEFAULT '0.00',
  `卖出方式` int(11) DEFAULT '0',
  `是否校准` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1768 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-15 16:54:29
