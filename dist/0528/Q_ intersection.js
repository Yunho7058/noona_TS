"use strict";
/*
문제은행 6강 교차타입
문제1. 상품(Product)과 할인(Discount) 정보를 병합하여 새로운 타입을 정의하고, 할인 적용 후의 가격을 계산하는 함수를 작성하세요.
Product 타입:
id: 숫자
name: 문자열
price: 숫자
Discount 타입:
discountPercentage: 숫자
Product & Discount 타입을 기반으로 할인된 가격을 반환하는 함수를 작성하세요:

함수 이름: calculateDiscountedPrice
입력: 교차 타입 객체
출력: 할인된 가격(숫자)
*/
Object.defineProperty(exports, "__esModule", { value: true });
function calculateDiscountedPrice(item) {
    return item.price - item.price * (item.discountPercentage / 100);
}
// 테스트 코드
const discountedProduct = {
    id: 101,
    name: "Laptop",
    price: 1000,
    discountPercentage: 20,
};
console.log(calculateDiscountedPrice(discountedProduct)); // 800
function printOrderSummary(order) {
    return `Order ${order.orderId} (Phone: ${order.phone})`;
}
// 테스트 코드
const orderDetails = {
    phone: "123-456-7890",
    address: "123 Main St",
    orderId: 2023,
    items: ["Laptop", "Mouse"],
};
console.log(printOrderSummary(orderDetails)); // "Order 2023 (Phone: 123-456-7890)"
// 사용자 데이터를 병합하는 함수
function mergeUserData(profile, activity) {
    // 리턴 타입 교차, 들어오는 변수 합쳐서 리턴해주기
    return Object.assign(Object.assign({}, profile), activity);
}
// 사용자 요약 정보를 반환하는 함수
function getUserSummary(user) {
    return `사용자 ${user.id} - ${user.name} (${user.email}) - 마지막 로그인: ${user.lastLogin.toISOString()}`;
}
// 테스트 코드
const profile = { id: 1, name: "Alice", email: "alice@example.com" };
const activity = {
    lastLogin: new Date("2024-01-01T10:00:00Z"),
    actions: ["login", "viewed dashboard", "logout"],
};
const mergedUser = mergeUserData(profile, activity);
console.log(getUserSummary(mergedUser));
