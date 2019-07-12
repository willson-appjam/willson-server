
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

성격 리스트 가져오기 = 2000,
유저의 헬퍼 결정하기 = 2100
*/



const serviceStatusCode: any = {
  1: "DATABASE_ERROR",
  2: "NOT_AUTHENTICATION_ERROR",
  //회원가입
  100: "SIGN_UP_SUCCESS",
  101: "SIGN_UP_DUPLICATE_DATA",
  102: "SIGN_UP_VALIDATION_ERROR",
  103: "SIGN_UP_ERROR_ANYWAY",

  //로그인
  200: "SIGN_IN_SUCCESS",
  201: "SIGN_IN_VALIDATION_ERROR",
  202: "SIGN_IN_AUTHENTICATION_ERROR",
  203: "SIGN_IN_ERROR_ANYWAY",

  //유저 프로필
  300: "GET_USER_PROFILE_LIST_SUCCESS",
  301: "USER_PROFILE_LIST_VALIDATION_ERROR",
  302: "USER_PROFILE_LIST_ERROR_ANYWAY",

  400: "GET_CATEGORY_LIST_SUCCESS",
  401: "GET_CATEGORY_LIST_VALIDATION_ERROR",
  402: "GET_CATEGORY_LIST_ERROR_ANYWAY",

  500: "POST_CATEGORY_LIST_SUCCESS",
  501: "POST_CATEGORY_LIST_VALIDATION_ERROR",
  502: "POST_CATEGORY_LIST_ERROR_ANYWAY",

  600: "GET_FEELING_LIST_SUCCESS",
  601: "GET_FEELING_LIST_VALIDATION_ERROR",
  602: "GET_FEELING_LIST_ERROR_ANYWAY",

  700: "POST_USER_QUESTION_SUCCESS",
  701: "POST_USER_QUESTION_VALIDATION_ERROR",
  702: "POST_USER_QUESTION_ERROR_ANYWAY",
  703: "POST_USER_QUESTION_INSERT_ERROR",

  800: "GET_USER_QUESTION_LIST",
  801: "GET_USER_QUESTION_LIST_ERROR_ANYWAY",

  900: "HELPER_REGISTRATION_SUCCESS",
  901: "HELPER_REGISTRATION_VALIDATION_ERROR",
  902: "HELPER_REGISTRATION_ERROR_ANYWAY",

  1000: "GET_HELPER_LIST_SUCCESS",
  1001: "HELPER_LIST_QUESTION_DOES_NOT_EXIST",
  1002: "GET_HELPER_LIST_ERROR_ANYWAY",

  1100: "GET_HELPER_PROFILE_SUCCESS",
  1101: "PROFILE_HELPER_DOES_NOT_EXIST",
  1102: "GET_HELPER_PROFILE_ERROR_ANYWAY",

  1200: "UPDATE_HELPER_PROFILE_SUCCESS",
  1201: "USER_IS_NOT_HELPER",
  1202: "UPDATE_HELPER_PROFILE_ERROR_ANYWAY",
  1203: "UPDATE_HELPER_PROFILE_VALIDATION_ERROR",

  1300: "GET_HELPER_STORY_SUCCESS",
  1301: "MISSING_HELPER_STORY",
  1302: "GET_HELPER_STORY_ERROR_ANYWAY",

  1400: "HELPER_SELECTION_SUCCESS",
  1401: "HELPER_SELECTION_QUESTION_DOES_NOT_EXIST",
  1402: "SELECTION_HELPER_DOES_NOT_EXIST",
  1403: "HELPER_SELECTION_ERROR_ANYWAY",
  1404: "HELPER_SELECTION_ALREADY_MATCHING",

  1500: "GET_REVIEW_LIST_SUCCESS",
  1501: "USER_REVIEW_LIST_VALIDATION_ERROR",
  1502: "USER_REVIEW_LIST_ERROR_ANYWAY",

  1600: "REVIEW_REGISTERED_SUCCESS",
  1601: "REVIEW_VALIDATION_ERROR",
  1602: "REVIEW_REGISTERED_ERROR_ANYWAY",

  1700: "MODIFIED_REVIEW_SUCCESS",
  1701: "MODIFIED_REVIEW_VALIDATION_ERROR",
  1702: "MODIFIED_REVIEW_PERMISSION_ERROR",
  1703: "MODIFIED_REVIEW_ERROR_ANYWAY",

  2000: "GET_PERSONALITY_LIST_SUCCESS",
  2001: "GET_PERSONALITY_LIST_VALIDATION_ERROR",
  2002: "GET_PERSONALITY_LIST_ERROR_ANYWAY",

  2100: "USER_SELECTION_SUCCESS",
  2101: "USER_SELECTION_VALIDATION_ERROR",
  2102: "USER_SELECTION_ERROR_ANYWAY",
  2103: "USER_SELECTION_ALREADY_MATCHING",

  2200: "UPDATE_USER_QUESTION_STATUS_SUCCESS",
  2201: "UPDATE_USER_QUESTION_VALIDATION_ERROR",
  2202: "UPDATE_USER_QUESTION_ERROR_ANYWAY",
  2203: "UPDATE_USER_QUESTION_NOT_FOUND",

  2300: "GET_MAIN_REVIEW_LIST_SUCCESS",
  2301: "MAIN_REVIEW_LIST_ERROR_ANYWAY",

  2400: "GET_HELPER_EXIST_CHECK_SUCCESS",
  2401: "GET_HELPER_EXIST_CHECK_ERROR_ANYWAY",
  
  2500: "GET_HELPER_MYPROFILE_SUCCESS",
  2501: "MYPROFILE_HELPER_DOES_NOT_EXIST",
  2502: "GET_HELPER_MYPROFILE_ERROR_ANYWAY",

  2600: "UPDATE_MATCHING_STATUS_SUCCESS",
  2601: "UPDATE_MATCHING_STATUS_ERROR_ANYWAY",
  2602: "UPDATE_MATCHING_STATUS_NOT_FOUND",
  
}

export default serviceStatusCode