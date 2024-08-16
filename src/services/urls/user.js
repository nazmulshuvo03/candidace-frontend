export const dashboard_profiles_url = (query = "") =>
  `/user/dashboard${query ? "?" + query : ""}`;
export const all_users_url = () => `/user/users`;
export const all_profile_url = () => `/user/all`;
export const public_user_url = (userId) => `/user/public/${userId}`;
export const user_url = (userId) => `/user/${userId}`;
export const users_check_prop_url = () => `/user/check`;
export const user_progress = () => `/user/progress`;
export const user_email_subscription_url = () => `/user/subscription`;
export const user_last_visit_url = () => `/user/lastVisit`;
