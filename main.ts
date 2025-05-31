// /*
// 제네릭 타입
// 타입을 변수처럼 사용, 파라미터 처럼

// */

// type ArrTypeS = string[];

// // 제네릭 타입
// type ArrType<T> = T[];

// //할당하는 순간 타입 지정
// const numberArray: ArrType<number> = [1, 2, 3];
// const number: number[] = [1, 2, 3];

// // 주로 서버로 부터 데이터 받을때 많이 사용함
// // ex. 1. 영화정보, 2. 티비정보 이런식으로 데이터 받을때, 데이터 안에 속성이 다르기 때문에
// // 제너릭 타입이 받을때마다 타입을 지정해줌
// type move1 = {
//   name: string;
//   page: number;
//   totalPage: number;
//   data: { title: string };
// };
// type item1 = {
//   name: string;
//   page: number;
//   totalPage: number;
//   data: { name: string };
// };
// // 현제 위에 타입을 보면 반복되는 속성들이 많음, 하지만 data 속성은 달라 합치기가 힘들어 보임
// // 그때 제네릭 타입 사용
// type api<T> = {
//   name: string;
//   page: number;
//   totalPage: number;
//   data: T[];
// };
// // type move = {title:string} ->  type moveApi = api<move>;  요런식으로 사용 가능
// type moveApi = api<{ title: string }>;
// type itemApi = api<{ name: string }>;
// //약간 상속 받고 추가한 느낌?

// let data1: moveApi = {
//   name: "string",
//   page: 5,
//   totalPage: 5,
//   data: [{ title: "string" }, { title: "string" }, { title: "string" }],
// };

// let data2: itemApi = {
//   name: "string",
//   page: 5,
//   totalPage: 5,
//   data: [{ name: "string" }],
// };

// // useState 에서 제네릭 타입 많이 사용
// // 이제까지 <> 제너릭 안주고 잘 사용함, useState , 알아서 추론을 해줌 -> 근데 되도록 자제하고 초기값 정해주기
// /*
// function useState<T>(state:T):[T,함수[T]] {
//   return [값,함수]
// }

// const [value,setValue] = useState(true)
// const [value2,setValue2] = useState<boolean>(false)

// useState 사용할때 타입, 초기값 지정하기
// */

// // 심화편
// //1. 조건부 타입

// type IsString<T> = T extends string ? "yes" : "no";

// type result = IsString<string>; // yes
// type result1 = IsString<number>; // no

// //2. mapped type (반복문 처럼 타입 확인)

// type user = {
//   name: string;
//   age: number;
//   adult: boolean;
// };

// const user1: Subset<user> = { name: "gooo", age: 12 };
// const user2: Subset<user> = { adult: false };

// // ? 추가해서 옵션 추가도 가능하지만
// type Subset<T> = {
//   [K in keyof T]?: T[K]; // K 는 name, age, adult 돌아감, uset.name 이런식으로
// };
// // T 의 key 를 하나하나 가져옴 반복문 처럼
// // 하나하나 타입에 ? 추가할수 있지만 [K in keyof T]?: T[K] 추가해서 모드다 ? 처리
// // 타입이 하나할때는 ? 추가해도 괜찮은데, 한번에 사용할수 있게 mapped type 사용

// interface Pair<T, U> {
//   first: T;
//   second: U;
//   display(): void;
//   display2?: () => void;
// }

// const pari: Pair<string, number> = {
//   first: "good",
//   second: 2,
//   display() {
//     console.log(this.first + "는" + this.second);
//   },
// };

// pari.display();
// // 여기서 말하는건 제너릭 타입에는 T U K 다양한 타입 넣을수 있다.

// // 리터널 타입 -> 내가 정한 문자를 타입 지정

// let direction: "left" | "right";
// direction = "left";
// // margin 과 함께 사용도 가능
// type Margin = `margin-${"left" | "right"}`;

// export {};

/*
유틸리티 타입?
공개와 비공개 자료 구분
 1. Omit -> 상관 관계가 있는 타입들 있을때 사용 Omit<특정타입,특정타입에 뺴고싶은 속성>
 굳이 따로 비밀번호가 있는 타입을 만들필요 없음
 뺴기

 2. Pick 
  type User = {
    id: number;
    name: string;
    email: string;
    password: string;
  };

  // id와 name만 뽑음
  type PublicProfile = Pick<User, "id" | "name">;

  결과:
  {
    id: number;
    name: string;
  }

  const profile: PublicProfile = { id: 1, name: "Alice" };

 3. Partial
  type Partial<T> = { [P in keyof T]?: T[P] | undefined; } ...

  type User = {
    name: string;
    email: string;
  };

  // 모든 속성이 선택적(optional)이 됨
  type PartialUser = Partial<User>;


  결과 타입:
  {
    name?: string;
    email?: string;
  }

  const user: PartialUser = {}; // 가능!
  const user2: PartialUser = { name: "Alice" }; // 이것도 가능


 record 타입
두링뭉실하게 타입 지정?

*/
/*
extend
*/

interface Track {
  //type: "track";
  title: string;
  releaseDate: string;
}
interface Artist {
  //type: "artist";
  name: string;
  debuYear: number;
}

// 제너릭 타입과 extends 사용하여 타입 식별하기

// 식별하는 유니온 -> type 라는 키 만들기 type: "track" , type: "artist";
// 하지만 모든 곳에 타입 넣기는 빡셈
// 제너릭 타입 T extends "track"| "artist" 둘중 하나여야 한다.
type SearchItem<T extends "track" | "artist"> = T extends "track"
  ? Track
  : Artist;
const result: SearchItem<"track"> = {
  //type: "track",
  title: "string",
  releaseDate: "string",
  // name: "string", // track 이기 때문에 오류 발생
  // debuYear: 5,
};

// infer 추론해줘
// 설명 함수타입 지정해주기 T 아무거나 받을수 없기때문에
// 제너릭 타입에 T 은 무조건 타입만 들어갈수 있음
type ReturnTypeOfFuntion<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { name: "123", age: 5 };
}
type UserInfo = ReturnTypeOfFuntion<typeof getUser>;

// infer 을 통해 타입을 추론해서 가져옴 userInfo 에 마우스 가져가면, 함수의 리턴값 타입을 보여주고있음
// 함수 떄도 사용하고, 비동기 요청할때도 추론을 해줌 , 프로미스, 배연안에 있을때도 추론

// 요소 타입에 타입이 올텐데, extends 제약을 걸어 배열만 올수 있다
// U를 추론해줘 있으면 U 없으면 그대로 T
type ElementType<T> = T extends (infer U)[] ? U : T;
type ArrTS = number[];

type SingleN = ElementType<ArrTS>;

// as 는 확정, 별명?  (is 는 이거다 확정)
// 타입추론이 안될때 as 많이 사용함

let str: unknown = "hellow";
//console.log(str.length)
//강제로 string 타입으로 변경
let newStr = str as string;
console.log(newStr.length);

// as 사용하기가 힘들어 보임
