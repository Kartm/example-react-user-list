import { act, fireEvent, render, RenderResult } from "@testing-library/react";
import { IUser } from "./shared/user.model";
import UserListView from "./views/UserListView";

const mockUsers: IUser[] = [
  {
    id: 1,
    name: "Name name",
    username: "username",
    website: "username.com",
  },
];

beforeEach(() => {
  const mockJsonPromise = Promise.resolve(mockUsers);
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  });
  var globalRef: any = global;
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
});

test("renders a list", async () => {
  let component: any;

  await act(async () => {
    component = render(<UserListView />);
  });

  expect(component.getByText("Name name")).toBeTruthy();
  expect(component.getByText("@username")).toBeTruthy();
});

test("filters a list", async () => {
  let component: RenderResult;

  await act(async () => {
    component = render(<UserListView />);
  });

  const input = component!.getByLabelText("search-input");
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "23" } });
  expect(component!.getByText("No results found.")).toBeTruthy();
});

test("undos a filter", async () => {
  let component: RenderResult;

  await act(async () => {
    component = render(<UserListView />);
  });

  const input = component!.getByLabelText("search-input");
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "23" } });
  expect(component!.getByText("No results found.")).toBeTruthy();

  fireEvent.change(input, { target: { value: "" } });
  expect(() => component!.getByText("No results found.")).toThrow();
});
