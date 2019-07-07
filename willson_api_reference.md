BaseUrl =>  <b>host:port/api</b>



|           기능            |           URL           | 메소드 | 요청값 |
| :-----------------------: | :---------------------: | :----: | :----: |
|         회원가입          |      /user/signup       |  POST  |  body  |
|          로그인           |      /user/signin       |  POST  |  body  |
|     유저 프로필 보기      | /user/profile/:user_idx |  GET   | params |
| 고민 카테고리 리스트 보기 |    /concern/category    |  GET   |  body  |
| 고민 카테고리 리스트 추가 |    /concern/category    |  POST  |  body  |
|      고민 감정 보기       |    /concern/feeling     |  GET   |   X    |
|      고민 질문 생성       |    /concern/question    |  POST  |  body  |
|  헬퍼가 받은 고민 리스트  |      /concern/list      |  GET   |   X    |
|   헬퍼 등록                 |  /helper/registration    | POST |   body     |
|   승낙 헬퍼 리스트 보기        | /helper/list/:question_idx  |  GET   |  X     |
|   헬퍼 프로필 보기            | /helper/profile/:helper_idx    |  GET      |   X     |
|   헬퍼 프로필 수정            |     /helper/profile     |  PUT   |   body     |
|   메인: 헬퍼 이야기           |     /helper/story       |  GET      |    X    |
|   요청 보내기                |    /helper/selection    |  POST   |  body   |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |



### 고민 카테고리 리스트 보기

url : </b>/api/concern/category</b>

method : </b>get</b>

header: 

> Request

```java

```

> Response

```java
result: {
  category: [{
    categoryList_id: int,
    categoryList_name: String,
  }]
}

성공: 200
result: {
	message:
	data: {
		user:[{}, {}, {}],
	}
}

실패
- 데이터 없음 : 204
result :{
  message: "데이터 없음",
}
- 인증실패 : 403
  
```



### 고민 카테고리 리스트 추가

url : <b>/api/concern/category</b>

method: <b>POST</b>

header: 

> body

```java
# request
{
	categoryList_name: String,
}
```

> Error_code

```react
# response
result: {
	message: String,
	code: int,
}

성공: 200
result: {
	message: "add category success",
  code: 200,
}

실패
- 데이터 없음 : 500
result :{
  message: "add category fail",
}
  
```



### 고민 감정 보기

url : <b>/api/concern/feeling</b>

method: <b>GET</b>

header: 

> body

```java
# response
result: {
	message: String,
	code: int,
	data:[{
		feeling_idx: int,
		feeling_name: String,
	}]
}
```

> Error_code

```java
result: {
  message: String,
  code: int,
  data: object or array,
}

성공: 200
result: {
	message: "get feeling list success",
  code: 210,
}

실패
- 데이터 없음 : 211,
result :{
  message: "get feeling list fail",
  code: 211,
}
  
```

### 고민 질문 생성

url => <b>/api/concern/category</b>

method => <b>POST</b>

header =>  <b>user_session : jwt_token</b>

> Request

```java
# request
{
	weight: String,
	content: String,
	helper_gender: Enum('남','여','모두'),
	emotion: int,
	advise: int,
	experience: int,
	agreement: ENUM('o', 'x'),
	categoryList_idx: int,
}


```

> Response

```java
# response
result: {
	message: String,
	code: int,
}

성공: 200
result: {
	message: "add category success",
  code: 200,
}

실패
- 데이터 없음 : 500
result :{
  message: "add category fail",
}
```



### 헬퍼가 받은 고민 리스트 보기

url : <b>/api/concern/category</b>

method: <b>GET</b>

header: 

> Request

```java

```

> Response

```java
result: {
	user: {
    user_idx: String,
    nickname: String,
    gender: String,
    age: String,	
	}
	question: {
		title: String,
	}
	category : {
		category_id: int,
		category_name: String,
	}
}

성공: 200
result: {
	message: "add category success",
  code: 200,
}

실패
- 데이터 없음 : 500
result :{
  message: "add category fail",
}
  
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

header: "willson-token" : jwt_token

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

