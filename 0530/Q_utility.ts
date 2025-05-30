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

type User = {
  name: string;
  email: string;
  password: string;
};

// 함수 작성
function updateUserForm(user: User, updates: Partial<User>): User {
  // 작성되어 있는 유저 정보와 작성한 정보 업데이트 -> 비밀번호? 이메일 변경할때 사용
  return { ...user, ...updates };
}

// 테스트 코드
const currentUser = {
  name: "Alice",
  email: "alice@example.com",
  password: "1234",
};
const updatedForm = { email: "new-email@example.com" };

console.log(updateUserForm(currentUser, updatedForm));
// 기대 출력: { name: "Alice", email: "new-email@example.com", password: "1234" }

/*
문제 2. 프로필 페이지에 표시할 사용자 정보에서 필요한 속성만 선택하는 문제입니다.
기본 타입 정의:

UserProfile: 사용자 프로필 정보 (아이디, 이름, 이메일, 주소).
Pick을 활용:

프로필 페이지에 필요한 데이터(아이디와 이름)만 추출하는 타입을 정의하세요.
함수 작성:

함수 이름: getProfileSummary.
입력: 전체 사용자 정보.
출력: 필요한 속성만 포함된 객체.
*/
type UserProfile = {
  id: number;
  name: string;
  email: string;
  address: string;
};

// 아이디와 비밀번호만 선택하기
function getProfileSummary(
  user: UserProfile
): Pick<UserProfile, "id" | "name"> {
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

/*

문제 3. 데이터베이스 저장 시 민감한 정보를 제외하는 문제입니다.
기본 타입 정의:

User: 사용자 정보 (이름, 이메일, 비밀번호, 역할).
Omit을 활용:

민감한 정보를 제외한 타입을 정의하세요. (비밀번호는 제외)
함수 작성:

함수 이름: filterSensitiveInfo.
입력: 전체 사용자 정보.
출력: 민감한 정보가 제외된 객체.
*/
type TUser = {
  name: string;
  email: string;
  password: string;
  role: string;
};

// Omit 이용해서 특정 속성 뺴기,
function filterSensitiveInfo(
  user: Omit<TUser, "password"> // 비밀번호 속성 제거
): Omit<TUser, "password"> {
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
// 기대 출력: { name: "Alice", email: "alice@example.com", role: "admin" }

/*
문제 4. 팀 관리 시스템을 설계하세요. 각 팀은 여러 멤버로 구성되며, 관리자는 특정 역할에 따라 데이터를 조작할 수 있습니다.
기본 타입 정의:

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "developer" | "designer" | "manager";
  isActive: boolean;
};


함수 요구사항:
1. createTeamMember:
새 팀원을 생성하는 함수.
Partial을 활용하여 입력 데이터 중 일부만 제공되더라도 기본값으로 초기화합니다.
기본값:
role: "developer".
isActive: true.
filterTeamMembers:

2. 특정 조건에 맞는 팀원만 필터링하는 함수.
Pick을 사용해 필터링 기준을 정의합니다.
예: role: "designer" 또는 isActive: false.
removeSensitiveInfo:

3. 팀원 목록에서 민감한 정보를 제거하는 함수.
Omit을 사용해 이메일 주소를 제외한 데이터를 반환합니다.
*/
type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "developer" | "designer" | "manager";
  isActive: boolean;
};

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
function createTeamMember(
  data: Partial<TeamMember> & Pick<TeamMember, "id" | "name"> // 기존 정보는 유지하고 새로운 아이디,이름 받기
): TeamMember {
  return {
    email: "",
    role: "developer",
    isActive: true,
    ...data,
  };
}

// 2. `filterTeamMembers` 함수 작성
// 팀 전체 데이터 , 필터링 할 데이터, role,isActive

function filterTeamMembers(
  members: TeamMember[],
  filter: Pick<TeamMember, "role" | "isActive">
): TeamMember[] {
  // 필터 함수 사용
  return members.filter(
    (member) =>
      member.role === filter.role && member.isActive === filter.isActive
  );
}

// 3. `removeSensitiveInfo` 함수 작성
function removeSensitiveInfo(
  members: TeamMember[]
): Omit<TeamMember, "email">[] {
  // 이메일만 빼고, 나머지 정보 다시 배열로 담아 리턴
  return members.map(({ email, ...rest }) => rest);
}

// 테스트 코드
const members: TeamMember[] = [
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
// 기대 출력: [{ id: 1, name: "Alice", role: "developer", isActive: true }, ...]

export {};
