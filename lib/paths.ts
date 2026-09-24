export const APP_BASE_PATH = "/nullbreach";

export const appPath = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/"
    ? APP_BASE_PATH
    : `${APP_BASE_PATH}${normalizedPath}`;
};
