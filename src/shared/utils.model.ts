import { IUser } from "./user.model";

export interface ApiResponse {
  users: IUser[];
  error?: string;
}
