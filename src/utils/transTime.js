// 문자열 시간값 > 객체화 시간값 > 옵션 적용된 문자열 시간값으로 전환하는 로직입니다.
// Ex : "2023-01-12T09:30:53.000Z" > "6:30 PM"

// 문자열 시간값 > 객체화 시간값
export const strToObjTime = (strTime) => {
  // strTime : 받아오는 문자열 값의 시간
  // 1. 문자열 시간값 strTime을 년,월,일,시,분,초 단위로 쪼개줍니다.
  // Ex : "2023-01-12T09:30:53.000Z" (문자열) > 2023 01 12 09 30 53 (문자열)
  const [dateValues, timeValues] = strTime.split('T');
  const [year, month, day] = dateValues.substr(1).split('-');
  const [hours, minutes, seconds] = timeValues.substr(0, 8).split(':');
  // ObjTime : new Date() 객체화된 strTime
  // 2. 쪼개진 값을  new Date() 안에 넣어 타임 스탬프 객체화시켜 ObjTime로 선언해줍니다.
  // Ex : 2023 01 12 09 30 53 (문자열) > 2023-01-12T09:30:53.000Z (객체)
  const ObjTime = new Date(
    +year,
    +month - 1,
    +day + 1,
    +hours - 15,
    +minutes,
    +seconds,
  );
  return ObjTime;
};

// 객체화 시간값 > 옵션 적용된 문자열 시간값으로 전환
export const translateTime = (ObjTime) => {
  // translateTime : 객체화된 strTime에 옵션적용해 번역한 문자열 시간값
  // 3. 객체 ObjTime을 다시 00:00AM/PM 형식으로 변환하는 옵션을 적용해 문자열화 합니다.
  // Ex : 2023-01-12T09:30:53.000Z > "6:30 PM"
  const options = { hour: 'numeric', minute: '2-digit' };
  const translateTime = ObjTime.toLocaleString('en-KR', options);
  return translateTime;
};
