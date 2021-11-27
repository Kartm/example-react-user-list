import { act, render } from "@testing-library/react";
import { IUser } from "./shared/user.model";
import UserListView from "./views/UserListView";

const mockUsers: IUser[] = [
  {
    id: 1,
    name: "Name name",
    username: "username",
  },
];

test("renders a list", async () => {
  const mockJsonPromise = Promise.resolve(mockUsers);
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  });
  var globalRef: any = global;
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  let component: any;

  await act(async () => {
    component = render(<UserListView />);
  });

  expect(component.getByText("Name name @username")).toBeTruthy();
});
