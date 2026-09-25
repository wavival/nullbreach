import { APP_BASE_PATH, appPath } from "@/lib/paths";

describe("application paths", () => {
  it("uses the public microfrontend mount point", () => {
    expect(APP_BASE_PATH).toBe("/nullbreach");
    expect(appPath("/")).toBe("/nullbreach");
    expect(appPath("login")).toBe("/nullbreach/login");
    expect(appPath("/api/chat")).toBe("/nullbreach/api/chat");
  });
});
