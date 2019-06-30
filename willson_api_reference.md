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
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |
|                           |                         |        |        |



### 고민 카테고리 리스트 보기

url : /api/concern/category

method : get

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

