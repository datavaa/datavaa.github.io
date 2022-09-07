<iframe src="//player.bilibili.com/player.html?aid=257366152&bvid=BV1dY411M7go&cid=742278906&page=1&high_quality=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="600"> </iframe>

## ① 链接外置数据库

默认情况使用 H2 作为内置数据存储, 如需链接其他类型数据库作为 datav 数据库存储

● 引入相关驱动包

● 配置 链接参数

!> 自动创建表 ， 支持常见的 mysql、oracle 、pg、sql server 、DB2 、 达梦

## ② MySQL 为例

- 引入驱动

```xml
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <scope>runtime</scope>
</dependency>
```

- 配置数据库链接及方言

```
spring.datasource.url=jdbc:mysql://localhost:3306/datav?serverTimezone=GMT%2B8
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

## 特别说明

!> ORACLE 存储大文本时候，和其他类型关系型数据库方案不一样需要添加以下兼容依赖

```xml
        <!--   兼容oracle 的插件，必须放在 datav-starter 之前     -->
<dependency>
    <groupId>com.pig4cloud.plugin</groupId>
    <artifactId>datav-database-oracle-plugin</artifactId>
    <version>${lastVersion}</version>
</dependency>
```