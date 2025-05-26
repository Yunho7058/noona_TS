// 문제은행 - 1강 원시타입
// 문제 1. 다음 변수들의 타입을 지정해주세요
var userName; // 예: 이름
var userAge; // 예: 나이
var isAdmin; // 예: 관리자 여부
userName = "Alice";
userAge = 25;
isAdmin = true;
//## 문제 2. 아래 변수들에 적절한 타입과 초기값을 지정하세요.
// 변수 선언과 초기값 지정
var productName = "키보드"; // 상품 이름
var productPrice = 100000; // 상품 가격
var isAvailable = true; // 상품 재고 여부
// 예시 출력
console.log("\uC0C1\uD488\uBA85: ".concat(productName, ", \uAC00\uACA9: ").concat(productPrice, ", \uC7AC\uACE0 \uC5EC\uBD80: ").concat(isAvailable));
// 문제 3. 두 숫자를 더하는 함수를 작성하고, 함수의 매개변수와 반환값에 타입을 지정하세요.
var addNumbers = function (a, b) {
    return a + b;
};
console.log(addNumbers(5, 3));
//## 문제 4. 주어진 값을 받아 문자열로 변환하는 함수를 작성하세요. 값이 null 또는 undefined라면 "값이 없습니다"를 반환합니다
//* 힌트: 한 변수에 타입을 여러개를 받고싶다면 `|` (유니온타입) 을 쓸 수 있다 (예시: 문자열 또는 숫자 : string|number)
function stringifyValue(value) {
    if (value === null || value === undefined) {
        return "값이 없습니다.";
    }
    return "".concat(value);
}
// 함수 호출
console.log(stringifyValue("Hello")); // "Hello"
console.log(stringifyValue(null)); // "값이 없습니다"
console.log(stringifyValue(undefined)); // "값이 없습니다"
// 문제 5. 아래 함수는 두 값을 비교하여 결과를 반환합니다. 느슨한 동등성(`==`)과 엄격 동등성(`===`)의 차이를 이해하고,
// 함수의 동작 결과를 예측하세요.
// 힌트: unknown타입은 무슨 타입이던 다 받을 수 있는 타입이다. (뒤에서 배울 예정)
function compareValues(a, b) {
    if (a === b) {
        return "엄격한 동등성";
    }
    else if (a == b) {
        return "느슨한 동등성";
    }
    else {
        return "동등하지 않음";
    }
}
// 함수 호출 예시
console.log(compareValues(5, "5")); // 느슨한 동등성
console.log(compareValues(null, undefined)); // 동등하지 않음 -> 느슨한 동등성
console.log(compareValues(false, 0)); // 동등하지 않음 -> 느슨한 동등성
console.log(compareValues(NaN, NaN)); // 느슨한 동등성 -> 동등하지 않음
console.log(compareValues(42, 42)); // 엄격한 동등성
// 문제 6. 주어진 값이 원시 타입인지 아닌지 확인하는 함수를 작성하세요.
// 힌트: unknown타입은 무슨 타입이던 다 받을 수 있는 타입이다. (뒤에서 배울 예정)
// 힌트: Object() 를 공부해보세요
function isPrimitive(value) {
    // object 면 false null 예외
    if (value === null) {
        return true;
    }
    else if (typeof value === "object") {
        return false;
    }
    else {
        return true;
    }
}
// 함수 호출 예시
console.log(isPrimitive("Hello")); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(false)); // true
console.log(isPrimitive(null)); // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false
// ---------------------
// 문제 1. 아래 객체를 보고 user의 타입을 작성하세요
// type User = {
//   name: string;
//   isAdmin: boolean;
//   age?: number;
// };
var user = {
    name: "Alice",
    isAdmin: true,
};
user = {
    name: "Bob",
    age: 40,
    isAdmin: false,
};
// 문제 2. 숫자만 담을 수 있는 읽기 전용 배열을 작성하세요
var numbers = [1, 2, 3];
// 아래 코드는 오류가 발생해야 합니다
// numbers.push(4);
// numbers[0] = 42;
// 문제 3. 상품 배열에서 정보를 추출하는 함수 작성
//1. 상품 이름과 가격만을 포함하는 새로운 배열을 생성하는 함수를 작성하세요.
//2. 재고가 있는 상품만 포함하는 배열을 반환하는 함수를 작성하세요.
var products = [
    ["Laptop", 1000, true],
    ["Shoes", 50, false],
    ["Book", 20, true],
];
// 1. 상품 이름과 가격만 반환하는 함수 (리턴 타입 작성)
function getProductNamesAndPrices(products) {
    // 1. 이름이랑 가격만 -> map [] 배열안에 이름과 가격만 추출하기
    return products.map(function (_a) {
        var name = _a[0], price = _a[1];
        return [name, price];
    });
}
// 2. 재고가 있는 상품만 반환하는 함수 (리턴 타입 작성)
function getAvailableProducts(products) {
    // false 리턴하지말기
    return products.filter(function (el) { return el[2]; });
}
// 테스트
console.log(getProductNamesAndPrices(products));
// 기대 출력: [["Laptop", 1000], ["Shoes", 50], ["Book", 20]]
console.log(getAvailableProducts(products));
// 나이가 없으면 기본값 18 사용, 리턴 타입 작성
function updateUser(user) {
    // 구현
    return { name: user.name, age: 18 };
}
// 테스트
console.log(updateUser({ name: "Charlie" })); // { name: "Charlie", age: 18 }
console.log(updateUser({ name: "Dana", age: 25 })); // { name: "Dana", age: 25 }
var productList = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Shoes", price: 50, category: "Fashion" },
    { name: "Book", price: 20 },
];
// 매개변수 타입, 리턴 타입 작성
function getProductsByCategory(category) {
    // 구현
    return [];
}
// 테스트
console.log(getProductsByCategory("Electronics")); // ["Laptop"]
console.log(getProductsByCategory("Fashion")); // ["Shoes"]
console.log(getProductsByCategory("Books")); // []
