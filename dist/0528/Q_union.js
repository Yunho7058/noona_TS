"use strict";
/*
문제은행 9강 - 유니온 타입
문제 1. 다양한 데이터 타입을 입력받아, 입력에 따라 다른 처리를 수행하는 함수를 작성하세요.
입력은 다음 세 가지 형태 중 하나입니다:

숫자 배열: 배열의 합계를 반환합니다.
문자열 배열: 배열의 모든 문자열을 연결한 결과를 반환합니다.
객체 { message: string }: message 속성을 대문자로 변환한 문자열을 반환합니다.
*/
Object.defineProperty(exports, "__esModule", { value: true });
// 매개변수, 리턴타입 정의필요
function processInput(input) {
    if (Array.isArray(input)) {
        if (typeof input[0] === "number") {
            //타입스크립트에서 숫자인지 그래서 확실하게 판단할수가 없다..
            return input.reduce((a, b) => a + b, 0);
        }
        else if (typeof input[0] === "string") {
            return input.join("");
        }
    }
    else if ("message" in input) {
        return input.message.toUpperCase();
    }
    throw new Error("지원하지 않는 입력 타입입니다.");
}
// 테스트 코드
console.log(processInput([1, 2, 3])); // 6
console.log(processInput(["hello", "world"])); // "helloworld"
console.log(processInput({ message: "TypeScript" })); // "TYPESCRIPT"
// console.log(processInput(42)); // 에러 발생, 맞는 타입이 아니라 안정장치에 걸림
/*
문제2. 다음 조건을 만족하는 코드를 작성하세요.
아래와 같은 두 개의 클래스를 정의합니다:

Car 클래스: brand(브랜드 이름, 문자열) 속성을 가집니다.
Bike 클래스: type(바이크 종류, 문자열) 속성을 가집니다.
입력값이 Car 또는 Bike의 인스턴스일 수 있는 vehicle을 받아 다음 규칙에 따라 처리하는 함수를 작성하세요:

Car이면 브랜드 이름을 대문자로 반환합니다.
Bike이면 바이크 종류 앞에 "Bike: "를 추가하여 반환합니다.
*/
// 클래스 정의
/*
class Car {
  public brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
}
*/
class Car {
    constructor(brand) {
        this.brand = brand;
    }
}
class Bike {
    constructor(type) {
        this.type = type;
    }
}
function processVehicle(vehicle) {
    // 자동차, 오토바이 구별후 이름 출력 , 클래스도 구별가능
    if (vehicle instanceof Car) {
        return vehicle.brand.toUpperCase();
    }
    else if (vehicle instanceof Bike) {
        return `Bike: ${vehicle.type}`;
    }
    // 리턴값을 찾지 못해 에러 처리
    throw new Error("알 수 없는 차량 타입입니다.");
}
// 클래스 생성
const myCar = new Car("Tesla");
const myBike = new Bike("Mountain");
console.log(processVehicle(myCar)); // "TESLA"
console.log(processVehicle(myBike)); // "Bike: Mountain"
function processUser(user) {
    if ("permissions" in user) {
        // 배열 문자열 합치기
        return user.permissions.join(",");
    }
    else if ("email" in user) {
        return user.email;
    }
    throw new Error("알 수 없는 사용자 타입입니다.");
}
// 테스트 코드
console.log(processUser({ type: "admin", permissions: ["read", "write"] })); // "read,write"
console.log(processUser({ type: "user", email: "user@example.com" })); // "user@example.com"
// 사용자 정의 타입 가드
function isRectangle(shape) {
    // as 타입을 지정하기
    return (shape.width !== undefined &&
        shape.height !== undefined);
}
function calculateArea(shape) {
    if (isRectangle(shape)) {
        return shape.width * shape.height;
    }
    else {
        return Math.PI * Math.pow(shape.radius, 2);
    }
}
// 테스트 코드
console.log(calculateArea({ width: 10, height: 5 })); // 50
console.log(calculateArea({ radius: 7 })); // 153.93804002589985 (대략 π * 7²)
// 넓이를 계산하는 함수
function areaCalculate(shape) {
    // tpye 따라 분류 후 조건 실행
    switch (shape.type) {
        case "square":
            return Math.pow(shape.side, 2);
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        default:
            // exhaustiveness check -> 이중 안정 장치, 만약 타입을 지정 안했을때 에러 발생 하게, 여러 케이스 만들때 유효 할듯 싶다
            const _exhaustiveCheck = shape;
            throw new Error(`Unhandled shape: ${_exhaustiveCheck}`);
    }
}
// 테스트 코드
console.log(areaCalculate({ type: "square", side: 5 })); // 25
console.log(areaCalculate({ type: "circle", radius: 7 })); // 153.93804002589985
