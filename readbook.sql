/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : readbook

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-03 09:18:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for book_info
-- ----------------------------
DROP TABLE IF EXISTS `book_info`;
CREATE TABLE `book_info` (
  `id` int(11) NOT NULL COMMENT '用户ID',
  `book_id` int(11) DEFAULT NULL COMMENT '书籍ID',
  `isPrivate` int(11) DEFAULT NULL COMMENT '是否私密阅读',
  `read_length` datetime DEFAULT NULL COMMENT '阅读时长',
  ` last_chapter` varchar(255) DEFAULT NULL COMMENT '上次阅读到的章节',
  `last_time` datetime DEFAULT NULL COMMENT '上次阅读时间',
  `isFinished` int(11) DEFAULT NULL COMMENT '是否阅读完',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book_info
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(13) NOT NULL COMMENT '用户ID',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `pwd` varchar(255) NOT NULL COMMENT '密码',
  `status` int(11) DEFAULT NULL COMMENT '是否登录',
  `last_login` int(11) DEFAULT NULL COMMENT '上次登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '141515454', '00dbc41a06d497bc221879997c9ec9', '1', '1519781617');
INSERT INTO `user` VALUES ('2', '141545642', '00dbc41a06d497bc221879997c9ec9', '0', null);

-- ----------------------------
-- Table structure for user_books
-- ----------------------------
DROP TABLE IF EXISTS `user_books`;
CREATE TABLE `user_books` (
  `id` int(11) NOT NULL COMMENT '用户ID',
  `bookshelf_id` longtext COMMENT '书架id集合',
  `readRecord_id` longtext COMMENT '阅读过的书籍id集合',
  `read_time` bigint(20) DEFAULT '0' COMMENT '总阅读时长',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_books
-- ----------------------------
INSERT INTO `user_books` VALUES ('1', null, '', '0');

-- ----------------------------
-- Table structure for user_care
-- ----------------------------
DROP TABLE IF EXISTS `user_care`;
CREATE TABLE `user_care` (
  `id` int(11) DEFAULT NULL COMMENT '用户ID',
  `user_care` varchar(255) DEFAULT NULL COMMENT '用户关注的id',
  `user_cared` varchar(255) DEFAULT NULL COMMENT '用户被关注的id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_care
-- ----------------------------

-- ----------------------------
-- Table structure for user_detail
-- ----------------------------
DROP TABLE IF EXISTS `user_detail`;
CREATE TABLE `user_detail` (
  `id` int(11) NOT NULL COMMENT '用户ID',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `introduce` varchar(255) DEFAULT NULL COMMENT '介绍自己',
  `signature` varchar(255) DEFAULT NULL COMMENT '签名',
  `iconUrl` varchar(255) DEFAULT NULL COMMENT '头像',
  `care_count` int(11) DEFAULT NULL COMMENT '关注人数',
  `cared_count` int(11) DEFAULT NULL COMMENT '被关注人数',
  `note_num` int(11) DEFAULT NULL COMMENT '笔记数量',
  `list_num` int(11) DEFAULT NULL COMMENT '书单数量',
  `rank` int(11) DEFAULT '0' COMMENT '阅读时长排名',
  `read_len` int(11) DEFAULT '0' COMMENT '阅读总时长',
  `zan_num` int(11) DEFAULT NULL COMMENT '收到的赞数量',
  `comment_num` int(11) DEFAULT NULL COMMENT '评论数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_detail
-- ----------------------------
INSERT INTO `user_detail` VALUES ('1', '吉', '女', '广东揭阳', '我是前端', '吃得苦中苦，方为人上人', 'http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg', '0', '0', '0', '0', '0', '0', '0', '0');
