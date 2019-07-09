//헬퍼 등록
const selectRegistrationCategory = (connection: any, category_name: any) => {
  return new Promise ((resolve, reject) => {
    const query = `SELECT category_idx FROM category WHERE category_name = (?)`
  
    connection.query(query, category_name, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const insertRegistrationCategoryList = (connection: any, [categoryList_name, categoryList_idx]: any) => {
  return new Promise ((resolve, reject) => {
    const query = `
    INSERT INTO 
	    categoryList (categoryList_name, category_idx, count)
    VALUES 
	    (?,?,1)
    ON DUPLICATE KEY UPDATE
      count = count + 1`
  
    connection.query(query, [categoryList_name, categoryList_idx], (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const insertRegistrationHelper = (connection: any, {category_idx, categoryList_idx, title, content, emotion, advise, experience, user_idx}: any) => {
  return new Promise((resolve, reject) => {
    const query  = `INSERT INTO helper (category_idx, categoryList_idx, title, content, user_idx) VALUES (?,?,?,?,?)`
    let q = connection.query(query, [category_idx, categoryList_idx, title, content, emotion, advise, experience, user_idx] , (err: any, result: any) => {
     console.log(q.sql);
      err ? reject(err) : resolve(result)
    })
  })
}

const selectRegistrationExperience = (connection: any, experience_name: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO 
    experience (experience_name)
  VALUES 
    (?)
  ON DUPLICATE KEY UPDATE
  count = count + 1`
    connection.query(query, experience_name, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const insertRegistrationHelper_experience = (connection: any, helper_arr: any) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO helper_experience (experience_idx, helper_idx) values (?,?)';
    connection.query(query, helper_arr, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  }
  )
}

//승낙 헬퍼 리스트
const selectUserInfo = (connection: any, question_idx: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      helper_gender, age, categoryList_idx
    FROM
      question as Q
    INNER JOIN
      user as U ON Q.user_idx = U.user_idx
    WHERE
      question_idx = ?`;

    connection.query(query, question_idx, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectUserExperience = (connection: any, question_idx: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      experience_name
    FROM
      question_experience as Q
    INNER JOIN
      experience AS E ON Q.experience_idx = E.experience_idx
    WHERE
      question_idx = (?)`;

    connection.query(query, question_idx, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectUserPersonality = (connection: any, question_idx: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      personality_idx
    FROM
      question_personality
    WHERE
      question_idx = (?)`;

    connection.query(query, question_idx, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectHelper_idx = (connection: any, question_idx: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      helper_idx
    FROM
      selected_question
    WHERE
      question_idx = (?)`;

    connection.query(query, question_idx, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}
const selectHelperInfo = (connection: any, helper_arr: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      age, gender, category_idx, categoryList_idx, title, content, stars, review_count 
    FROM
      helper AS H
    INNER JOIN
      user AS U ON H.user_idx = U.user_idx
    WHERE
      helper_idx IN (?)`;

    const Query = connection.query(query, [helper_arr], (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectHelperPersonality = (connection: any, helper_arr: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      personality_idx AS idx
    FROM
      helper AS H
    INNER JOIN
      user_personality AS U ON H.user_idx = U.user_idx
    WHERE
      helper_idx IN (?)`;

    connection.query(query, [helper_arr], (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

//헬퍼 프로필 보기
const selectProfileHelper = (connection: any, helper_idx: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      nickname, gender, age, category_name, title, content, stars, review_count, emotion, advise, experience
    FROM
      helper as H
    INNER JOIN
      user as U ON H.user_idx = U.user_idx
    INNER JOIN
      category as C ON C.category_idx = H.category_idx
    WHERE
      helper_idx = (?)`;

    connection.query(query, helper_idx, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectProfileExperience = (connection: any, helper_idx: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      experience_name
    FROM
      experience as A
    INNER JOIN 
      helper_experience as B ON A.experience_idx = B.experience_idx
    WHERE
      helper_idx = (?)`;

      connection.query(query, helper_idx, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}

const selectProfilePersonality = (connection: any, helper_idx: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      personality_name
    FROM
      personality as P
    INNER JOIN 
      user_personality as U ON P.personality_idx = U.personality_idx
    INNER JOIN 
      helper as H ON H.user_idx = U.user_idx
    WHERE
      helper_idx = (?)`;

      connection.query(query, helper_idx, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}

//헬퍼 프로필 수정
const updateProfileHelper = (connection: any, {category_idx, categoryList_idx, title, content, emotion, advise, experience, user_idx}: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    UPDATE 
      helper
    SET
      category_idx = ?, categoryList_idx = ?, title = ?, content = ?, emotion = ?, advise = ?, experience = ?   
    WHERE
      user_idx = ?`;
  
      connection.query(query, [category_idx, categoryList_idx, title, content, emotion, advise, experience, user_idx], (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}

const updateProfileHelper_experience = (connection: any, arr: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    UPDATE 
      helper_experience
    SET
      experience_idx = (?)
    WHERE
      helper_experience_idx = (?)`;
    
      let q = connection.query(query, arr, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}
const selectProfileHelper_experience = (connection: any, helper_idx: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    SELECT
      helper_experience_idx
    FROM
      helper_experience
    WHERE
      helper_idx = (?)`;
    connection.query(query, helper_idx, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}
const selectProfileHelper_idx = (connection: any, user_idx: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    SELECT
      helper_idx
    FROM
      helper
    WHERE
      user_idx = (?)`;
    connection.query(query, user_idx, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}

//헬퍼 이야기
const selectStoryHelper = (connection: any, category_idx: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    SELECT
      nickname, category_name, content
    FROM
      helper_story AS H
    INNER JOIN
      category AS C ON H.category_idx = C.category_idx
    WHERE
      C.category_idx = (?)
    ORDER BY RAND() LIMIT 1
  `;
    
    let q = connection.query(query, category_idx, (err: any, result: any) => {
      console.log(q.sql);
      console.log(err);
        err ? reject(err) : resolve(result)
      })
  })
}

//요청 보내기
const selectSelectionQuestion_idx = (connection: any, question_idx: any) => {
  return new Promise((resolve, reject)=> {
    const query=` SELECT question_idx from question WHERE question_idx = (?)`;
    connection.query(query, question_idx, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}
const insertSelectionSelected_question = (connection: any, question_idx: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    INSERT INTO
      selected_question (helper_idx, question_idx) VALUES (?, ?)
  `;
    
    connection.query(query, question_idx, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}

  export {
    selectRegistrationCategory,
    insertRegistrationCategoryList,
    insertRegistrationHelper,
    selectRegistrationExperience,
    insertRegistrationHelper_experience,

    selectProfileHelper,
    selectProfileExperience,
    selectProfilePersonality,
    updateProfileHelper,
    selectProfileHelper_idx,
    selectProfileHelper_experience,
    updateProfileHelper_experience,
    selectStoryHelper,
    insertSelectionSelected_question,
    selectSelectionQuestion_idx,
    
    selectUserInfo,
    selectUserExperience,
    selectUserPersonality,
    selectHelper_idx,
    selectHelperInfo,
    selectHelperPersonality
  }