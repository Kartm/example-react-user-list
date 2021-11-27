import { IUser } from "./user.model";
import { ApiResponse } from "./utils.model";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const DEFAULT_ERROR_MSG =
  "Something went wrong. Please try refreshing the page.";

const getUsers = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(usersUrl);
    const json = await response.json();

    if (!response.ok || !json) {
      return {
        users: [],
        error: DEFAULT_ERROR_MSG,
      };
    }

    return {
      users: json as IUser[],
    };
  } catch (error) {
    return {
      users: [],
      error: DEFAULT_ERROR_MSG,
    };
  }
};

export { getUsers };
