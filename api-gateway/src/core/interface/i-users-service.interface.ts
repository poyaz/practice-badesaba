export const USERS_SERVICE = 'USERS_SERVICE';

export interface IUsersServiceInterface {
  readonly type: string;

  getAll(): Promise<{ error?: any, result?: Array<Object> }>;

  getById(id: string): Promise<{ error?: any, result?: Object }>;

  addUser(body: object): Promise<{ error?: any, result?: Object }>;

  updateUser(id, body: object): Promise<{ error?: any, result?: Object }>;

  deleteUser(id): Promise<{ error?: any }>;
}
