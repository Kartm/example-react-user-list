import { act, fireEvent, render, RenderResult } from "@testing-library/react";
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

test("filters a list", async () => {
  const mockJsonPromise = Promise.resolve(mockUsers);
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  });
  var globalRef: any = global;
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  let component: RenderResult;

  await act(async () => {
    component = render(<UserListView />);
  });

  const input = component!.getByLabelText("search-input");
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "23" } });
  expect(component!.getByText("brak wyników")).toBeTruthy();
});

test("undos a filter", async () => {
  const mockJsonPromise = Promise.resolve(mockUsers);
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  });
  var globalRef: any = global;
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  let component: RenderResult;

  await act(async () => {
    component = render(<UserListView />);
  });

  const input = component!.getByLabelText("search-input");
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "23" } });
  expect(component!.getByText("brak wyników")).toBeTruthy();

  fireEvent.change(input, { target: { value: "" } });
  expect(() => component!.getByText("brak wyników")).toThrow();
});
