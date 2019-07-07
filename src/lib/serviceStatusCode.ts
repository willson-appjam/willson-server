
/*
**00 : 기능 번호
00** : 상태 번호

회원가입 = 100,
로그인 = 200 , 
유저 프로필 보기 = 300,
고민 카테고리 리스트 보기 = 400,
고민 카테고리 리스트 추가 = 500,
고민 감정 보기 = 600,
고민 질문 생성 = 700,
헬퍼가 받은 고민 리스트 = 800,
헬퍼 등록하기 = 900,
승낙 헬퍼 리스트 보기 = 1000,
헬퍼 프로필 보기 = 1100,
헬퍼 프로필 수정 = 1200, 
메인 : 헬퍼 이야기 = 1300,
요청 보내기 = 1400,
후기 목록 보기 = 1500,
후기 작성 = 1600,
후기 수정 = 1700,
마이 페이지 = 1800,
*/


const serviceStatusCode = {
  //회원가입
  ["SIGN_UP_SUCCESS"] : 100,
  ["SIGN_UP_DUPLICATE_DATA"]: 101,
  ["SIGN_UP_VALIDATION_ERROR"]: 102,

  //로그인
  ["SIGN_IN_SUCCESS"]: 200,
  ["SIGN_IN_VALIDATION_ERROR"]: 201,
  ["SIGN_IN_AUTHENTICATION_ERROR"]: 202,

  //유저 프로필 보기
  ["GET_USER_PROFILE_LIST_SUCCESS"]: 300,
  ["USER_PROFILE_LIST_VALIDATION_ERROR"]: 301,

  //후기 목록 보기 1500
  ["GET_REVIEW_LIST_SUCCESS"]: 1500,
  ["USER_REVIEW_LIST_VALIDATION_ERROR"]: 1501,

  //후기 작성 1600
  ["REVIEW_REGISTERED_SUCCESS"]: 1600,
  ["REVIEW_VALIDATION_ERROR"]: 1601,

  //후기 수정 1700
  ["MODIFIED_REVIEW_SUCCESS"]: 1700,
  ["MODIFIED_REVIEW_VALIDATION_ERROR"]: 1701,
  ["MODIFIED_REVIEW_PERMISSION_ERROR"]: 1702

}

export default serviceStatusCode