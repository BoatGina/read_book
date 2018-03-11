/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : readbook

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-11 19:12:10
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
-- Table structure for comment_list
-- ----------------------------
DROP TABLE IF EXISTS `comment_list`;
CREATE TABLE `comment_list` (
  `comment_id` int(11) NOT NULL COMMENT '评论id',
  `user_id` int(11) DEFAULT NULL COMMENT '评论人id',
  `nickname` varchar(255) DEFAULT NULL COMMENT '评论人昵称',
  `content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `replyList` varchar(255) DEFAULT NULL COMMENT '回复列表id',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_list
-- ----------------------------

-- ----------------------------
-- Table structure for reply_list
-- ----------------------------
DROP TABLE IF EXISTS `reply_list`;
CREATE TABLE `reply_list` (
  `reply_id` int(11) NOT NULL COMMENT '回复id',
  `from_id` int(11) DEFAULT NULL COMMENT '回复人id',
  `from_nickname` varchar(255) DEFAULT NULL COMMENT '回复人nickname',
  `to_id` int(11) DEFAULT NULL COMMENT '被回复人id',
  `to_nickname` varchar(255) DEFAULT NULL COMMENT '被回复人nickname',
  `content` varchar(255) DEFAULT NULL COMMENT '回复内容',
  PRIMARY KEY (`reply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reply_list
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
INSERT INTO `user` VALUES ('1', '141515454', '00dbc41a06d497bc221879997c9ec9', '1', '1520766163');
INSERT INTO `user` VALUES ('2', '141545642', '00dbc41a06d497bc221879997c9ec9', '1', '1520766631');

-- ----------------------------
-- Table structure for user_books
-- ----------------------------
DROP TABLE IF EXISTS `user_books`;
CREATE TABLE `user_books` (
  `id` int(11) NOT NULL COMMENT '用户ID',
  `bookshelf_id` longtext COMMENT '书架id集合',
  `readRecord_id` longtext COMMENT '阅读过的书籍id集合',
  `read_time` bigint(225) DEFAULT '0' COMMENT '总阅读时长',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_books
-- ----------------------------
INSERT INTO `user_books` VALUES ('1', '5a4f4b389303381c02a50b74', '5a4f4b389303381c02a50b74,56619528b52bafc43eff74bb,57819dd770dd7eda12288dd8,57bafcac03650d4213a3aad2,53b76d8840f97c4245511144,573da6297a4270ec448bb41b,5a825823e2dbd1471161009e,595258be4da2d29421ff7ef7,596f801a9d9a69af467c7b13,54b67db628d974fd71773887,55eef8b27445ad27755670b9,5702151c1c8e4db9483762d6,55b9e298a33592d654b6d190,', '0');
INSERT INTO `user_books` VALUES ('2', '59261a9b94d093211e6d49f6,58db11eef02f7d7e2ab97775,5a534e9d6c81b81b7030beb5,55eef8b27445ad27755670b9', null, '0');

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
INSERT INTO `user_care` VALUES ('1', null, null);
INSERT INTO `user_care` VALUES ('2', null, null);

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
INSERT INTO `user_detail` VALUES ('1', '吉', '女', '广东揭阳', '我是前端啊啊', '7777吃得苦中苦，方为人上人', 'http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `user_detail` VALUES ('2', '吉2', '男', '广东揭阳', '我是后台啊啊', '不断前行', 'http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg', '0', '0', '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for user_share
-- ----------------------------
DROP TABLE IF EXISTS `user_share`;
CREATE TABLE `user_share` (
  `share_id` varchar(225) NOT NULL COMMENT '分享id',
  `main_id` int(11) DEFAULT NULL COMMENT '分享用户id',
  `main_iconUrl` varchar(225) DEFAULT NULL COMMENT '分享用户头像',
  `main_nickname` varchar(255) DEFAULT NULL COMMENT '分享用户昵称',
  `book_id` varchar(255) DEFAULT NULL COMMENT '分享书籍id',
  `cover` varchar(255) DEFAULT NULL COMMENT '分享书籍封面',
  `title` varchar(255) DEFAULT NULL COMMENT '分享书籍标题',
  `time` bigint(225) DEFAULT NULL COMMENT '分享时间',
  `comment` longtext COMMENT '分享内容',
  `zan` int(225) DEFAULT NULL COMMENT '点赞数量',
  `commentList` varchar(255) DEFAULT NULL COMMENT '评论列表id',
  PRIMARY KEY (`share_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_share
-- ----------------------------
INSERT INTO `user_share` VALUES ('0e1f7dca9f3afd45c18', '1', 'http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg', '吉', '5a4f4b389303381c02a50b74', 'http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2202962%2F2202962_2b886058d8af42b585abfa59f1ac9a47.jpg%2F', '长生在武侠世界', '1520765022471', '5555', null, null);
INSERT INTO `user_share` VALUES ('13eeda6bb3bc7a4d9d8', '1', 'http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg', '吉', '5a4f4b389303381c02a50b74', 'http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2202962%2F2202962_2b886058d8af42b585abfa59f1ac9a47.jpg%2F', '长生在武侠世界', '1520765101030', '这本书的文采非常生动！！！！', null, null);
INSERT INTO `user_share` VALUES ('8f8d54a831e6e0407c8', '2', 'http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg', '吉2', '59261a9b94d093211e6d49f6', 'http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2044833%2F2044833_17276ff4895242f4b93b2d33d863a997.jpg%2F', '我的姐姐是大明星', '1520766650998', '很有创意哦', null, null);
