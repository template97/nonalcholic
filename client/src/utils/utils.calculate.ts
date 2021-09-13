import { AnswerData } from "../redux/interfaces/progressInterface";
import { QuestionInfo } from "./utils.const";

export const caculateMBTI = (answerData: AnswerData[]) => {
  let EI = 0;
  let SN = 0;
  let TF = 0;
  let JP = 0;
  answerData.forEach((answer) => {
    const question = QuestionInfo[answer.id];

    switch (question.type) {
      case "EI":
        EI += answer.score;
        break;
      case "SN":
        SN += answer.score;
        break;
      case "TF":
        TF += answer.score;
        break;
      case "JP":
        JP += answer.score;
        break;
    }
  });

  let result = "";
  if (EI > 0) result += "E";
  else result += "I";
  if (SN > 0) result += "S";
  else result += "N";
  if (TF > 0) result += "T";
  else result += "F";
  if (JP > 0) result += "J";
  else result += "P";

  return result;
};
