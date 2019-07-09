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



### 회원가입

url : <b>/api/user/signup</b>

method : <b>POST</b>

header => <b> willson-token : jwt_token </b>

> Request

```java
{
	
  nickname: String,
  gender: Enum('남','여','모두')
  age: int,
	email: String,
	password: String,
	device_token:String
  	
}
```

> Response

```java
result: {
	code: int
}

성공: 100
중복 검사 오류: 101
유효성 검사 오류: 102
```

url : </b>/api/concern/category</b>

method : </b>get</b>

### 로그인

url  :   <b>/api/user/signin</b>

method : <b>POST</b>

header => <b>willson-token : jwt_token</b>

> Request

```java
{
    
		email: String,
		password: String
	
}
```

> Response

```java
result: {
    code: int,
    data: {
        Token: String
    }
}

성공: 200
유효성 검사 오류: 201
인증 검사 오류: 202
```



### 유저 프로필 보기

url : <b>/api/user/profile/:question_idx</b>

method : <b>GET</b>

header =>  <b>willson-token : jwt_token</b>

> Request

```

```

> Response

```java
result: {
    code: int,
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

성공: 300
유효성 검사 오류: 301
```



### 고민 카테고리 리스트 보기

url : /api/concern/category/:category_id

method : get

header =>  <b>willson-token : jwt_token</b>

> Request

```java

```

> Response

```java
result: {
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

header =>  <b>willson-token : jwt_token</b>

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
result: {
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

header =>  <b>willson-token : jwt_token</b>

> Request

```java

```

> Response

```java
# response
result: {
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



### 사용자 질문 등록하기

url => <b>/api/concern/question</b>

method => <b>POST</b>

header =>  <b>willson-token : jwt_token</b>

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
  feeling: [feeling_idx...],
 	personality: [ personality_idx...],
 	experience: [experience_idx...],
}
```

> Response

```java
# response
data: {
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

header =>  <b>willson-token : jwt_token</b>

> Request

```java

```

> Response

```java
code: int,
message: String,
data: {
  concernInfo: [{
    user: {
      user_idx: String,
      nickname: String,
      gender: String,
      age: String,
    },
    questionInfo: {
      title: String,
    },
    categoryInfo: {
      category_id: int,
      category_name: String,
    },   
  }, {...}]
  size: int,
}

800: "GET_USER_QUESTION_LIST",
801: "GET_USER_QUESTION_LIST_ERROR_ANYWAY",
```



### 헬퍼 등록

url : **/helper/registration**

method : **POST**

header:  <b>wilson-token : jwt_token</b>

> Request

```
{
  "helper": {
  	"category_name": String,
    "categoryList_name": String,
    "title": String,
    "content": String,
  }
  "experience": {
  	"experience_name": [String, String, String]
  }
}
```

> Response

```
성공 = 200
{
    "code": 900,
    "data": {}
}

실패 = 500
- 이미 헬퍼로 등록된 유저일 때
{
    "code": 901
}
- body에 null값이 존재할 때
{
    "code": 902
}
```



### 승낙 헬퍼 리스트 보기(!!매칭 알고리즘 수정중!!)

url : **/helper/list/:question_idx**

method : **GET**

header:  willson-token : jwt_token

> Request

```

```

> Response

```
성공 = 200
{
	"code": 1000,
	"data": {
		"helper":[
		{ "nickname": String,
			"gender": String,
			"age": int,
			"category_name": String,
			"content": String,
			"stars": String,
			"review_count": String } , {}, {}],
		experience: [
		{ experience_name: [String, String, String]}, {}, {}]
  }
}

실패 = 500
- 존재하지 않는 고민일 때 
{
    "code": 1001
}
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
	"data": {
		"helper": [
		{ 
			"nickname": String,
			"gender": String,
			"age": int,
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
- 선택한 헬퍼가 존재하지 않는 헬퍼일 때 
{
    "code": 1101
}
```



### 헬퍼 프로필 수정

url : **/helper/profile**

method : **PUT**

header: "willson-token" : jwt_token

> Request

```
{
  helper: {
  	"category_name": String,
    "categoryList_name": String,
    "title": String,
    "content": String,
  }
  experience: {
  	experience_name: [String, String, String]
  }
}
```

> Response

```
성공 = 200
{
    "code": 1200,
    "data": {}
}

실패 = 500
- 헬퍼로 등록하지 않은 유저일 때 
{
    "code": 1201
}
```



### 메인: 헬퍼 이야기

url : **/helper/story**

method : **GET**

header:  willson-token : jwt_token

> Request

```

```

> Response

```
성공 = 200
{
    "code": 1300,
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
- 5개의 데이터 중 누락된 것이 존재할 떄
{
    "code": 1301
}
```



### 요청보내기

url : **/helper/selection**

method : **POST**

header: "willson-token" : jwt_token

> Request

```
{
  "question_idx": int
}
```

> Response

```
성공 = 200
result: {
    "code": 1400,
    "data": {}
}

실패 = 500
- 존재하지 않는 고민을 선택하였을 때
{
    "code": 1401
}
- 헬퍼가 아닌 유저가 선택하였을 때 
{
    "code": 1402
}
```



### 후기 목록 보기

url : <b>/api/helper/:helper_idx/review</b>

method : <b>GET</b>

header => <b>willson-token : jwt_token</b>

> Request

```

```

> Resonse

```java
result: {
    code: int,
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
성공: 1500
유효성 검사 오류: 1501
```



### 후기 작성

url : <b>/api/review</b>

method : <b>POST</b>

header =>  <b>willson-token : jwt_token</b>

> Request

```java
{
	
		stars : String,
		review_content : String,
		helper_idx : int,
		category_idx : int,
		question_idx : int
	
}
```

> Response

```java
result: {
	code: int
}

성공: 1600
유효성 검사 오류: 1601
```



### 후기 수정

url : <b>/api/review/:review_idx</b>

method : <b>PUT</b>

header => <b>willson-token : jwt_token</b>

> Request

```java
{
	
		stars : String,
		review_content : String,
	
}
```

> Response

```java
{
    code: int
}

성공: 1700
유효성 검사 오류: 1701
권한 검사 오류: 1702
```




# 헬퍼

### 헬퍼 등록

url : <b>/helper/registration</b>

method : <b>POST</b>

header: "willson-token" : jwt_token

> Request

    {
      "helper": {
      	"category_name": String,
        "categoryList_name": String,
        "title": String,
        "content": String,
      }
      "experience": {
      	"experience_name": [String, String, String]
      }
    }



> Response

    성공 = 200
    {
        "code": 900,
        "data": {}
    }
    
    실패 = 500
    - 이미 헬퍼로 등록된 유저일 때
    {
        "code": 901
    }
    - body에 null값이 존재할 때
    {
        "code": 902
    }




### 승낙 헬퍼 리스트 보기(!!매칭 알고리즘 수정중!!)

url : <b>/helper/list/:question_idx</b>

method : <b>GET</b>

header: 

> Request

```


```

> Response

```
성공 = 200
{
	"code": 1000,
	"data": {
		"helper":[
		{ "nickname": String,
			"gender": String,
			"age": int,
			"category_name": String,
			"content": String,
			"stars": String,
			"review_count": String } , {}, {}],
		experience: [
		{ experience_name: [String, String, String]}, {}, {}]
  }
}

실패 = 500
- 존재하지 않는 고민일 때 
{
    "code": 1001
}

```



### 헬퍼 프로필 보기

url : <b>/helper/profile/:helper_idx</b>

method : <b>GET</b>

header: 

> Request    

```

```



> Response

    성공 = 200
    {
    	"code": 1100,
    	"data": {
    		"helper": [
    		{ 
    			"nickname": String,
    			"gender": String,
    			"age": int,
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
    - 선택한 헬퍼가 존재하지 않는 헬퍼일 때 
    {
        "code": 1101
    }


### 헬퍼 프로필 수정

url : <b>/helper/profile</b>

method : <b>PUT</b>

header: "willson-token" : jwt_token

> Request

    {
      helper: {
      	"category_name": String,
        "categoryList_name": String,
        "title": String,
        "content": String,
      }
      experience: {
      	experience_name: [String, String, String]
      }
    }

> Response

    성공 = 200
    {
        "code": 1200,
        "data": {}
    }
    
    실패 = 500
    - 헬퍼로 등록하지 않은 유저일 때 
    {
        "code": 1201
    }


### 메인: 헬퍼 이야기

url : <b>/helper/story</b>

method : <b>GET</b>

header: 

> Request

​    

> Response

    성공 = 200
    {
        "code": 1300,
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
    - 5개의 데이터 중 누락된 것이 존재할 떄
    {
        "code": 1301
    }



## 요청 보내기

url : <b>/helper/selection</b>

method : <b>POST</b>

header: <b>wilson-token : jwt_token</b>

> Request

```
{
  "question_idx": int
}
```

>  Response

```
성공 = 200
result: {
    "code": 1400,
    "data": {}
}

실패 = 500
- 존재하지 않는 고민을 선택하였을 때
{
    "code": 1401
}
- 헬퍼가 아닌 유저가 선택하였을 때 
{
    "code": 1402
}
```



### 감정 상태 리스트 가져오기

url => <b>/api/concern/personality</b>

method => <b>POST</b>

header =>  <b>wilson-token : jwt_token</b>

> Request

```java
# request

```

> Response

```java
# response
data: {
	code: int,
	message: String,
	data: {
		personalityList: [{
			personality_idx: int,
			personality_name: String
		}]
	},
}

2000: "GET_PERSONALITY_LIST_SUCCESS",
2001: "GET_PERSONALITY_LIST_VALIDATION_ERROR",
2002: "GET_PERSONALITY_LIST_ERROR_ANYWAY",
```



### 사용자 고민 리스트 받아오기

url => <b>/api/concern/personality</b>

method => <b>POST</b>

header =>  <b>user_session : jwt_token</b>

> Request

```java
# request

```

> Response

```java
# response
{
	code: int,
	message: String,
	data: {
		concernInfo: [{
			userInfo: {
      	user_idx: 0,
        nickname": "윌슨",
        gender: "남",
        age: 28
      },
      questionInfo: {
      	title: "인간관계에 대해 고민이고 정확한 해결책을 얻고 싶다기 보다는 제  생각을 같이 얘기해보고 싶어요"
      },
      categoryInfo: {
      	category_idx: 1,
      	category_name: "연애"
      }
   },
}

1900: "GET_USER_QUESTION_LIST_SUCCESS",
1901: "GET_USER_QUESTION_LIST_ERROR_ANYWAY",
```

