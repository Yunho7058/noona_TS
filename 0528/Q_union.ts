/*
문제은행 9강 - 유니온 타입
문제 1. 다양한 데이터 타입을 입력받아, 입력에 따라 다른 처리를 수행하는 함수를 작성하세요.
입력은 다음 세 가지 형태 중 하나입니다:

숫자 배열: 배열의 합계를 반환합니다.
문자열 배열: 배열의 모든 문자열을 연결한 결과를 반환합니다.
객체 { message: string }: message 속성을 대문자로 변환한 문자열을 반환합니다.
*/

// 사용자로 부터 받는 인풋값, 타입 네이밍이 쉽게하는 방법, 배열로 들어옴
type TInput = number[] | string[] | { message: string };

// 매개변수, 리턴타입 정의필요
function processInput(input: TInput): number | string {
  if (Array.isArray(input)) {
    if (typeof input[0] === "number") {
      //타입스크립트에서 숫자인지 그래서 확실하게 판단할수가 없다..
      return (input as number[]).reduce((a, b) => a + b, 0);
    } else if (typeof input[0] === "string") {
      return input.join("");
    }
  } else if ("message" in input) {
    return input.message.toUpperCase();
  }
  // throw new Error("지원하지 않는 입력 타입입니다.");
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
  constructor(public brand: string) {}
}

class Bike {
  constructor(public type: string) {}
}
type Vehicle = Car | Bike;

function processVehicle(vehicle: Vehicle): string {
  // 자동차, 오토바이 구별후 이름 출력 , 클래스도 구별가능
  if (vehicle instanceof Car) {
    return vehicle.brand.toUpperCase();
  } else if (vehicle instanceof Bike) {
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
//console.log(processVehicle("unknown")); // 에러 발생

/*
문제3. in을 활용한 사용자 관리
시스템에는 두 종류의 사용자가 있습니다:

Admin 사용자: { type: "admin"; permissions: string[] }
User 사용자: { type: "user"; email: string }
processUser라는 함수를 작성하세요. 함수는 입력으로 Admin 또는 User 객체를 받아 다음과 같이 처리합니다:

Admin: 권한 목록(permissions)을 ,로 연결한 문자열을 반환합니다.
User: 이메일 주소(email)을 반환합니다.
*/

type Admin = { type: "admin"; permissions: string[] };
type User = { type: "user"; email: string };

function processUser(user: Admin | User): string {
  if ("permissions" in user) {
    // 배열 문자열 합치기
    return user.permissions.join(",");
  } else if ("email" in user) {
    return user.email;
  }
  throw new Error("알 수 없는 사용자 타입입니다.");
}

// 테스트 코드
console.log(processUser({ type: "admin", permissions: ["read", "write"] })); // "read,write"
console.log(processUser({ type: "user", email: "user@example.com" })); // "user@example.com"
//console.log(processUser({ type: "guest" })); // 에러 발생

/*
문제 4. 아래와 같은 유니온 타입을 처리하는 함수를 작성하세요:
Rectangle 객체: { width: number; height: number }
Circle 객체: { radius: number }
함수는 다음 규칙에 따라 동작합니다:

Rectangle이면 넓이를 반환합니다. (가로 × 세로)
Circle이면 넓이를 반환합니다. (π × 반지름²)
*/

type Rectangle = { width: number; height: number };
type Circle = { radius: number };

// 사용자 정의 타입 가드
function isRectangle(shape: unknown): shape is Rectangle {
  return "width" in shape && "height" in shape;
}

function calculateArea(shape: Rectangle | Circle): number {
  if (isRectangle(shape)) {
    return shape.width * shape.height;
  } else {
    return Math.PI * shape.radius ** 2;
  }
}

// 테스트 코드
console.log(calculateArea({ width: 10, height: 5 })); // 50
console.log(calculateArea({ radius: 7 })); // 153.93804002589985 (대략 π * 7²)

/*
문제5. 유니온 타입의 문제점과 해결 방법
유니온 타입의 문제점
아래와 같은 두 가지 유니온 타입을 처리하는 함수가 있습니다:

Square: { type: "square"; side: number }
Circle: { type: "circle"; radius: number }
calculateArea라는 함수는 두 타입의 넓이를 계산하려고 하지만, 유니온 타입을 제대로 처리하지 않고 사용할 경우 런타임 에러가 발생할 가능성이 생길 수 있다. 이를 해결 방법을 작성하세요.
해결 방법:

식별 가능한 유니온(type 속성)을 사용하여 타입을 안전하게 좁히는 코드를 작성하세요.
exhaustiveness check를 추가하여, 새로운 타입이 추가되더라도 타입 안정성을 유지하도록 구현하세요.
*/

type Shape = { side: number } | { radius: number };

// 넓이를 계산하는 함수
function areaCalculate(shape: Shape): number {
  // 여기에 구현
}

// 테스트 코드
console.log(areaCalculate({ side: 5 })); // 기대 출력: 25
console.log(areaCalculate({ radius: 7 })); // 기대 출력: 153.93804002589985
