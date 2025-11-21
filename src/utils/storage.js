// src/utils/storage.js
export const USER_KEY = "ideaCodexUser";

export const getSavedUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("getSavedUser failed:", e);
    return null;
  }
};

export const saveUser = (userObj) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
    // emit a custom event so listeners update (works even in same tab)
    window.dispatchEvent(new CustomEvent("ideaCodexUserUpdated", { detail: userObj }));
    return true;
  } catch (e) {
    console.error("saveUser failed:", e);
    return false;
  }
};

export const updateUser = (patch) => {
  const cur = getSavedUser() || {};
  const merged = { ...cur, ...patch };
  saveUser(merged);
  return merged;
};

export const clearSavedUser = () => {
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new CustomEvent("ideaCodexUserUpdated", { detail: null }));
};
