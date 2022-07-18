//使用settimeout实现无线递归循环，可以传参数，可以同时发起多个循环

let isLoop=true
function loop(f,t1,t2){
    if(!isLoop){return}
    console.log('receive ',f,t1,t2)
    f(t1)
    setTimeout(()=>{loop(f,t1,t2)},t2)
}

loop((t)=>{console.log('this is loop1 with param ',t)},20,2000)
loop((t)=>{console.log('this is loop2 with param ',t)},30,2500)
loop((t)=>{console.log('this is loop3 with param ',t)},40,3000)
setTimeout(()=>{isLoop=false},30000)