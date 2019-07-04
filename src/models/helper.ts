import { rejects } from "assert";
import { resolve } from "path";

const selectRegistrationCategorylist = (connection: any, categoryList_name: any) => {
  return new Promise ((resolve, reject) => {
    const query = `
    SELECT categoryList_idx AS idx FROM categoryList WHERE categoryList_name = ?`
  
    connection.query(query, categoryList_name, (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const insertRegistrationCategorylist = (connection: any, { categoryList_name }:any) => {
  return new Promise ((resolve, reject) => {
    const query = `
    INSERT INTO categoryList (categoryList_name) VALUES (?)`
    connection.query(query, [categoryList_name], (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const insertRegistrationHelper = (connection: any, helper: any) => {
  return new Promise((resolve, reject) => {
    const query  = `INSERT INTO helper (title, content, category_idx, user_idx, categoryList_idx) VALUES (?,?,?,?,?)
    `;
    connection.query(query, helper , (err: any, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
};

const selectRegistrationExperience = (connection: any, experience_name: any) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT experience_idx AS idx FROM experience where experience_name = (?)`
    connection.query(query, [experience_name], (err: any, result: any) => {
      
      err ? reject(err) : resolve(result)
    })
  })
}

const selectLastInsert = (connection: any) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT LAST_INSERT_ID() AS idx`
    connection.query(query, (err: any, result: any) => {
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

const insertRegistrationExperience = (connection: any, experience_name: any) => {
  return new Promise((resolve, reject) => {
    const query = 'insert into experience (experience_name) values (?)';
    connection.query(query, experience_name, (err: any, result: any) => {
      
      err ? reject(err) : resolve(result)
    })
  }
  )
}

//승낙 헬퍼 리스트
const UserWantInfo = (connection: any, question_idx: any) => {
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

const UserWantInfo2 = (connection: any, question_idx: any) => {
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

const UserWantInfo3 = (connection: any, question_idx: any) => {
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

const Helper_idx = (connection: any, question_idx: any) => {
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
const HelperInfo1 = (connection: any, helper_arr: any) => {
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
      console.log(Query.sql);
      err ? reject(err) : resolve(result)
    })
  })
}

const HelperInfo2 = (connection: any, helper_arr: any) => {
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

//헬퍼 프로필
const selectProfileHelper = (connection: any, helper_idx: any) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      category_idx, title, stars, review_count, content
    FROM
      helper as H
    INNER JOIN
      user as U ON H.user_idx = U.user_idx
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
const updateProfileHelper = (connection: any, helper: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    UPDATE 
      helper
    SET
      title = ?, content = ?, category_idx = ?, categoryList_idx = ?
    WHERE
      user_idx = (?)`;
  
      connection.query(query, helper, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}

const getProfileHelper_experience_idx = (connection: any, helper_idx: any) => {
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

const updateProfileHelper_experience = (connection: any, arr: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    UPDATE 
      helper_experience
    SET
      experience_idx = (?)
    WHERE
      experience_idx = (?)`;
    
      connection.query(query, arr, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}
const selectProfileHelper_experience = (connection: any, helper_idx: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    SELECT
      experience_idx
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
      category_idx, title, nickname
    FROM
      helper_story
    WHERE
      category_idx = (?)
    ORDER BY RAND() LIMIT 1
  `;
    
    connection.query(query, category_idx, (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}

//요청 보내기
const insertSelectionSelected_question = (connection: any, {helper_idx, question_idx}: any) => {
  return new Promise((resolve, reject)=> {
    const query=`
    INSERT INTO
      selected_question (helper_idx, question_idx) VALUES (?, ?)
  `;
    
    connection.query(query, [helper_idx, question_idx], (err: any, result: any) => {
        err ? reject(err) : resolve(result)
      })
  })
}

  export {
    selectRegistrationCategorylist,
    insertRegistrationCategorylist,
    insertRegistrationHelper,
    selectRegistrationExperience,
    selectLastInsert,
    insertRegistrationExperience,
    selectProfileHelper,
    updateProfileHelper,
    selectProfileExperience,
    getProfileHelper_experience_idx,
    insertRegistrationHelper_experience,
    updateProfileHelper_experience,
    selectStoryHelper,
    insertSelectionSelected_question,
    selectProfileHelper_experience,
    selectProfileHelper_idx,
    UserWantInfo,
    UserWantInfo2,
    UserWantInfo3,
    Helper_idx,
    HelperInfo1,
    HelperInfo2
  }