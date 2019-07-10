BaseUrl =>  <b>host:port/api</b>

|           기능            |               URL               | 메소드 | 요청값 |
| :-----------------------: | :-----------------------------: | :----: | :----: |
|         회원가입          |          /user/signup           |  POST  |  body  |
|          로그인           |          /user/signin           |  POST  |  body  |
|     유저 프로필 보기      |     /user/profile/:user_idx     |  GET   | params |
| 고민 카테고리 리스트 보기 | /concern/category/:category_idx |  GET   |  body  |
| 고민 카테고리 리스트 추가 |        /concern/category        |  POST  |  body  |
|      고민 감정 보기       |        /concern/feeling         |  GET   |   X    |
|      고민 질문 생성       |        /concern/question        |  POST  |  body  |
|  헬퍼가 받은 고민 리스트  |          /concern/list          |  GET   |   X    |
|      헬퍼: 등록하기       |      /helper/registration       |  POST  |  body  |
|   승낙 헬퍼 리스트 보기   |          /helper/list           |  GET   |  body  |
|     헬퍼 프로필 보기      |   /helper/profile/:helper_idx   |  GET   | params |
|     헬퍼 프로필 수정      |   /helper/profile/:helper_idx   |  PUT   | params |
|     헬퍼 프로필 삭제      |   /helper/profile/:helper_idx   | DELETE | params |
|     메인: 헬퍼 이야기     |          /helper/story          |  GET   |   X    |
|        요청 보내기        |        /helper/selection        |  POST  |  body  |
|      후기 목록 보기       |       /review/:helper_idx       |  GET   | params |
|         후기 작성         |             /review             |  POST  |  body  |
|         후기 수정         |       /review/:review_id        |  PUT   |  body  |
|         후기 삭제         |       /review/:review_id        | DELETE |  body  |
|        마이페이지         |        /mypage/:user_idx        |  GET   | params |
|       유저의 헬퍼 결정하기  |        /user/selection         |  POST  | body |
|      감정상태리스트 가져오기  |        /concern/personality         |  GET  | X |
|      상담 종료하기         |        /concern/question         |  PUT | X |
|      메인: 질문자들의 후기       |        /review/story        |  GET  | X |




### 회원가입

url : <b>/api/user/signup</b>

method : <b>POST</b>

header =>

> Request

```java
{
	
  	nickname: String,
  	gender: Enum('남','여')
  	age: int,
	email: String,
	password: String,
	device_token:String
  	
}
```

> Response

```java
성공 = 200
{
	code: 100,
    message: SIGN_UP_SUCCESS,
    data: {
        body: { }
    }
}


실패 = 500
{
    code: int,
    message: String,
    data: {
        body: {
            nickname: String,
            gender: String,
            age: String,
            email: String,
            password: String,
            device_token: String,
            user_level: String
        }
    }
}
    
 101: SIGN_UP_DUPLICATE_DATA (중복된 email값이 존재할 때)
 102: SIGN_UP_VALIDATION_ERROR (body에 null값이 존재할 때)
 103: SIGN_UP_ERROR_ANYWAY
```



### 로그인

url  :   <b>/api/user/signin</b>

method : <b>POST</b>

header => 

> Request

```java
{
		email: String,
		password: String
}
```

> Response

```java
성공 = 200
{
    code: 200,
    message: SIGN_IN_SUCCESS,
    data: {
        Token: String
    }
}


실패 = 500
{
    code: int,
    message: String,
    data: {
        email: String,
        password: String
    }
}

 201: SIGN_IN_VALIDATION_ERROR (body에 null값 존재)
 202: SIGN_IN_AUTHENTICATION_ERROR (없는 email이거나 비밀번호가 일치하지 않을 때)
 203: SIGN_IN_ERROR_ANYWAY
```



### 유저 프로필 보기

url : <b>/api/user/profile/:question_idx</b>

method : <b>GET</b>

header =>  

> Request

```

```

> Response

```java
성공 = 200
{
    code: 300,
    message: GET_USER_PROFILE_LIST_SUCCESS,
    data: {
        user: {
            nickname: String,
            gender: String,
            age: String
        },
        user_personality: [
            {
                personality_name: String
            }, {..}
        ],
        question: {
            category_name: String,
            weight: int,
            content: String,
            helper_gender: String,
            advise: int,
            emotion: int,
            experience: int,
            question_personality: [
                {
                    personality_name: String
                }, {..}
            ],
            question_feeling: [
                {
                    feeling_name: String
                }, {..}
            ],
            question_experience: [
                {
                    experience_name: String
                }, {..}
            ]
        }
    }
}


실패 = 500
{
    code: int,
    message: String,
    data: {
        params: {
            question_idx: int
        }
    }
}

301: USER_PROFILE_LIST_VALIDATION_ERROR (question_idx가 없는 값일 때)
302: USER_PROFILE_LIST_ERROR_ANYWAY
```



### 고민 카테고리 리스트 보기

url : /api/concern/category/:category_id

method : get

header =>  <b>user_session : jwt_token</b>

> Request

```java

```

> Response

```java
{
  code: int,
  message: String
  data: {
    categoryList: [{
    	categoryList_id: int,
	    categoryList_name: String,
  }]
}

400: "GET_CATEGORY_LIST_SUCCESS",
401: "GET_CATEGORY_LIST_VALIDATION_ERROR",
402: "GET_CATEGORY_LIST_ERROR_ANYWAY",
```



### 고민 카테고리 리스트 추가

url : <b>/api/concern/category</b>

method: <b>POST</b>

header =>  <b>user_session : jwt_token</b>

> request

```java
# request
{
	category_idx: int,
	categoryList_name: String,
}
```

> response

```react
# response
{
	message: String,
	code: int,
  data: {},
}

500: "POST_CATEGORY_LIST_SUCCESS",
501: "POST_CATEGORY_LIST_VALIDATION_ERROR",
502: "POST_CATEGORY_LIST_ERROR_ANYWAY",
```



### 고민 감정 보기

url : <b>/api/concern/feeling</b>

method: <b>GET</b>

header =>  <b>user_session : jwt_token</b>

> Request

```java

```

> Response

```java
# response
{
	code: int,
	message: String,
	data:
		feelingList: [{
			feeling_idx: int,
			feeling_name: String,
	}]
}


600: "GET_FEELING_LIST_SUCCESS",
601: "GET_FEELING_LIST_VALIDATION_ERROR",
602: "GET_FEELING_LIST_ERROR_ANYWAY",
```

### 

### 사용자: 질문 등록하기

url => <b>/api/concern/question</b>

method => <b>POST</b>

header =>  <b>user_session : jwt_token</b>

> Request

```java
# request
{
	question: {
    weight: String,
    content: String,
    emotion: int,
    advise: int,
    experience: int,
    agreement: ENUM('agree', 'disagree'),
    categoryList_idx: int,
    helper_gender: Enum('남','여','모두'),
  }
  feeling: [feeling_idx...], // 작성자가 느낀 감정
 	personality: [ personality_idx...], // 원하는 헬퍼의 성격
 	experience: [experience_idx...], // 원하는 헬퍼의 경험
}
```

> Response

```java
# response
{
	message: String,
	code: int,
	data: {},
}

700: "POST_USER_QUESTION_SUCCESS",
701: "POST_USER_QUESTION_VALIDATION_ERROR",
702: "POST_USER_QUESTION_ERROR_ANYWAY",
703: "POST_USER_QUESTION_INSERT_ERROR",
```



### 헬퍼가 받은 고민 리스트 보기

url : <b>/api/concern/list</b>

method: <b>GET</b>

header =>  <b>user_session : jwt_token</b>

> Request

```java

```

> Response

```java
{
  code: int,
  message: String,
  data: {
    concernInfo: [{
      user: {
        user_idx: int,
        nickname: String,
        gender: String,
        age: String,
      },
      questionInfo: {
        title: String,
      },
      categoryInfo: {
        category_idx: int,
        category_name: String,
      },   
    }, {...}]
    size: int
  }
}

800: "GET_USER_QUESTION_LIST",
801: "GET_USER_QUESTION_LIST_ERROR_ANYWAY",
```

### 

### 헬퍼 등록

url : **/helper/registration**

method : **POST**

header:  willson-token : jwt_token

> Request

```java
{
  "helper": {
  	"category_name": String,
    "categoryList_name": String,
    "title": String,
    "content": String
  }
  "experience": {
  	"experience_name": [String, String, String]
  }
}
```

> Response

```java
성공 = 200
{
    "code": 900,
    "message": "HELPER_REGISTRATION_SUCCESS",
    "data": {}
}

실패 = 500
{
	message: String,
	code: int,
	data: {}
}
    901: "HELPER_REGISTRATION_VALIDATION_ERROR" (body에 null값 존재)
    902: "HELPER_REGISTRATION_ERROR_ANYWAY"

```



### 승낙 헬퍼 리스트 보기(!!매칭 알고리즘 수정중!!)

url : **/helper/list/:question_idx**

method : **GET**

header:  willson-token : jwt_token

> Request

```

```

> Response

```java
성공 = 200
{
	"code": 1000,
    "message": "GET_HELPER_LIST_SUCCESS",
	"data": {
		"helper":[
		{ "nickname": String,
			"gender": String,
			"age": String,
			"category_name": String,
			"content": String,
			"stars": String,
			"review_count": String } , {}, {}],
		experience: [
		{ experience_name: [String, String, String]}, {}, {}]
  }
}

실패 = 500
{
	message: String,
	code: int,
	data: {}
}
    1001: "HELPER_LIST_QUESTION_DOES_NOT_EXIST" (존재하지 않는 question_idx)
    1002: "GET_HELPER_LIST_ERROR_ANYWAY"

```



### 헬퍼 프로필 보기

url : **/helper/profile/:helper_idx**

method : **GET**

header:  willson-token : jwt_token

> Request

```

```

> Response

```java
성공 = 200
{
	"code": 1100,
    "message": "GET_HELPER_PROFILE_SUCCESS",
	"data": {
		"helper": [
		{ 
			"nickname": String,
			"gender": String,
			"age": String,
			"category_name": String,
			"content": String,
			"stars": String,
			"review_count": String
			}
		],
  "experience": [
        {
            "experience_name": String 
        },
        {
            "experience_name": String 
        },
        {
            "experience_name": String 
        }
    ],
    "personality": [
        {
            "personality_name": String 
        },
        {
            "personality_name": String 
        },
        {
            "personality_name": String 
        }
    ]
  }
}

실패 = 500
{
	message: String,
	code: int,
	data: {}
}
    1101: "PROFILE_HELPER_DOES_NOT_EXIST" (존재하지 않는 helper_idx)
    1102: "GET_HELPER_PROFILE_ERROR_ANYWAY"
```



### 헬퍼 프로필 수정

url : **/helper/profile**

method : **PUT**

header: "willson-token" : jwt_token

> Request

```java
{
  helper: {
  	"category_name": String,
    "categoryList_name": String,
    "title": String,
    "content": String
  }
  experience: {
  	experience_name: [String, String, String]
  }
}
```

> Response

```java
성공 = 200
{
    "code": 1200,
    "message": "UPDATE_HELPER_PROFILE_SUCCESS",
    "data": {}
}

실패 = 500
{
	message: String,
	code: int,
	data: {}
}
    1201: "USER_IS_NOT_HELPER" (헬퍼로 등록되지 않은 유저)
    1202: "UPDATE_HELPER_PROFILE_ERROR_ANYWAY" 
    1203: "UPDATE_HELPER_PROFILE_VALIDATION_ERROR" (body에 null 값 존재)
```



### 메인: 헬퍼 이야기

url : **/helper/story**

method : **GET**

header: 

> Request

```

```

> Response

```java
성공 = 200
{
    "code": 1300,
    "message": "GET_HELPER_STORY_SUCCESS",
    "data": [
        {
            "nickname": String,
            "category_name": String,
            "content": String
        },
        {
            "nickname": String,
            "category_name": String,
            "content": String
        },
        {
            "nickname": String,
            "category_name": String,
            "content": String
        },
        {
            "nickname": String,
            "category_name": String,
            "content": String
        },
        {
            "nickname": String,
            "category_name": String,
            "content": String
        }
    ]
}

실패 = 500
{
	message: String,
	code: int,
	data: {}
}
    1301: "MISSING_HELPER_STORY" (누락된 헬퍼 스토리 존재 (5개가 아닐 때))
    1302: "GET_HELPER_STORY_ERROR_ANYWAY"
```



### 요청보내기

url : **/helper/selection**

method : **POST**

header: "willson-token" : jwt_token

> Request

```java
{
  "question_idx": int
}
```

> Response

```java
성공 = 200
result: {
    "code": 1400,
    "message": "HELPER_SELECTION_SUCCESS",
    "data": {}
}

실패 = 500
{
	message: String,
	code: int,
	data: {}
}
    1401: "HELPER_SELECTION_QUESTION_DOES_NOT_EXIST" (존재하지 않는 고민을 선택)
    1402: "SELECTION_HELPER_DOES_NOT_EXIST" (헬퍼가 아닌 유저가 선택)
    1403: "HELPER_SELECTION_ERROR_ANYWAY"
```

### 후기 목록 보기

url : <b>/api/helper/:helper_idx/review</b>

method : <b>GET</b>

header => 

> Request

```

```

> Resonse

```java
성공 = 200
{
    code: 1500,
    message: GET_REVIEW_LIST_SUCCESS,
    data: [
        {
            review_idx: 1,
            stars: String,
            review_content: String,
            write_date: String,
            category_name: String,
            nickname: String
        }, {..}
    ]
}


실패 = 500
{
    code: int,
    message: String,
    data: {
        params: {
            helper_idx: int
        }
    }
}

1501: USER_REVIEW_LIST_VALIDATION_ERROR (helper_idx가 없는 값일 때)
1502: USER_REVIEW_LIST_ERROR_ANYWAY
```



### 후기 작성

url : <b>/api/review</b>

method : <b>POST</b>

header =>  <b>user_session : jwt_token</b>

> Request

```java
{
	review: {
		stars : String,
		review_content : String,
		helper_idx : int,
		category_idx : int,
		question_idx : int
	}
}
```

> Response

```java
성공 = 200
{
	code: 1600,
    message: REVIEW_REGISTERED_SUCCESS,
    data: {}
}


실패 = 500
{
    code: int,
    message: String
    data: {}
}

1601: REVIEW_VALIDATION_ERROR (body에 null값이 존재할 때)
1602: REVIEW_REGISTERED_ERROR_ANYWAY
```



### 후기 수정

url : <b>/api/review/:review_idx</b>

method : <b>PUT</b>

header => <b>user_session : jwt_token</b>

> Request

```java
{
	review: {
		stars : String,
		review_content : String,
	}
}
```

> Response

```java
성공 = 200
{
    code: 1700,
    message: MODIFIED_REVIEW_SUCCESS,
    data: {}
}


실패 = 500
{
    code: 1700,
    message: MODIFIED_REVIEW_SUCCESS,
    data: {}
}

1701: MODIFIED_REVIEW_VALIDATION_ERROR (body에 null값이 존재할 때)
1702: MODIFIED_REVIEW_PERMISSION_ERROR (리뷰를 작성한 사람만 수정 가능, 권한 오류)
1703: MODIFIED_REVIEW_ERROR_ANYWAY
```


### 감정 상태 리스트 가져오기

url => <b>/api/concern/personality</b>

method => <b>POST</b>

header =>  <b>user_session : jwt_token</b>


> Request

```
```

> Response

```java
# response
{
	message: String,
	code: int,
	data: {
		"personalityList": [{
			personality_idx: int,
			personality_name: String
		}]
	},
}

2000: "GET_PERSONALITY_LIST_SUCCESS",
2001: "GET_PERSONALITY_LIST_VALIDATION_ERROR",
2002: "GET_PERSONALITY_LIST_ERROR_ANYWAY"
```


### 유저의 헬퍼 결정하기

url : /user/selection

method : POST

header: "willson-token" : jwt_token

> Request

```java
{
  "helper_idx" : int,
  "question_idx" : int,
  "status": "doing" : string,
}
```

> Response

```java
성공 = 200
{
  message: ""USER_SELECTION_SUCCESS"",
  code: 2100,
  data: {},
}

실패 = 500
  2101: "USER_SELECTION_VALIDATION_ERROR",
  2102: "USER_SELECTION_ERROR_ANYWAY"
```


### 상담 종료하기

url : /concern/question

method : PUT

header: "willson-token" : jwt_token

> Request

```java
{
  "question_idx" : int,
  "status": "compelete" : string,
}
```

> Response

```java
성공 = 200
{
	message: "USER_SELECTION_SUCCESS",
	code: 2200,
    data: {}
}
실패 = 500
  2200: "UPDATE_USER_QUESTION_STATUS_SUCCESS",
  2201: "UPDATE_USER_QUESTION_VALIDATION_ERROR",
  2202: "UPDATE_USER_QUESTION_ERROR_ANYWAY",
```

### 메인: 질문자들의 후기

url : /review/story

method : GET

header: 

```java
성공 = 200
{
    message: "GET_MAIN_REVIEW_LIST_SUCCESS",
    code: 2300,
    data: {},
}

실패 = 500
  2301: "MAIN_REVIEW_LIST_ERROR_ANYWAY"
