<iframe src="//player.bilibili.com/player.html?aid=813556325&bvid=BV1v34y1J79z&cid=778493872&page=1&high_quality=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="600"> </iframe>

![](https://minio.pigx.vip/oss/1658673155.png)

## ① 组件库维护

!> [复制 Element 任意组件，这里以 tab 组件示例](https://element.eleme.io/#/zh-CN/component/tabs)

![](https://minio.pigx.vip/oss/1658673206.png)

## ② 设计器配置自定义组件

![](https://minio.pigx.vip/oss/1658673401.png)

## ③ 扩展： 动态加载 js

> 自定义组件内容 使用 window.$loadScript 动态加载 js

```
<template>
    <div class="test">
        <el-button type="success" @click="handleClick">点击我弹窗</el-button>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    created(){

    },
    methods:{
        handleClick(){
            window.$loadScript('js','https://cdn.staticfile.org/jquery/2.1.2/jquery.js').then(()=>{
                return window.$loadScript('js','https://data.avuejs.com/layer/layer.js')
            }).then(()=>{
                return window.$loadScript('js','https://cdn.staticfile.org/jquery.qrcode/1.0/jquery.qrcode.min.js')
            }).then(()=>{
                layer.open({
                    title: '生成二维码',
                    content: '<div id="qrcode"></div>',
                    success: function(layero, index){
                        var config={
                            width:200,
                            height:200,
                            text:"苦逼的程序员"
                        }
                        $("#qrcode").qrcode(config);
                    }
                });

            })
        }
    }
}
</script>
<style>
    .test{
        text-align:center;
        color:red;
        font-size:40px;
    }
</style>

```
