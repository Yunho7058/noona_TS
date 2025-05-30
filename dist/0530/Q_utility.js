"use strict";
/*
문제은행 12. 유틸리티 타입
문제 1. 회원가입 폼 데이터의 일부만 채워진 상태를 처리하기 위해, 모든 속성이 선택적인 타입을 생성하는 문제입니다.
기본 타입 정의:

User: 회원 정보 (이름, 이메일, 비밀번호).
Partial을 활용: 모든 속성을 선택 속성으로 변경하는 타입을 생성하세요.
함수 작성:

함수 이름: updateUserForm.
입력: 기존 사용자 데이터와 업데이트된 폼 데이터.
출력: 업데이트된 사용자 데이터.
*/
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 함수 작성
function updateUserForm(user, updates) {
    // 작성되어 있는 유저 정보와 작성한 정보 업데이트 -> 비밀번호? 이메일 변경할때 사용
    return Object.assign(Object.assign({}, user), updates);
}
// 테스트 코드
const currentUser = {
    name: "Alice",
    email: "alice@example.com",
    password: "1234",
};
const updatedForm = { email: "new-email@example.com" };
console.log(updateUserForm(currentUser, updatedForm));
// 아이디와 비밀번호만 선택하기
function getProfileSummary(user) {
    // 받은 유저정보에서 아이디와 이름만 추출해서 리턴값으로 전달
    const { id, name } = user;
    return { id, name };
}
// 테스트 코드
const userProfile = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    address: "123 Main St",
};
console.log(getProfileSummary(userProfile)); // 기대 출력: { id: 1, name: "Alice" }
// Omit 이용해서 특정 속성 뺴기,
function filterSensitiveInfo(user // 비밀번호 속성 제거
) {
    const { name, email, role } = user;
    // 사용자들한테 보여줄떄 사용
    return { name, email, role };
}
// 테스트 코드
const userInfo = {
    name: "Alice",
    email: "alice@example.com",
    password: "1234",
    role: "admin",
};
console.log(filterSensitiveInfo(userInfo));
// 새팀 생성하는 함수 , 필터 하는 함수 , 제거 하는 함수
/*
Partial<T>
모든 속성을 선택적으로

Pick<T, K>
특정 속성만 선택

Omit<T, K>
특정 속성 제거
*/
// 1. `createTeamMember` 함수 작성
// 타입받고 ,새로운 팀원 정보 합쳐서 리턴하기
function createTeamMember(data // 기존 정보는 유지하고 새로운 아이디,이름 받기
) {
    return Object.assign({ email: "", role: "developer", isActive: true }, data);
}
// 2. `filterTeamMembers` 함수 작성
// 팀 전체 데이터 , 필터링 할 데이터, role,isActive
function filterTeamMembers(members, filter) {
    // 필터 함수 사용
    return members.filter((member) => member.role === filter.role && member.isActive === filter.isActive);
}
// 3. `removeSensitiveInfo` 함수 작성
function removeSensitiveInfo(members) {
    // 이메일만 빼고, 나머지 정보 다시 배열로 담아 리턴
    return members.map((_a) => {
        var { email } = _a, rest = __rest(_a, ["email"]);
        return rest;
    });
}
// 테스트 코드
const members = [
    {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        role: "developer",
        isActive: true,
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        role: "designer",
        isActive: false,
    },
    {
        id: 3,
        name: "Charlie",
        email: "charlie@example.com",
        role: "manager",
        isActive: true,
    },
];
// 1. 새 팀원 생성
const newMember = createTeamMember({ id: 4, name: "Diana" });
console.log(newMember);
// 기대 출력: { id: 4, name: "Diana", email: "", role: "developer", isActive: true }
// 2. 필터링된 팀원 목록
const activeDesigners = filterTeamMembers(members, {
    role: "designer",
    isActive: true,
});
console.log(activeDesigners);
// 기대 출력: []
// 3. 민감한 정보 제거
const sanitizedMembers = removeSensitiveInfo(members);
console.log(sanitizedMembers);
