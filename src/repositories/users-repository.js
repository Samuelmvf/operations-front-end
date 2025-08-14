import { BaseRepository } from "./base-repository.js";

const USERS_BASE_PATH = "/users";
export class UsersRepository extends BaseRepository {
  constructor() {
    super(USERS_BASE_PATH);
  }

  async getCurrentUser() {
    return this.get("/me");
  }
}

export const usersRepository = new UsersRepository();
export default usersRepository;
