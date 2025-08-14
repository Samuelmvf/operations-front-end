import { BaseRepository } from "./base-repository.js";

const OPERATIONS_BASE_PATH = "/operations";
export class OperationsRepository extends BaseRepository {
  constructor() {
    super(OPERATIONS_BASE_PATH);
  }

  async getAllOperations() {
    return this.get("");
  }

  async addition(payload) {
    return this.post("/addition", payload);
  }

  async subtraction(payload) {
    return this.post("/subtraction", payload);
  }

  async multiplication(payload) {
    return this.post("/multiplication", payload);
  }

  async division(payload) {
    return this.post("/division", payload);
  }

  async squareRoot(payload) {
    return this.post("/square-root", payload);
  }

  async randomString(payload) {
    return this.post("/random-string", payload);
  }
}

export const operationsRepository = new OperationsRepository();
export default operationsRepository;
