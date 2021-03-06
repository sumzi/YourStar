import axios from 'axios';
import { BASE_URL } from '../../../utils/contants';

// 팬미팅 상세보기
export async function MeetingDetailAPI({ meetingId, memberId, email }) {
  const result = await axios
    .get(`${BASE_URL}meetings/${meetingId}`)
    .then(res => res.data.meeting);

  const applicant = await axios
    .get(`${BASE_URL}meetings/fan-applicant/list/${meetingId}?page=1&size=100`)
    .then(res => res.data.content);
  const applicantCnt = applicant.length;
  const isReserve = applicant.some(a => a[1] === email);
  const warningCount = isReserve
    ? await axios
        .get(`${BASE_URL}meetings/warning/${memberId}/${meetingId}`)
        .then(res => {
          if (res.data.message === 'Success') {
            return res.data.applicant.applicantWarnCount;
          }
        })
    : 0;

  return {
    id: result.meetingId,
    code: result.managerCode,
    codeName: result.managerGroup.managerCodeName,
    name: result.meetingName,
    openDate: result.meetingOpenDate,
    startDate: result.meetingStartDate,
    endDate: result.meetingEndDate,
    cnt: result.meetingCnt,
    price: result.meetingPrice,
    description: result.meetingDescription,
    image: result.meetingImgPath !== null ? result.meetingImgPath.fileId : null,
    approve: result.approve,
    applicantCnt,
    isReserve,
    warningCount,
  };
}

// 팬미팅 전체보기
export async function MeetingAllListAPI({ page, size }) {
  const result = await axios
    .get(`${BASE_URL}meetings/room-applicant?page=1&size=100`)
    .then(res => res.data.meetings.content);
  return result.map(data => {
    return {
      id: data.meetingId,
      code: data.managerCode,
      name: data.meetingName,
      startDate: data.meetingStartDate,
      endDate: data.meetingEndDate,
      approve: data.approve,
      image: data.meetingImgPath !== null ? data.meetingImgPath.fileId : null,
    };
  });
}

// 승인된 팬미팅 전체보기
export async function ApprovedMeetingListAPI({ page, size }) {
  const result = await axios
    .get(`${BASE_URL}meetings/room-applicant/approve?page=${page}&size=${size}`)
    .then(res => res.data.meetings.content);
  return result.map(data => {
    return {
      id: data.meetingId,
      code: data.managerCode,
      name: data.meetingName,
      startDate: data.meetingStartDate,
      endDate: data.meetingEndDate,
      approve: data.approve,
      image: data.meetingImgPath.fileId,
      description: data.meetingDescription,
    };
  });
}

// 승인대기중인 팬미팅 전체보기
export async function PendingMeetingListAPI({ page, size }) {
  const result = await axios.get(
    `${BASE_URL}meetings/room-applicant/pending?page=${page}&size=${size}`
  );
  return result;
}

// 팬미팅 승인
export async function PendingMeetingAPI(meeting) {
  await axios.get(`${BASE_URL}meetings/room-applicant/pending/${meeting.id}`);
  return {
    id: meeting.id,
    code: meeting.code,
    name: meeting.name,
    startDate: meeting.startDate,
    endDate: meeting.endDate,
    approve: true,
    image: meeting.image,
  };
}

// 팬미팅에 참여한 팬의 경고 횟수 확인
export async function WarningCountAPI({ memberId, meetingId }) {
  const result = await axios.get(
    `${BASE_URL}meetings/warning/${memberId}/${meetingId}`
  );
  return result;
}

// 팬미팅에 참여한 팬의 경고 주기
export async function WarningToMemberAPI({ memberId, meetingId }) {
  const result = await axios.put(
    `${BASE_URL}meetings/warning/${memberId}/${meetingId}`
  );
  return result;
}

// 미팅 종료
export async function EndMeetingAPI(meetingId) {
  await axios.put(`${BASE_URL}meetings/room-close?meetingId=${meetingId}`);
}

// 스타가 팬미팅 신청
export async function InsertMeetingAPI({
  managerCode,
  name,
  price,
  cnt,
  description,
  openDate,
  startDate,
  endDate,
  image,
}) {
  const form = new FormData();
  form.append(
    'meetingApply',
    new Blob(
      [
        JSON.stringify({
          managerCode: managerCode,
          meetingCnt: cnt,
          meetingDescription: description,
          meetingEndDate: endDate,
          meetingName: name,
          meetingOpenDate: openDate,
          meetingPrice: price,
          meetingStartDate: startDate,
        }),
      ],
      { type: 'application/json' }
    )
  );
  form.append('file', image);
  axios.post(`${BASE_URL}meetings/room-applicant`, form, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
}

// 추억 보관함 사진 저장하기
export async function setRecordImageAPI({ meetingId, memberId, fileUrl }) {
  await axios
    .post(`${BASE_URL}meetings/record-img`, {
      fileUrl: fileUrl,
      meetingId: meetingId,
      memberId: memberId,
    })
    .then(res => console.log(res));
}

// 추억 보관함 사진,비디오 불러오기
export async function getRecordAPI({ meetingId, memberId }) {
  const fileId = await axios
    .get(`${BASE_URL}meetings/record-img/${meetingId}/${memberId}`)
    .then(res => res.data.list[0].fileId);
  const video = await axios
    .get(`${BASE_URL}meetings/record-video/${meetingId}/${memberId}`)
    .then(res => res.data.fileUrl);
  return {
    image: fileId,
    video: video,
  };
}
