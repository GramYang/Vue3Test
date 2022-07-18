<template>
    <h1>例1——晃动</h1>
    <div :class="{shake:noActivated}">
        <button id="b1" @click="noActivated=true">click me</button>
        <span v-if="noActivated">我焯</span>
    </div>
    <h1>例2——动态style</h1>
    <div @mousemove="xCoordinate" :style="{backgroundColor:`hsl(${x},80%,50%)`}" class="movearea">
        <p>x:{{x}}</p>
    </div>
    <h1>例3——缓动</h1>
    <button id="b2">click me</button>
    <h1>transition——class过渡</h1>
    <button @click="show=!show">Toggle</button>
    <transition name="fade">
        <p v-if="show">hello</p>
    </transition>
    <h1>transition——css过渡</h1>
    <button @click="show=!show">Toggle</button>
    <transition name="slide-fade">
        <p v-if="show">hello</p>
    </transition>
    <h1>transition——css动画</h1>
    <button @click="show=!show">Toggle</button>
    <transition name="bounce">
        <p v-if="show">hello</p>
    </transition>
    <h1>transition——多元素</h1>
    <transition name="fade" mode="out-in">
        <button v-if="on" key="on" @click="on=false">on</button>
        <button v-else key="off" @click="on=true">off</button>
    </transition>
    <h1>transition——多组件</h1>
    <input v-model="view" type="radio" value="v-a" id="a"><label for="a">A</label>
    <input v-model="view" type="radio" value="v-b" id="b"><label for="b">B</label>
    <transition name="component-fade" mode="out-in">
        <component :is="view"></component>
    </transition>
    <h1>transition group——列表进入离开过渡</h1>
    <button @click="add">add</button>
    <button @click="remove">remove</button>
    <transition-group name="list" tag="p">
        <span v-for="item in items" :key="item" class="list-item">{{item}}</span>
    </transition-group>
    <h1>transition group——列表移动过渡</h1>
    <button @click="shuffle">shuffle</button>
    <transition-group name="flip-list" tag="ul">
        <li v-for="item in items" :key="item">{{item}}</li>
    </transition-group>
    <h1>transition group——列表交错过渡</h1>
    <input v-model="query"/>
    <transition-group
        name="staggered-fade"
        tag="ul"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
    >
        <li v-for="(item,index) in  computedList" :key="item.msg" :data-index="index">
            {{item.msg}}
        </li>
    </transition-group>
    <h1>状态过渡——计数器</h1>
    <input v-model.number="number" type="number" step="20"/>
    <p>{{animatedNumber}}</p>
    <h1>状态过渡——svg动画</h1>
    <svg width="200" height="200">
        <polygon :points="points"></polygon>
        <circle cx="100" cy="100" r="90"></circle>
    </svg>
    <label>Sides: {{sides}}</label>
    <input type="range" min="3" max="500" v-model.number="sides" />
    <label>Minimum Radius: {{ minRadius }}%</label>
    <input type="range" min="0" max="90" v-model.number="minRadius" />
    <label>Update Interval: {{ updateInterval }} milliseconds</label>
    <input type="range" min="10" max="2000" v-model.number="updateInterval" />
</template>

<script>
import _ from 'lodash'
import gsap from 'gsap'
const defaultSides=10
const stats=Array.apply(null,{length:defaultSides}).map(()=>100)
function valueToPoint(value,index,total){
    let x=0
    let y=-value*0.9
    let angle=((Math.PI*2)/total)*index
    let cos=Math.cos(angle)
    let sin=Math.sin(angle)
    let tx=x*cos-y*sin+100
    let ty=x*sin+y*cos+100
    return {x:tx,y:ty}
}
function generatePoints(stats){
    let total=stats.length
    return stats.map(function(stat,index){
        let point=valueToPoint(stat,index,total)
        return point.x+","+point.y
    }).join(' ')
}
export default {
    components:{
        'v-a':{
            template:'<div>Component A</div>'
        },
        'v-b':{
            template:'<div>Component B</div>'
        }
    },
    data(){
        return{
            noActivated:false,
            x:0,
            show:true,
            on:false,
            view:'v-a',
            items:[1,2,3,4,5,6,7,8,9],
            nextNum:10,
            query:'',
            list:[
                {msg:'bruce lee'},
                {msg:'jackie chan'},
                {msg:'chuck norris'},
                {msg:'jet li'},
                {msg:'kung fury'}
            ],
            number:0,
            tweenedNumber:0,
            stats: stats,
            points: generatePoints(stats),
            sides: defaultSides,
            minRadius: 50,
            interval: null,
            updateInterval: 500
        }
    },
    methods:{
        xCoordinate(e){
            this.x=e.clientX
        },
        randomIndex(){
            return Math.floor(Math.random()*this.items.length)
        },
        add(){
            this.items.splice(this.randomIndex(),0,this.nextNum++)
        },
        remove(){
            this.items.splice(this.randomIndex(),1)
        },
        shuffle(){
            this.items=_.shuffle(this.items)
        },
        beforeEnter(el){
            el.style.opacity=0
            el.style.height=0
        },
        enter(el,done){
            gsap.to(el,{
                opacity:1,
                height:'1.6em',
                delay:el.dataset.index*0.15,
                onComplete:done
            })
        },
        leave(el,done){
            gsap.to(el,{
                opacity:0,
                height:0,
                delay:el.dataset.index*0.15,
                onComplete:done
            })
        },
        randomizeStats(){
            let vm=this
            this.stats=this.stats.map(()=>vm.newRandomValue())
        },
        newRandomValue(){
            return Math.ceil(this.minRadius+Math.random()*(100-this.minRadius))
        },
        resetInterval(){
            let vm=this
            clearInterval(this.interval)
            this.randomizeStats()
            this.interval=setInterval(()=>{
                vm.randomizeStats()
            },this.updateInterval)
        }
    },
    computed:{
        computedList(){
            let vm=this
            return this.list.filter(item=>{
                return item.msg.toLowerCase().indexOf(vm.query.toLowerCase())!==-1
            })
        },
        animatedNumber(){
            return this.tweenedNumber.toFixed(0)
        }
    },
    watch:{
        number(newValue){
            gsap.to(this.$data,{duration:0.5,tweenedNumber:newValue})
        },
        sides(newSides,oldSides){
            let sidesDifference=newSides-oldSides
            if(sidesDifference>0){
                for(let i=1;i<=sidesDifference;i++){
                    this.stats.push(this.newRandomValue())
                }
            }else{
                let absoluteSidesDifference=Math.abs(sidesDifference)
                for(let i=1;i<=absoluteSidesDifference;i++){
                    this.stats.shift()
                }
            }
        },
        stats(newStats){
            gsap.to(this.$data,this.ipdateInterval/1000,{points:generatePoints(newStats)})
        },
        updateInterval(){
            this.resetInterval()
        }
    },
    mounted(){
        this.resetInterval()
    }
}
</script>

<style lang="stylus" scoped>
button 
    background: #d93419
    border-radius: 4px
    display: inline-block
    border: none
    padding: 0.75rem 1rem
    margin: 20px 10px 0 0
    text-decoration: none
    color: #ffffff
    font-family: sans-serif
    font-size: 1rem
    cursor: pointer
    text-align: center
    -webkit-appearance: none
    -moz-appearance: none
#b1:focus 
    outline: 1px dashed #fff
    outline-offset: -3px
#b2:focus,#b2:hover
    transition: background 1s ease-out
    background #3eaf7c
#b2:focus
    outline 1px solid #fff
    outline-offset: -4px

.shake 
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both
    transform: translate3d(0, 0, 0)
    backface-visibility: hidden
    perspective: 1000px
@keyframes shake 
    10%, 90% 
        transform: translate3d(-1px, 0, 0)
    20%, 80% 
        transform: translate3d(2px, 0, 0)
    30%, 50%, 70% 
        transform: translate3d(-4px, 0, 0)
    40%, 60% 
        transform: translate3d(4px, 0, 0)
.movearea
    transition: 0.2s background-color ease
    width 100%
    height 100px

.fade-enter-active,.fade-leave-active
    transition opacity 0.5s ease
.fade-enter-from,.fade-leave-to
    opacity 0

.slide-fade-enter-active
    transition all 0.3s ease-out
.slide-fade-leave-active
    transition all 0.8s cubic-bezier(1,0.5,0.8,1)
.slide-fade-enter-from,.slide-fade-leave-to
    transform translateX(20px)
    opacity: 0

.bounce-enter-active
    animation bounce-in 0.5s
.bounce-leave-active
    animation bounce-in 0.5s reverse
@keyframes bounce-in
    0%
        transform scale(0)
    50%
        transform scale(1.25)
    100%
        transform scale(1)

.component-fade-enter-active,
.component-fade-leave-active
    transition opacity 0.3s ease
.component-fade-enter-from,
.component-fade-leave-to
    opacity 0

.list-item
    display inline-block
    margin-right 10px
.list-enter-active,
.list-leave-active
    transition all 1s ease
.list-enter-from,
.list-leave-to
    opacity 0
    transform translateY(30px)

.flip-list-move
    transition transform 0.8s ease

svg
    display block
polygon
    fill #41b883
circle
    fill transparent
    stroke #35495e
input[type="range"]
    display block
    width 100%
    margin-bottom 15px
</style>