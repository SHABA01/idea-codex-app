// src/utils/storage.js

const KEY = "ideaCodexUser";

export const getSavedUser = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveUser = (userObj) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(userObj));
    window.dispatchEvent(new CustomEvent("ideaCodexUserUpdated", { detail: userObj }));
  } catch {}
};

export const clearUser = () => {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("ideaCodexUserUpdated", { detail: null }));
  } catch {}
};
