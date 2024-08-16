export const all_review_questions = (practiceAreaId) =>
  `/review/questions/${practiceAreaId}`;
export const review_interviewer = (meetingId, interviewerId) =>
  `/review/interviewer/${meetingId}/${interviewerId}`;
export const review_self = (meetingId, skillId) =>
  `/review/self/${meetingId}/${skillId}`;
export const user_reviews = (userId) => `/review/${userId}`;
