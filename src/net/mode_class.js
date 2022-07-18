const modeClass={}

modeClass.op1=()=>{
    console.log('modeclass op1')
}

modeClass.op2=()=>{
    modeClass.op1()
    console.log('modeclass op2')
    modeClass.op3()
}

modeClass.op3=()=>{
    console.log('modeclass op3')
}

export default modeClass