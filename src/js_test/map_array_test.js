//map使用测试
let m1=new Map([
    [1,'a'],
    [2,'b'],
    [2,'c'],
    [0,'e']
])
console.log(m1.get(2),m1.has(2))//c
console.log(m1.get(3),m1.has(3))//undefined
m1.set(4,'d')
console.log(m1,m1.size)//Map(4) { 1 => 'a', 2 => 'c', 0 => 'e', 4 => 'd' } 4
let keys=[]
for(let x of m1.keys()){
    keys.push(x)
}
console.log(keys)//[ 1, 2, 0, 4 ]

//array使用测试
let a1=[1,2,3,4]
console.log(a1[2])//3
console.log(a1[5])//undefined，数组越界不会报错会undefined
a1.push(5)
let sum=0
a1.forEach(x=>sum+=x)
console.log(sum)//15
a1.push({a:5})
console.log(a1)//[ 1, 2, 3, 4, 5, { a: 5 } ]
for(let i=0;i<a1.length;i++){//数组遍历
    console.log(a1[i],a1.at(i))//数组寻址
}
a1[7]=7
console.log(a1)//[ 1, 2, 3, 4, 5, { a: 5 }, <1 empty item>, 7 ]，越界赋值也不会报错
console.log(a1[6]==undefined)//true，中间遗漏的元素是undefined

//array提取数组中对象的指定域的值
let a2=[{a:1},{a:2},{a:3}]
let a3=[]
for(let x of a2){
    if('a' in x){
        a3.push(x['a'])
    }
}
console.log(a3)//[ 1, 2, 3 ]