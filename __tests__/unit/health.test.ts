/** @jest-environment node */

import { prisma } from "@/lib/prisma";
import { GET } from "@/app/api/health/route";

jest.mock("@/lib/prisma", () => ({
  prisma: { $queryRaw: jest.fn() },
}));

const queryRaw = prisma.$queryRaw as jest.Mock;

describe("health endpoint", () => {
  it("reports a healthy database connection", async () => {
    queryRaw.mockResolvedValueOnce([{ result: 1 }]);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok" });
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("reports a degraded service without exposing the database error", async () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation();
    queryRaw.mockRejectedValueOnce(new Error("connection failed"));

    const response = await GET();

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ status: "degraded" });
    expect(consoleError).toHaveBeenCalledWith(
      "Health check failed",
      expect.any(Error),
    );
    consoleError.mockRestore();
  });
});
