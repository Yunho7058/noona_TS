"use strict";
/*
문제은행 15. 타입 활용하기
문제 1. 함수의 반환 타입만 추출하는 유틸리티 타입을 작성하세요.
요구사항:
타입 이름: ExtractReturnType<F>.
입력: 함수 타입 F.
출력: 함수의 반환 타입.
테스트 코드:
함수 타입에 따라 반환 타입을 추출하세요.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
문제 2. 동적으로 주어진 키를 사용해 객체의 값을 추출하는 함수를 작성하세요.
요구사항:
객체 타입과 키를 동적으로 받아, 해당 키에 해당하는 값을 반환하는 함수.
주어진 키가 객체에 반드시 존재한다는 조건에서 작동합니다.
타입스크립트는 동적 키를 사용하는 상황에서 기본적으로 안전성을 보장하지 않으므로, as를 사용해야 합니다.
*/
// 객체 타입 지정후, 그 key만 타입으로 허용, extends keyof T 때문에 잘못된 key 들어오면 err
// T[K] 반환 let user = {name :'yun'} user[name] = 'yun'
// function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
//   return obj[key];
// }
// as 를 사용 하지만 첫번째 방법은 객체안에 없는 키값이 변수로 들어오면 에러 방지 가능
// function getValue<T, K>(obj: T, key: K): T[keyof T] {
//   // return obj[key] as T[K]; 출력을 그냥 T[K]
//   return obj[key as keyof T];
// }
// 받을때도 key 확실하게 받고, 출력은 무조건 T[K]
function getValue(obj, key) {
    return obj[key];
}
// 테스트 코드
const user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
};
console.log(getValue(user, "name")); // 기대 출력: "Alice"
console.log(getValue(user, "email")); // 기대 출력: "alice@example.com"
// 타입 "text"  "json"  "binary" 설정 , data 는 RequestData , 리턴 값은 문자열
function processRequest(type, data) {
    // text 일때 문자열 출력
    // binary 일때 Uint8Array 배열 제거후 출력
    // json 객체로 출력? 문자열?
    if (type === "binary") {
        return "Processed: " + data.join(",");
    }
    else if (type === "json") {
        return `Processed: ${JSON.stringify(data)}`;
    }
    return "Processed: " + String(data);
}
// 테스트 코드
console.log(processRequest("text", "Hello")); // "Processed: Hello"
console.log(processRequest("json", { key: "value" })); // "Processed: [object Object]"
console.log(processRequest("binary", new Uint8Array([72, 101, 108, 108, 111]))); // "Processed: 72,101,108,108,111"
