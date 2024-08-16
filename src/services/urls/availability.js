export const all_availabilities_url = () => `/availability/all`;
export const availability_url = () => `/availability`;
export const user_availability_url = (userId) => `/availability/user/${userId}`;
export const single_availability_url = (avlId) => `/availability/${avlId}`;
export const recurrent_availability_url = () => `/availability/recurrent`;
export const single_recurrent_availability_url = (recurrentId) =>
  `/availability/recurrent/${recurrentId}`;
