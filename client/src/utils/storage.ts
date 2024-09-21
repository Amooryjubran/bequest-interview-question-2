export const getStoredHash = (): string | null => {
  return localStorage.getItem("dataHash");
};

export const setStoredHash = (hash: string): void => {
  localStorage.setItem("dataHash", hash);
};

export const getBackupData = (): string | null => {
  return localStorage.getItem("backupData");
};

export const setBackupData = (data: string): void => {
  localStorage.setItem("backupData", data);
};
