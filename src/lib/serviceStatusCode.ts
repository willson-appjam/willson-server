
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
마이 페이지 = 1700,
*/


const errorCode = {
  ["SIGN_UP_SUCCESS"] : 101,
  ["SIGN_UP_DUPLICATE_DATA"]: 102,
  ["SIGN_UP_VALIDATION_ERROR"]: 103,

  ["SIGN_IN_SUCCESS"]: 200,

  ["HELPER_REGISTRATION_SUCCESS"] : 900,
  ["HELPER_REGISTRATION_DUPLICATE_USER"]: 901, //.
  ["HELPER_REGISTRATION_VALIDATION_ERROR"]: 902,

  ["GET_HELPER_LIST_SUCCESS"]: 1000,
  ["HELPER_LIST_QUESTION_DOES_NOT_EXIST"]: 1001,

  ["GET_HELPER_PROFILE_SUCCESS"]: 1100,
  ["PROFILE_HELPER_DOES_NOT_EXIST"]: 1101,

  ["UPDATE_HELPER_PROFILE_SUCCESS"]: 1200,
  ["USER_IS_NOT_HELPER"]: 1201,

  ["GET_HELPER_STORY_SUCCESS"]: 1300,
  ["MISSING_HELPER_STORY"]: 1301,

  ["HELPER_SELECTION_SUCCESS"]: 1400,
  ["HELPER_SELECTION_QUESTION_DOES_NOT_EXIST"]: 1401,
  ["SELECTION_HELPER_DOES_NOT_EXIST"]: 1402


}

export default errorCode