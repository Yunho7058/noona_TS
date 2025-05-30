"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 배송비 데이터 정의
const shippingCosts = {
    US: 10,
    EU: 15,
    ASIA: 20,
    AFRICA: 25,
};
// 배송비 계산 함수 작성
function calculateShippingCost(region, costs) {
    return costs[region];
}
// 테스트 코드
console.log(calculateShippingCost("US", shippingCosts)); // 10
console.log(calculateShippingCost("EU", shippingCosts)); // 15
console.log(calculateShippingCost("ASIA", shippingCosts)); // 20
console.log(calculateShippingCost("AFRICA", shippingCosts)); // 25
// console.log(calculateShippingCost("AUSTRALIA", shippingCosts)); // 에러 발생
/*
2. 학생들의 점수를 기록하고 평균 점수를 계산하는 문제입니다.
요구사항:

학생 이름(string)과 점수(number)를 매핑하는 데이터를 Record 타입으로 정의하세요.
평균 점수를 계산하는 함수를 작성하세요.
함수 작성:

함수 이름: calculateAverageScore.
입력: 학생 점수 데이터(Record<string, number>).
출력: 모든 학생의 평균 점수(number).
*/
// 학생 점수 데이터 정의
const scores = {
    Alice: 85,
    Bob: 92,
    Charlie: 78,
};
// 평균 점수 계산 함수 작성
function calculateAverageScore(scores) {
    const values = Object.values(scores);
    const total = values.reduce((sum, score) => sum + score, 0);
    return values.length ? total / values.length : 0;
}
// 테스트 코드
console.log(calculateAverageScore(scores)); // 85
/*
문제 3. 쇼핑몰에서 각 제품의 이름과 가격을 매핑하고, 특정 제품의 가격을 업데이트하는 기능을 구현하세요.
요구사항:

제품 이름(string)과 가격(number)을 매핑하는 데이터를 Record 타입으로 정의하세요.
특정 제품의 가격을 업데이트하는 함수를 작성하세요.
함수 작성:

함수 이름: updateProductPrice.
입력: 제품 가격 데이터(Record<string, number>), 업데이트할 제품 이름과 새로운 가격.
출력: 업데이트된 제품 가격 데이터(Record<string, number>).
*/
// 제품 가격 데이터 정의
const prices = {
    Laptop: 1000,
    Phone: 500,
    Tablet: 300,
};
// 가격 업데이트 함수 작성
function updateProductPrice(prices, product, newPrice) {
    return Object.assign(Object.assign({}, prices), { [product]: newPrice });
}
// 테스트 코드
console.log(updateProductPrice(prices, "Phone", 550));
