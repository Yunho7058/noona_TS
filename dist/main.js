"use strict";
// /*
// 제네릭 타입
// 타입을 변수처럼 사용, 파라미터 처럼
const result = {
    //type: "track",
    title: "string",
    releaseDate: "string",
    // name: "string", // track 이기 때문에 오류 발생
    // debuYear: 5,
};
function getUser() {
    return { name: "123", age: 5 };
}
// as 는 확정, 별명?  (is 는 이거다 확정)
// 타입추론이 안될때 as 많이 사용함
let str = "hellow";
//console.log(str.length)
//강제로 string 타입으로 변경
let newStr = str;
console.log(newStr.length);
// as 사용하기가 힘들어 보임
