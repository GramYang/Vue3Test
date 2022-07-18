//settimeout+promise实现无线递归循环
let isLoop=true
function loop(f,t1,t2){
    return new Promise((resolve)=>{
        if(isLoop){
            f(t1)
        }
        return resolve()
    }).then(()=>{if(isLoop){setTimeout(()=>{loop(f,t1,t2)},t2)}})
}

loop((t)=>{console.log('this is loop1 with param ',t)},20,2000)
loop((t)=>{console.log('this is loop2 with param ',t)},30,2500)
loop((t)=>{console.log('this is loop3 with param ',t)},40,3000)
setTimeout(()=>{isLoop=false;console.log('stop loop')},30000)