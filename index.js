let price = 10;
let num = 2;
let total = null;
let storage = [];
// let target = function(){
//   total =  price * num;
// }

function record(){
  storage.push(target);
}

function replay(){
  storage.forEach(run=>run());
}

// record();
// target();
// console.log(total)

// num = 3;
// replay();
// console.log(total);


// class Dep{
//   constructor(){
//     this.subscribers = [];
//   }
//   depend(){
//     if(target!==null && !this.subscribers.includes(target))
//       this.subscribers.push(target);
//   }
//   notify(){
//     this.subscribers.forEach(sub => sub());
//   }
// }

// let dep = new Dep();
// dep.depend();
// target();
// console.log(total);

// num = 3;
// dep.notify();
// console.log(total);
let target; 
let func = function(){
  total =  price * num;
}

// 复用函数登记， 第一次执行
function watcher(func){
  target = func;
  dep.depend();
  target();
  target = null;
}

// let dep = new Dep();
// watcher(func);
// console.log(total);
// num = 3;
// dep.notify();
// console.log(total);


// let data = {
//   price: 10,
//   num: 2,
// }
// let calculateTotalPrice = ()=>{
//   total =  data.price * data.num;
// }

// let internalValue = data.price;
// Object.defineProperty(data, 'price', {
//   get(){
//     console.log(`get ${internalValue}`);
//     return internalValue;
//   },
//   set(newVal){
//     internalValue = newVal;
//     console.log(`set ${internalValue}`);
//   }
// })

// console.log(data.price, "#");
// data.price = 89;
// console.log(Object.keys(data))
// Object.keys(data).forEach(key => {
//   let internalValue = data[key];
//   Object.defineProperty(data, key, {
//     get(){
//       console.log(`get ${internalValue}`);
//       return internalValue;
//     },
//     set(newVal){
//       internalValue = newVal;
//       console.log(`set ${internalValue}`);
//     }
//   })
// })

// data.num;
// data.num = 4;

//final version
let data = {
  price: 10,
  num: 2,
}
let calculateTotalPrice = ()=>{
  data.total =  data.price * data.num;
}
let target = null;

class Dep{
  constructor(){
    this.subscribers = [];
  }
  depend(){
    if(target!==null && !this.subscribers.includes(target))
      this.subscribers.push(target);
  }
  notify(){
    this.subscribers.forEach(sub => sub());
  }
}

Object.keys(data).forEach(key => {
  const dep = new Dep();
  let internalValue = data[key];
  Object.defineProperty(data, key, {
    get(){
      console.log(`get ${internalValue}`);
      dep.depend();
      return internalValue;
    },
    set(newVal){
      console.log(`set ${newVal}`);
      internalValue = newVal;
      dep.notify();
    }
  })
})

function watcher(func){
  target = func;
  target();
  target = null;
}
watcher(calculateTotalPrice); // data.price * data.num;

console.log(data.total);
data.num = 3;
console.log(data.total);