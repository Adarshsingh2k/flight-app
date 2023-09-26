import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Body from "./components/Body";
import Login from "./components/Login";
import { UserProvider } from "./state/UserContext";
import Header from "./components/Header";
import { ProtectedRoute } from "./utils/ProtectedRoute";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/body",
        element: (
          <ProtectedRoute>
            <Body />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const simpleRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/body",
    element: <Body />,
  },
]);

function App() {
  return (
    <UserProvider>
      <div className="App">
        <RouterProvider router={appRouter}></RouterProvider>
      </div>
    </UserProvider>
  );
}

export default App;
