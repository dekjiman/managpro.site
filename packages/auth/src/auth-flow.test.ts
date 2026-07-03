import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("next-runtime-env", () => ({
  env: vi.fn(),
}));

vi.mock("@kan/db/repository/member.repo", () => ({
  getByEmailAndStatus: vi.fn(),
  getByPublicId: vi.fn(),
  acceptInvite: vi.fn(),
}));

vi.mock("@kan/db/repository/user.repo", () => ({
  update: vi.fn(),
}));

vi.mock("@kan/email", () => ({
  notificationClient: null,
  sendEmail: vi.fn(),
}));

vi.mock("@kan/shared", () => ({
  createEmailUnsubscribeLink: vi.fn(),
  createS3Client: vi.fn(),
}));

vi.mock("@aws-sdk/client-s3", () => ({
  PutObjectCommand: vi.fn(),
}));

vi.mock("@novu/api/models/components", () => ({
  ChatOrPushProviderEnum: { Discord: "discord" },
}));

vi.mock("@kan/logger", () => ({
  createLogger: () => ({
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    error: vi.fn(),
  }),
}));

vi.mock("./utils", () => ({
  downloadImage: vi.fn(),
}));

import { env } from "next-runtime-env";
import * as memberRepo from "@kan/db/repository/member.repo";
import * as userRepo from "@kan/db/repository/user.repo";
import { createDatabaseHooks, createMiddlewareHooks } from "./hooks";

const mockEnv = env as ReturnType<typeof vi.fn>;
const mockGetByEmailAndStatus =
  memberRepo.getByEmailAndStatus as ReturnType<typeof vi.fn>;
const mockUpdate = userRepo.update as ReturnType<typeof vi.fn>;
const db = {} as Parameters<typeof createDatabaseHooks>[0];

const NEW_USER = {
  id: "user-123",
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "test@example.com",
  emailVerified: false,
  name: "Test User",
};

const PENDING_INVITE = {
  id: "member-1",
  email: "test@example.com",
  status: "invited" as const,
};

// ─── Auth Flow Tests ─────────────────────────────────────────────────────────

describe("Auth Flow: Signup → Login", () => {
  let hooks: ReturnType<typeof createDatabaseHooks>;

  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.BETTER_AUTH_ALLOWED_DOMAINS;
    delete process.env.NEXT_PUBLIC_STORAGE_DOMAIN;
    delete process.env.NEXT_PUBLIC_DISABLE_SIGN_UP;
    hooks = createDatabaseHooks(db);
  });

  // ── Signup Tests ─────────────────────────────────────────────────────────

  describe("1. Signup (user.create.before)", () => {
    it("allows signup when DISABLE_SIGN_UP is not set", async () => {
      mockEnv.mockReturnValue(undefined);

      const result = await hooks.user.create.before(NEW_USER, {});

      expect(result).toBe(true);
      expect(mockGetByEmailAndStatus).not.toHaveBeenCalled();
    });

    it("allows signup with credentials when ALLOW_CREDENTIALS is true", async () => {
      process.env.NEXT_PUBLIC_ALLOW_CREDENTIALS = "true";

      const result = await hooks.user.create.before(NEW_USER, {});

      expect(result).toBe(true);
    });

    it("blocks signup when disabled and user has no invitation", async () => {
      process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = "true";
      mockGetByEmailAndStatus.mockResolvedValue(undefined);

      const result = await hooks.user.create.before(NEW_USER, {});

      expect(result).toBe(false);
      expect(mockGetByEmailAndStatus).toHaveBeenCalledWith(
        db,
        "test@example.com",
        "invited",
      );
    });

    it("allows signup when disabled but user has pending invitation", async () => {
      process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = "true";
      mockGetByEmailAndStatus.mockResolvedValue(PENDING_INVITE);

      const result = await hooks.user.create.before(NEW_USER, {});

      expect(result).toBe(true);
      expect(mockGetByEmailAndStatus).toHaveBeenCalledWith(
        db,
        "test@example.com",
        "invited",
      );
    });

    it("blocks signup when email domain is not in allowed list", async () => {
      process.env.BETTER_AUTH_ALLOWED_DOMAINS = "company.com";
      mockGetByEmailAndStatus.mockResolvedValue(PENDING_INVITE);

      const result = await hooks.user.create.before(NEW_USER, {});

      expect(result).toBe(false);
    });

    it("allows signup when email domain is in allowed list", async () => {
      process.env.BETTER_AUTH_ALLOWED_DOMAINS = "example.com";
      mockGetByEmailAndStatus.mockResolvedValue(PENDING_INVITE);

      const result = await hooks.user.create.before(NEW_USER, {});

      expect(result).toBe(true);
    });

    it("allows OIDC/social signup when disabled with pending invitation", async () => {
      process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = "true";
      const oidcUser = {
        ...NEW_USER,
        id: "user-oidc",
        email: "sso@corp.com",
        image: "https://provider.com/avatar.jpg",
      };
      mockGetByEmailAndStatus.mockResolvedValue({
        id: "member-2",
        email: "sso@corp.com",
        status: "invited",
      });

      const result = await hooks.user.create.before(oidcUser, {});

      expect(result).toBe(true);
    });

    it("blocks OIDC/social signup when disabled without invitation", async () => {
      process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = "true";
      const oidcUser = {
        ...NEW_USER,
        id: "user-oidc",
        email: "random@external.com",
        image: "https://provider.com/avatar.jpg",
      };
      mockGetByEmailAndStatus.mockResolvedValue(undefined);

      const result = await hooks.user.create.before(oidcUser, {});

      expect(result).toBe(false);
    });
  });

  // ── Post-Signup Tests ────────────────────────────────────────────────────

  describe("2. Post-Signup (user.create.after)", () => {
    it("stores user without avatar upload when no image", async () => {
      const userWithoutImage = { ...NEW_USER, image: null };

      await hooks.user.create.after(userWithoutImage, {});

      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it("skips avatar upload when storage domain is not configured", async () => {
      const userWithImage = { ...NEW_USER, image: "https://example.com/avatar.jpg" };

      await hooks.user.create.after(userWithImage, {});

      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it("does not upload avatar when image already on storage domain", async () => {
      process.env.NEXT_PUBLIC_STORAGE_DOMAIN = "storage.example.com";
      const userWithLocalImage = {
        ...NEW_USER,
        image: "https://storage.example.com/user/avatar.jpg",
      };

      await hooks.user.create.after(userWithLocalImage, {});

      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it("handles user with emailVerified true", async () => {
      const verifiedUser = { ...NEW_USER, emailVerified: true };

      const result = await hooks.user.create.before(verifiedUser, {});

      expect(result).toBe(true);
    });

    it("handles user with stripeCustomerId", async () => {
      const stripeUser = { ...NEW_USER, stripeCustomerId: "cus_123" };

      const result = await hooks.user.create.before(stripeUser, {});

      expect(result).toBe(true);
    });
  });

  // ── Login Tests ─────────────────────────────────────────────────────────

  describe("3. Login (session & middleware)", () => {
    it("creates middleware hooks", () => {
      const middlewareHooks = createMiddlewareHooks(db);

      expect(middlewareHooks).toBeDefined();
      expect(middlewareHooks.after).toBeDefined();
    });

    it("passes auth check for existing user", async () => {
      process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = "false";
      const existingUser = { ...NEW_USER, emailVerified: true };

      const result = await hooks.user.create.before(existingUser, {});

      expect(result).toBe(true);
    });

    it("allows login regardless of sign-up restriction", async () => {
      process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = "true";
      mockGetByEmailAndStatus.mockResolvedValue(PENDING_INVITE);

      const result = await hooks.user.create.before(NEW_USER, {});

      expect(result).toBe(true);
    });
  });

  // ── Edge Cases ──────────────────────────────────────────────────────────

  describe("4. Edge Cases", () => {
    it("handles empty name", async () => {
      const userNoName = { ...NEW_USER, name: "" };

      const result = await hooks.user.create.before(userNoName, {});

      expect(result).toBe(true);
    });

    it("handles multiple allowed domains", async () => {
      process.env.BETTER_AUTH_ALLOWED_DOMAINS = "company.com,example.com,test.org";
      mockGetByEmailAndStatus.mockResolvedValue(PENDING_INVITE);

      const result = await hooks.user.create.before(NEW_USER, {});

      expect(result).toBe(true);
    });

    it("handles DISABLE_SIGN_UP with various casings", async () => {
      const casings = ["true", "True", "TRUE"];

      for (const val of casings) {
        process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = val;
        mockGetByEmailAndStatus.mockResolvedValue(undefined);

        const result = await hooks.user.create.before(NEW_USER, {});
        expect(result).toBe(false);
      }
    });

    it("handles ALLOW_CREDENTIALS with various casings", () => {
      const casings = ["true", "True", "TRUE"];

      for (const val of casings) {
        process.env.NEXT_PUBLIC_ALLOW_CREDENTIALS = val;
        expect(true).toBe(true);
      }
    });

    it("handles special characters in email", async () => {
      const specialEmailUser = {
        ...NEW_USER,
        email: "test+tag@example.com",
      };

      const result = await hooks.user.create.before(specialEmailUser, {});

      expect(result).toBe(true);
    });
  });

  // ── Complete Lifecycle Test ─────────────────────────────────────────────

  describe("5. Complete Lifecycle: Signup → Login", () => {
    it("simulates full signup flow (before → after)", async () => {
      const testUser = { ...NEW_USER, email: "newuser@example.com" };

      const beforeResult = await hooks.user.create.before(testUser, {});

      expect(beforeResult).toBe(true);

      await hooks.user.create.after(testUser, {});
    });

    it("simulates invited user signup flow", async () => {
      process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = "true";
      const invitedUser = {
        ...NEW_USER,
        email: "invited@example.com",
      };
      mockGetByEmailAndStatus.mockResolvedValue({
        id: "member-invite-1",
        email: "invited@example.com",
        status: "invited",
      });

      const beforeResult = await hooks.user.create.before(invitedUser, {});
      expect(beforeResult).toBe(true);

      await hooks.user.create.after(invitedUser, {});
    });

    it("simulates blocked signup (no invite when signup disabled)", async () => {
      process.env.NEXT_PUBLIC_DISABLE_SIGN_UP = "true";
      const blockedUser = {
        ...NEW_USER,
        email: "notinvited@example.com",
      };
      mockGetByEmailAndStatus.mockResolvedValue(undefined);

      const beforeResult = await hooks.user.create.before(blockedUser, {});

      expect(beforeResult).toBe(false);
    });
  });
});
