// const myTimer = (fn, a, b) => {
//   let count = 0;

//   let timer = null;

//   const executeFunc = () => {
//     let delay = a + count * b;
//     timer = setTimeout(() => {
//       fn();
//       count++;
//       executeFunc();
//     }, delay);
//   };

//   executeFunc();

//   return () => {
//     clearTimeout(timer);
//     timer = null;
//   };
// };

export default (function () {
  let count = 0;

  function Foo() {
    console.log(this,'count ==',count);
    if (!(this instanceof Foo)) {
      return new Foo();
    }
    count++;
    this.id = count;
  }

  return Foo;
})();
