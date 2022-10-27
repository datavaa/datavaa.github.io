<div id="example">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="产品名称">
            <span class="pro_name">DataV 数据可视化解决方案</span>
        </el-form-item>
        <el-form-item label="产品类型">
            <el-select v-model="form.offer" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in offers" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="money">
            <el-input v-model="calcMoney"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="qq">
            <el-input v-model="form.qq" placeholder="支付后自动发送至对应的邮箱"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邀请码" prop="recommend">
            <el-input v-model="form.recommend" placeholder="选填" @blur="blur" />
            </el-input>
        </el-form-item> -->
        <el-form-item>
            <el-button type="primary" @click="onSubmit" class="pay_btn">确认订单</el-button>
        </el-form-item>
    </el-form>
</div>
<script>
    new Vue({
        el: '#example',
        data() {
            return {
                order: "",
                time: null,
                picUrl: "",
                form: {
                    promo: 1,
                    name: 'DataV 数据可视化解决方案',
                    money: "0",
                    qq: "",
                    recommend: "",
                    offer: "1",
                    version: "datav",
                    time: "永久有效",
                },
                offers: [
                    {
                        value: "10",
                        label: "一年期 license版本",
                    },
                    {
                        value: "1",
                        label: "100% 源码版",
                    }
                ]
            }
        },
        computed: {
            calcMoney() {
                this.form.offer === "10" ? this.form.money = "999" : this.form.money = "12000"
                this.form.time = "永久"
                this.form.version = "datav"
                this.form.money = Math.ceil(this.form.money * this.form.promo)
                return this.form.money;
            },
        },
        created() {
            //this.openDig()
        },
        methods: {
            blur() {
                if (this.form.recommend === null) {
                    this.form.promo = 1
                    return false
                }
                axios({
                    url: "https://pay.pigx.vip/enterprise/promo?code=" + this.form.recommend,
                    method: "get",
                }).then((response) => {
                    // 有效
                    if (response.data.flag) {
                        this.form.promo = response.data.res.promo / 10
                    } else if (response.data.msg != null) {
                        this.form.promo = 1
                        this.$message({
                            message: response.data.msg,
                            type: "error",
                        });
                    } else {
                        this.form.promo = 1
                    }
                });
            },
            openDig() {
                this.$notify({
                    title: '9.9 尝鲜版限时上线',
                    duration: 0,
                    dangerouslyUseHTMLString: true,
                    message: '<a href="/#/buy/08" target="_blank">关于尝鲜限时说明</a>'
                });
            },
            onSubmit() {
                if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.qq)) {
                    this.$message({
                        message: "联系邮箱不合法，请检查",
                        type: "error",
                    });
                    return false;
                }
                this.$alert(
                    "1. 请确定已阅读右上角【授权说明】 </br> 2. 若已支付说明您已知悉权益并同意遵循要求 </br> 3. 近期支付宝小概率风控提示，【放心支付】 </br> 4. 支付过程中出现问题请及时联系在线客服",
                    "购买说明",
                    {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: '同意',
                    }
                ).then(() => {
                    this.pay();
                });
            },
            // 支付页面显示
            pay() {
                this.blur()
                axios({
                    url: "https://pay.pig4cloud.com/pig4cloud/pay/merge",
                    method: "post",
                    data: this.form,
                }).then((response) => {
                    this.order = response.data.order
                    this.picUrl = response.data.url
                    this.time = setInterval(this.getLoginStatus, 2000)
                }).then(() => {
                    let html = `
<div class="parent">
    <font color="#FF0000">近期支付宝小概率风控【请放心按支付宝提示操作】</font>
</div>
    <div><img src="${this.picUrl}" style="width: 99%" /></div>
<div class="parent">
<img src="_media/支付宝.png" />
<img src="_media/微信支付.png" />
</div>`
                    this.$alert(html, "", {
                        showConfirmButton: false,
                        dangerouslyUseHTMLString: true,
                    }
                    ).catch(() => {
                        this.closeDialog()
                    });
                })
            },
            // 定时轮询订单信息看是否已经支付
            getLoginStatus() {
                axios({
                    url: "https://pay.pig4cloud.com/pig4cloud/pay/result/" + this.order,
                    method: "get",
                }).then((response) => {
                    // 已经登录
                    if (response.data.flag) {
                        clearTimeout(this.time);
                        window.location.href = "/#/buy/09"
                    }
                });
            },
            closeDialog() {
                clearTimeout(this.time);
            },
        }
    });
</script>
<style scoped>
    .pro_name {
        font-size: large;
    }
    .parent {
        text-align: center;
    }
    .parent img {
        display: inline-block;
        width: 20%;
    }
    .video {
        display: inline-block;
        vertical-align: middle;
        padding: 0 12px;
        height: 28px;
        line-height: 28px;
        background-color: #d8d8d8;
        text-align: center;
        color: #181818;
        font-size: 12px;
        cursor: pointer;
        margin-left: 12px;
    }
    .ddd {
        width: 100%;
        height: 3500px;
    }
    .box {
        width: 600px;
    }
    #videoBox {
        border: 10px solid #212223;
        transition: 0.5s;
    }
    video {
        width: 100%;
        vertical-align: bottom;
    }
    #videoBox.in {
        animation: ac 1s;
    }
    #videoBox.out {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 300px;
        z-index: 999;
        animation: an 0.5s;
    }
    .pay_btn {
        width: 135px;
        position: absolute;
        right: 0;
        top: 9px;
        background: #73A748;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        color: #fff;
        letter-spacing: 1px;
        cursor: pointer;
        user-select: none;
        border: none;
        border-radius: 24px;
    }
</style> 