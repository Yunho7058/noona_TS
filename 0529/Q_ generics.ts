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
function getFirstElement<T>(array: T[]): T | undefined {
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
function isNumberArray<T>(array: T[]): boolean {
  // 배열에 첫 요소 검사, 아니면 맵핑?, 두번째 세번째 요소거 검사 필요
  // every 타입 검사
  return array.every((item) => typeof item === "number");
}

// 테스트 코드
console.log(isNumberArray([1, 2, 3])); // true
console.log(isNumberArray(["a", "b", "c"])); // false
console.log(isNumberArray([])); // true (빈 배열은 숫자 배열로 간주)

/*
문제3. 다음 조건을 만족하는 조건부 타입과 함수를 작성하세요.
조건부 타입 정의

타입 이름: IsArray<T>
입력 타입 T가 배열 타입이면 true를 반환합니다.
그렇지 않으면 false를 반환합니다.
조건부 타입을 활용하는 함수

함수 이름: checkArrayType
입력: unknown 타입의 값.
출력: 입력값이 배열이면 "This is an array."를, 그렇지 않으면 "This is not an array."를 반환합니다.
*/

// 조건부 타입 정의
// 배열이면 true, 아니면 false 어렵다..
type IsArray<T> = T extends Array<any> ? true : false;

// 조건부 타입을 활용한 함수
function checkArrayType<T>(value: T): string {
  // 배열인지 맞는지 검사
  if (Array.isArray(value)) {
    return "This is an array.";
  } else {
    return "This is not an array.";
  }
}

// 테스트 코드
console.log(checkArrayType([1, 2, 3])); // "This is an array."
console.log(checkArrayType("Hello")); // "This is not an array."
console.log(checkArrayType({ key: "value" })); // "This is not an array."

/*
문제4. 객체의 모든 속성에 대해 기본값을 추가하는 타입을 작성하세요.
유틸리티 타입 정의:

타입 이름: WithDefault<T>
입력: 객체 타입 T
출력: 모든 속성 값의 타입이 [originalType, defaultType]의 튜플로 변경된 타입.
테스트:

WithDefault<T>를 활용하여 객체 타입을 변환하고, 변환된 타입의 객체를 작성하세요.
*/

//type Subset<T> = {
//  [K in keyof T]?: T[K]; // K 는 name, age, adult 돌아감, uset.name 이런식으로
//};

// Mapped Type 정의
type WithDefault<T> = {
  [K in keyof T]: [T[K], T[K]]; // [originalType, defaultType]
};

// 테스트 코드
type Original = { id: number; name: string; isActive: boolean };
type WithDefaults = WithDefault<Original>;

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
function createObject<K extends string | number | symbol, V>(
  key: K,
  value: V
): { [P in K]: V } {
  return { [key]: value } as { [P in K]: V };
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
function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map((item) => item[key]);
}

// 테스트 코드
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

console.log(pluck(users, "id")); // [1, 2]
console.log(pluck(users, "name")); // ["Alice", "Bob"]
