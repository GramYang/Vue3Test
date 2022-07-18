<template>
    <h1>websocket测试t1</h1>
    <el-button @click="connect()">连接</el-button>
    <el-button @click="close()">关闭</el-button>

    <p>前端刷新时会关闭websocket连接</p>
</template>

<script>
export default {
    data(){
        return{
            wsInstance:null,
        }
    },
    methods:{
        connect(){
            this.wsInstance=new WebSocket("ws://127.0.0.1:8800/echo")
            this.wsInstance.binaryType="arraybuffer"
            this.wsInstance.onopen=function(evt){
                console.log('websocket连接成功',evt)
                let msgBody = {
                    Msg: "鲍勃",
                    Value: 331,
                }
                let msgData = JSON.stringify(msgBody)
                let encoder = new TextEncoder('utf8')
                let jsonBody= encoder.encode( msgData)
                let msgid = 1234
                let pkt = new ArrayBuffer( 2+ jsonBody.length)
                let dv = new DataView(pkt)
                dv.setUint16(0, msgid, true)
                for(let i = 0;i <jsonBody.length;i++){
                    dv.setUint8(2+i, jsonBody[i])
                }
                this.send(pkt)
            }
            this.wsInstance.onmessage=function(evt){
                if (evt.data instanceof ArrayBuffer ){
                    let dv = new DataView(evt.data);
                    let msgid = dv.getUint16(0, true)
                    console.log('msgid',msgid)
                    let msgBody = evt.data.slice(2)
                    let decoder = new TextDecoder('utf8')
                    let jsonBody = decoder.decode(msgBody)
                    let msg = JSON.parse(jsonBody)
                    console.log( "Received Message: " , msg);
                }else{
                    console.log("Require array buffer format")
                }
            }
            this.onclose=function(evt){
                console.log('websocket连接关闭',evt)
                //此回调不会在websocket主动关闭连接时触发
            }
        },
        close(){
            this.wsInstance.close()
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>