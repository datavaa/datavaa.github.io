![](https://minio.pigx.vip/oss/1657001481.jpg)

## ① 添加 maven 依赖

- [查看最新版本](https://repo1.maven.org/maven2/com/pig4cloud/plugin/datav-security-common-login-plugin/)

```xml
<dependency>
  <groupId>com.pig4cloud.plugin</groupId>
  <artifactId>datav-security-common-login-plugin</artifactId>
  <version>${lastVersion}</version>
</dependency>
```

## ② 配置免密参数

```
datav.login.check-token-url=业务登录页接口
datav.login.error-url=业务登录页
```

## ③ DataV 接口

#### 获取令牌

```shell
POST 请求
/api/login/token?identify=xxx

identify： 业务系统当前用户的唯一标识，比如ID
```

#### 退出

```shell
DELETE 请求
/api/login/token?token=xxx

token: 上一步中获取到的 token
```

### ④ 业务系统改造

!> 增加 check user 端点 接受 identify 参数,根据 identify 查询数据是否存储，不存在返回空即可

```java
示例代码
@GetMapping("/info")
public String info(String identify) {
    Admin admin = adminService.findByName(identify);

    if (Objects.nonNull(admin)) {
        return admin.getUsername();
    }

    // 用户不存在范围空
    return null;
}
```
