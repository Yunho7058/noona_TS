"use strict";
/*
제네릭 타입
타입을 변수처럼 사용, 파라미터 처럼

*/
Object.defineProperty(exports, "__esModule", { value: true });
//할당하는 순간 타입 지정
const numberArray = [1, 2, 3];
const number = [1, 2, 3];
//약간 상속 받고 추가한 느낌?
let data1 = {
    name: "string",
    page: 5,
    totalPage: 5,
    data: [{ title: "string" }, { title: "string" }, { title: "string" }],
};
let data2 = {
    name: "string",
    page: 5,
    totalPage: 5,
    data: [{ name: "string" }],
};
const user1 = { name: "gooo", age: 12 };
const user2 = { adult: false };
const pari = {
    first: "good",
    second: 2,
    display() {
        console.log(this.first + "는" + this.second);
    },
};
pari.display();
// 여기서 말하는건 제너릭 타입에는 T U K 다양한 타입 넣을수 있다.
// 리터널 타입 -> 내가 정한 문자를 타입 지정
let direction;
direction = "left";
