var mecab = require('mecab-ya');
var request = require('request-promise-native');

import dbConnection from "../../../lib/connection";
import { selectHelperExperience, selectUserInfo, selectUserExperience, selectUserPersonality, selectHelper_idx, selectHelperInfo, selectHelperPersonality } from '../helper.model'
import serviceStatusCode from '../../../lib/serviceStatusCode';
import { CustomError } from '../../../lib/middlewares/respond';
import helper from "../index";

import { getAge } from "../../../modules/getAge";

const getListService = (req: any, res: any) => {

  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();

    try {
      const question_idx = req.params.question_idx;


      //유저가 원하는 헬퍼 정보
      let info: any = await selectUserInfo(connection, question_idx);
      if (!info.length) {
        reject(new CustomError(null, 1001, { question_idx }))
        return
      }
      let experience_name: any = await selectUserExperience(connection, question_idx);
      let personality_idx: any = await selectUserPersonality(connection, question_idx);

      //유저 고민을 선택한 헬퍼들의 정보
      let helpers_idx: any = await selectHelper_idx(connection, question_idx);
      if (!helpers_idx.length) {
        reject(new CustomError(null, 1003, { question_idx }))
        return
      }
      console.log(helpers_idx);
      let helpers_arr: any = [];
      let helper_num = helpers_idx.length;
      for (let i = 0; i < helper_num; i++) {
        helpers_arr.push(helpers_idx[i].helper_idx);
      }
      
      let helpers_info: any = await selectHelperInfo(connection, helpers_arr);
      let helpers_personality: any = await selectHelperPersonality(connection, helpers_arr);
      let helpers_experience: any = await selectHelperExperience(connection, helpers_arr);
console.log(helpers_experience)
      //헬퍼 후기 만족도 기준치 이상만 남김
      for (let i = 0; i < helper_num; i++) {
        if (parseInt(helpers_info[i].review_count) > 3 && parseFloat(helpers_info[i].stars) <= 2.5) {
          helpers_idx.splice(i, 1);
          helpers_info.splice(i, 1);
          helpers_experience.splice(3* i, 3);
          helpers_personality.splice(3 * i, 3);
        }
      }
      
      helper_num = helpers_idx.length;

      //받은 헬퍼 요청이 3명 초과면 매칭 알고리즘 수행
      if (helper_num > 3) {
        //1. 나이 매칭
        let age_match: any = []

        const user_age = info[0].age;
        for (let i = 0; i < helper_num; i++) {
          //나이 알고리즘 고치기 
          let score = 10;
          let difference = 0;

          if (user_age > 31){
            difference = helpers_info[i].age - user_age - (36 - helpers_info[i].age);
          }else{
            difference = helpers_info[i].age - user_age - 5;
          }
          
          if (difference >= 0 && difference <= 10) {
            score = score - difference;
          }
          else if (difference < 0 && difference >= -5) {
            score = score + difference * 2;
          }
          else {
            score = 0;
          }
          age_match.push(score);
        }

        //2. 성격 매칭
        let personality_match: any = []

        let personality_idx_arr = [];
        for (let i = 0; i < personality_idx.length; i++) {
          personality_idx_arr.push(personality_idx[i].personality_idx);
        }

        for (let i = 0; i < helper_num; i++) {
          let match_num = 0;

          if (personality_idx_arr.includes(helpers_personality[i * 3].idx)) {
            match_num++;
          }
          if (personality_idx_arr.includes(helpers_personality[i * 3 + 1].idx)) {
            match_num++;
          }
          if (personality_idx_arr.includes(helpers_personality[i * 3 + 2].idx)) {
            match_num++;
          }
          personality_match.push(match_num);
        }

        //3. 중분류 매칭
        let categoryList_match: any = []
        for (let i = 0; i < helper_num; i++) {
          if (info[0].categoryList_idx == helpers_info[i].categoryList_idx) {
            categoryList_match.push(1);
          }
          else {
            categoryList_match.push(0);
          }
        }

        //4. 키워드 매칭 (수정필요)
        let keyword_match: any = []
        let text_arr: any = []

        let keyword: any = [];
        for (let i = 0; i < 3; i++) {
          keyword.push(experience_name[i].experience_name);
        }
        
        for (let i = 0; i < helper_num; i++) {
          const title = helpers_info[i].title;
          const text = title.concat(helpers_info[i].content);
          text_arr.push(text);
        }

        const body = {
          "user_keyword": keyword,
          "helper_experience": text_arr
        }
        console.log(body)

        //파이썬 서버랑 통신
        const options = {
          method: 'POST',
          uri: 'http://54.180.119.69:5000/test',
          body: body,
          json: true
        }

        //request(options).then(function (res: any, err: any) {
          //for (let i = 0; i < helper_num; i++) {
            //keyword_match.push(res.total[i][1])
          //}

          //점수 합산
          let total: any = []
          for (let i = 0; i < helper_num; i++) {
            //(수정사항) 가중치 곱해주어야함! 
            console.log(age_match[i], personality_match[i], categoryList_match[i], keyword_match[i])
            const score = 3.5 * age_match[i] + 5 * personality_match[i] + 10 * categoryList_match[i] 
            // 2 * keyword_match[i]
            total.push(score);
          }
          console.log(total);
          //점수 순대로 sort 했을 때 index 배열 구하기
          let indices = new Array(helper_num);
          for (let i = 0; i < helper_num; i++) {
            indices[i] = i;
          }
          indices.sort(function (a, b) { return total[a] < total[b] ? 1 : total[a] > total[b] ? -1 : 0; });

          console.log(helpers_experience)
          let result = [];
          for (let i = 0; i < 3; i++) {
            helpers_info[indices[i]].age = getAge(helpers_info[indices[i]].age);
            let experience = [];
            experience.push(helpers_experience[3*indices[i]].experience_name,helpers_experience[3*indices[i]+ 1].experience_name,helpers_experience[3*indices[i]+2].experience_name)
            
            result.push(
              {
                helper: helpers_info[indices[i]], 
                experience: experience
               })
          }
          resolve({helper_list: result, size:result.length});
       // })
      }
      else {
        let result =[];
        for (let i = 0; i < helpers_idx.length; i++) {
          helpers_info[i].age = getAge(helpers_info[i].age);
          let experience = [];
            experience.push(helpers_experience[3*i].experience_name,helpers_experience[3*i+1].experience_name,helpers_experience[3*i+2].experience_name)
          
          result.push(
            {
              helper: helpers_info[i], 
              experience: experience
             })
          }
        resolve({helper_list: result, size:result.length});
      
    }
    } catch (e) {
      reject(e);
    } finally {
      connection.release();
    }
  })
}

export default {
  getListService,
}