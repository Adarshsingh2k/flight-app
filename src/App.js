import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Body from "./components/Body";
import Login from "./components/Login";
import { UserProvider } from "./state/UserContext";
import Header from "./components/Header";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import GptBody from "./components/gpt/GptBody";
import FlightContext from "./state/FlightContext";
import { useState } from "react";

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
    element: <AppLayout />,
    children: [
      {
        path: "/",
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
      {
        path: "/gpt-search",
        element: (
          <ProtectedRoute>
            <GptBody />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// const simpleRouter = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/body",
//     element: <Body />,
//   },
// ]);

function App() {
  const [flightData, setFlightData] = useState({});

  return (
    <UserProvider>
      <FlightContext.Provider value={{ flightData, setFlightData }}>
        <div className="App">
          <RouterProvider router={appRouter}></RouterProvider>
        </div>
      </FlightContext.Provider>
    </UserProvider>
  );
}

export default App;
