<iframe src="//player.bilibili.com/player.html?aid=813556325&bvid=BV1v34y1J79z&cid=778493872&page=1&high_quality=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="600"> </iframe>

![](https://minio.pigx.vip/oss/1658673155.png)

## ① 组件库维护

!> [复制 Element 任意组件，这里以 tab 组件示例](https://element.eleme.io/#/zh-CN/component/tabs)

![](https://minio.pigx.vip/oss/1658673206.png)

## ② 设计器配置自定义组件

![](https://minio.pigx.vip/oss/1658673401.png)


## 常用扩展

### ① 扩展： 动态加载 js

> 自定义组件内容 使用 window.$loadScript 动态加载 js

```html
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


### ② 扩展： 高德地图

![](https://minio.pigx.vip/oss/1662559962.png)

```html
<template>
    <div class="wanlshop-container">
		<div id="amap" :style="{height:windowHeight + 'px'}" class="amap"></div>
	</div>
</template>
<script>
export default{
    data(){
        return{
            windowHeight:'',
            amapkey: '52a9fade9e0d464f54a2c4388a38f6c0',
	        securityJsCode:'9dcb7fe60aa614cfa405289b485e3add', 
            map:'',
            api_host:'//dq.admin.fooqi.cn' 
        }
    },
    created(){
        this.windowHeight = this.$parent.$el.clientHeight; 
        window.$loadScript('js','//webapi.amap.com/maps?v=1.4.15&key=' + this.amapkey).then((res) => {
            this.map = new AMap.Map('amap', {
				/*rotateEnable: true, 
				pitchEnable: false,
				showIndoorMap: false,
				zoom: 30,
				pitch: 55, 
				//rotation: 45,
				viewMode:'3D',
                expandZoomRange:true,
				mapStyle: "amap://styles/dark",
		        zooms: [2, 30],//地图显示的缩放级别范围, 默认为 [2, 20] ，取值范围 [2 ~ 30]*/
                resizeEnable: true,
                rotateEnable:true,
                pitchEnable:true,
                zoom: 17,
                //pitch:45,
                //rotation:15,
                viewMode:'3D',//开启3D视图,默认为关闭
                buildingAnimation:true,//楼块出现是否带动画
                //mapStyle: "amap://styles/darkblue",
                expandZoomRange:true,
                zooms:[3,30],
                //features: ['bg', 'road', 'building']
		    });
            this.map.on("complete", ()=>{
				this.createLabelsLayer();
		    });
        });
    },
    methods:{
        createLabelsLayer(){
            let style = {
                // 字体大小
                fontSize: 16,
                fontWeight: 'bolder',
                // 字体颜色
                fillColor: 'green',
                borderSize:'1px',
                borderColor:'#333',
                borderRadius:'10px',
                backgroundColor:'#fff',
                //
                // strokeColor: 'none',
                strokeWidth: 0,
                // fold: true,
                padding: '5px',
            }
            this.dataChart.forEach((element , index)=>{
                console.log(element);
                var markerContent = '' +
                '<div class="custom-content-marker">' +
                '<img src="' + this.api_host + '/map/dir-via-marker.png">' +
                '<div class="avatar" ><img src="' + this.api_host + element.avatar + '"></div>' +
                '</div>';
                var position = new AMap.LngLat(Number(element.lng) , Number(element.lat));
                var marker = new AMap.Marker({
                    position: position,
                    // 将 html 传给 content
                    content: markerContent,
                    // 以 icon 的 [center bottom] 为原点
                    offset: new AMap.Pixel(-72, -102)
                });
                 // 设置点标记的动画效果，此处为弹跳效果
                marker.setAnimation('AMAP_ANIMATION_BOUNCE');
                this.map.add(marker);
               /* var icon = {
                    type: 'image',
                    image: this.api_host + '/map/dir-via-marker.png',
                    size:[40,52],
                    anchor: 'bottom-center'
                };
                var curData = {
					name:element.sysParkName,
					position:[Number(element.longitude) ,Number(element.latitude)],
					zooms: [10, 20],
					opacity: 1,
					zIndex: index + 1 ,
					// fold: true,
					icon,
					text: {
						 content: element.sysParkName,
						 direction: 'right',
						 offset: [-8, 10],
						 style: style
					}
				};*/
            });
            this.map.setFitView(null, false, [150, 60, 100, 60]);//自适应显示多个点标记
			let zoom = this.map.getZoom(); //获取当前地图级别
			console.log(zoom);
        }
    }
}
</script>
<style lang="less">
    .custom-content-marker{
        position: relative;
        width:72px;
        height:102px;
    }
    .custom-content-marker img{
        width:100%;
        height:100%;
        display:block;
    }
    .avatar{
        position: absolute;
        top:6px;
        left:11px;
        width:50px;
        height:50px;
    }
    .avatar img{
        width:100%;
        height:100%;
        display:block;
        border-radius:50%;
    }
    //高德地图-logo隐藏
    .amap-logo {
        opacity: 0 !important;
    }
    //高德地图-版权隐藏
    .amap-copyright {
        opacity: 0;
    }
    .avue-draggable{
        padding:0;
    }
</style>
<style>
    .avue-draggable{
    }
    .test{
        text-align:center;
        color:red;
        font-size:40px;
    }
    //高德地图-logo隐藏
    .amap-logo {
        opacity: 0 !important;
    }
        //高德地图-版权隐藏
    .amap-copyright {
        opacity:  0 !important;
    }
</style>
```