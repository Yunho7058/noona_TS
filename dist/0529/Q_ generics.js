"use strict";
/*
문제은행 11강- 제네릭 타입
문제 1. 배열의 첫 번째 요소를 반환하는 함수를 작성하세요. 배열의 요소 타입에 관계없이 작동해야 합니다.
1.함수 이름: getFirstElement
2.입력: 제네릭 배열
3.출력: 배열의 첫 번째 요소
*/
// 매개변수, 리턴타입 정의 필요
// 매개변수 배열로 받고 , 무슨 타입으로 들어오는지 모르니 T[]
// 리턴 타입도 T 아니면 undefinde 지정 , 왜 따로 undefinde 지정 해야할까?
// useSate 비슷
function getFirstElement(array) {
    // 여기에 구현
    return array[0];
}
// 테스트 코드
console.log(getFirstElement([1, 2, 3])); // 1
console.log(getFirstElement(["a", "b", "c"])); // "a"
console.log(getFirstElement([])); // undefined
/*
문제 2. 숫자 배열인지 문자열 배열인지 확인하는 함수를 작성하세요.
함수 이름: isNumberArray
입력: 제네릭 배열
출력:
배열이 숫자 배열이면 true.
그렇지 않으면 false.
*/
// 매개변수, 리턴타입 정의 필요
function isNumberArray(array) {
    // 배열에 첫 요소 검사, 아니면 맵핑?, 두번째 세번째 요소거 검사 필요
    // every 타입 검사
    return array.every((item) => typeof item === "number");
}
// 테스트 코드
console.log(isNumberArray([1, 2, 3])); // true
console.log(isNumberArray(["a", "b", "c"])); // false
console.log(isNumberArray([])); // true (빈 배열은 숫자 배열로 간주)
// 조건부 타입을 활용한 함수
function checkArrayType(value) {
    // 배열인지 맞는지 검사
    if (Array.isArray(value)) {
        return "This is an array.";
    }
    else {
        return "This is not an array.";
    }
}
// 테스트 코드
console.log(checkArrayType([1, 2, 3])); // "This is an array."
console.log(checkArrayType("Hello")); // "This is not an array."
console.log(checkArrayType({ key: "value" })); // "This is not an array."
// 기대 결과:
// type WithDefaults = {
//   id: [number, number];
//   name: [string, string];
//   isActive: [boolean, boolean];
// }
/*
문제 5. 키와 값을 받아 객체를 생성하는 함수를 작성하세요.
함수 이름: createObject
입력:
key: 키 (제네릭 타입 K)
alue: 값 (제네릭 타입 V)
출력: { key: value } 형태의 객체
*/
// TS 에서 객체이 키를 사용할수 있는 타입은 string,number,symbol 뿐이라, key 지정지 타입을 한번더 지정하는게 안전.
function createObject(key, value) {
    return { [key]: value };
}
// 테스트 코드
console.log(createObject("id", 123)); // { id: 123 }
console.log(createObject("name", "Alice")); // { name: "Alice" }
/*
문제 6. 사용자 정보를 나타내는 객체 배열에서 특정 속성만 추출하는 함수를 작성하세요.
함수 이름: pluck
입력:
객체 배열: 제네릭 타입 배열
속성 이름: 제네릭 타입
출력: 속성 값 배열
*/
// 매개변수, 리턴 타입 정의 필요
// 이번 key 는 어우... 보강 필요..
function pluck(array, key) {
    return array.map((item) => item[key]);
}
// 테스트 코드
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];
console.log(pluck(users, "id")); // [1, 2]
console.log(pluck(users, "name")); // ["Alice", "Bob"]
