import { BaseRepository } from "./base-repository.js";

const RECORDS_BASE_PATH = "/records";
export class RecordsRepository extends BaseRepository {
  constructor() {
    super(RECORDS_BASE_PATH);
  }

  /**
   * Get user records with optional search and pagination
   * @param {{ search?: string, page?: number, size?: number, sort?: string[] }} params
   */
  async getUserRecords({ search, page, size, sort } = {}) {
    const query = {};
    if (search) query.search = search;
    if (typeof page === "number") query.page = page;
    if (typeof size === "number") query.size = size;
    if (Array.isArray(sort) && sort.length > 0) query.sort = sort.join(",");
    return this.get("", query);
  }

  async getRecordById(recordId) {
    return this.get(`/${recordId}`);
  }

  async deleteRecord(recordId) {
    return this.delete(`/${recordId}`);
  }
}

export const recordsRepository = new RecordsRepository();
export default recordsRepository;
