import dbConnection from "../../../lib/connection";
import { UserWantInfo, UserWantInfo2, UserWantInfo3, Helper_idx, HelperInfo1, HelperInfo2} from '../../../models/helper'
import { listenerCount } from "cluster";
var mecab = require('mecab-ya');

const getListService = (req: any,res: any) => 
  new Promise(async (resolve, reject) => {
    try {
      const question_idx = req.params.question_idx;
      const connection = await dbConnection();

      //유저가 원하는 헬퍼 정보
      let info: any = await UserWantInfo (connection, question_idx);
      let experience_name: any = await UserWantInfo2 (connection, question_idx);
      let personality_idx: any = await UserWantInfo3 (connection, question_idx);

      //유저 고민을 선택한 헬퍼들의 정보
      const helpers_idx: any = await Helper_idx (connection, question_idx);
      let helpers_arr: any = [];
      const helper_num = helpers_idx.length;
      for (let i=0; i< helper_num; i++){
        helpers_arr.push(helpers_idx[i].helper_idx);
      }
            
      let helpers_info: any = await HelperInfo1(connection, helpers_arr);
      let helpers_personality: any = await HelperInfo2 (connection, helpers_arr);

      //받은 헬퍼 요청이 3명 초과면 매칭 알고리즘 수행
      if (helper_num > 3){
        //1. 나이 매칭
        let age_match = []
      
        const user_age = info[0].age;
        for (let i=0; i< helper_num; i++){
          let score = 10;
          const difference = helpers_info[i].age - user_age - 5;
          if (difference >=0 && difference <=10){
            score = score - difference;
          }
          else if (difference <0 && difference >= -5){
            score = score + difference *2;
          }
          else{
            score = 0;
          }
          age_match.push(score);
        }

        //2. 성격 매칭
        let personality_match = []

        let personality_idx_arr = [];
        for (let i=0; i< personality_idx.length; i++){
          personality_idx_arr.push(personality_idx[i].personality_idx);
        }

        for (let i=0; i< helper_num; i++){
          let match_num = 0;
  
          if (personality_idx_arr.includes(helpers_personality[i*3].idx)){
            match_num++;
          }
          if (personality_idx_arr.includes(helpers_personality[i*3 + 1].idx)){
            match_num++;
          }
          if (personality_idx_arr.includes(helpers_personality[i*3 + 2].idx)){
            match_num++;
          }
          personality_match.push(match_num);
        }

        //3. 중분류 매칭
        let categoryList_match = []
        for (let i=0; i< helper_num; i++){
          if (info[0].categoryList_idx == helpers_info[i].categoryList_idx){
            categoryList_match.push(1);
          }
          else{
            categoryList_match.push(0);
          }
        }

        //4. 키워드 매칭 (수정필요)
        let keyword_match: any = []
        for (let i=0; i<helper_num; i++){
          const text = helpers_info[i].title.concat(helpers_info[i].content);

          //헬퍼의 서술형 데이터에서 명사만 뽑기
          let noun_arr;
          mecab.nouns(text, function (err: any, result: any) {
            if (err){
              //에러처리
            }
            else{
              noun_arr = result;
            }
          });

          const keyword = experience_name; //아직 객체임


          //파이썬 서버랑 통신
          for (let i=0; i<helper_num; i++){
            keyword_match.push(0);
          }
        }

        //점수 합산
        let total: any = []
        for (let i=0; i<helper_num; i++){
          //(수정사항) 가중치 곱해주어야함! 
          const score = age_match[i] + personality_match[i] + categoryList_match[i] + keyword_match[i]
          total.push(score);
        }

        //점수 순대로 sort 했을 때 index 배열 구하기
        let indices = new Array(helper_num);
        for (let i = 0; i< helper_num; i++){
          indices[i] = i;
        }
        indices.sort(function (a,b) {return total[a] < total[b] ? 1: total[a] > total[b] ? 1: 0;});
        
        let result = [];
        for (let i = 0; i<3; i++){
          result.push(helpers_info[indices[i]]);
        }

        resolve(result);
      }
      else{ 
        resolve({helpers_info});
      }

    } catch (e){
      
    } finally {
      
    }
  })

export default {
  getListService
}