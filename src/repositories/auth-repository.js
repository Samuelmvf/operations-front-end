/**
 * Authentication Repository
 * Operations API - /auth endpoints
 */
import { BaseRepository } from "./base-repository.js";

const AUTH_BASE_PATH = "/auth";

export class AuthRepository extends BaseRepository {
  constructor() {
    super(AUTH_BASE_PATH);
  }

  /**
   * User login
   * @param {{ username: string, password: string }} credentials
   */
  async login(credentials) {
    return this.post("/login", credentials);
  }

  /**
   * User registration
   * @param {{ username: string, password: string }} payload
   */
  async register(payload) {
    return this.post("/register", payload);
  }

  /**
   * Refresh token
   * @param {{ refreshToken: string }} payload
   */
  async refreshToken(payload) {
    return this.post("/refresh", payload);
  }

  /**
   * Logout user (invalidates JWT)
   */
  async logout() {
    return this.post("/logout");
  }
}

export const authRepository = new AuthRepository();
export default authRepository;
