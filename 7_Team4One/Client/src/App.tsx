import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/user";
import RootLayout from "./components/layouts/root";
import AuthLayout from "./components/layouts/auth";
import PrivateRoutes from "./components/routing/PrivateRoutes/PrivateRoutes";
import OrganisationGrid from "./views/organisation/OrganisationGrid";
import { Home, About, Login, Register } from "./views";
import DonationPage from "./views/donation/Page";
import Profile, { PersonalProfile } from "./views/profile";
import Rescue from "./views/rescue";
import ResetPassword from "./views/reset-password/page";
import Organisations from "./views/organisation/page";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "about", element: <About /> },
          { path: "organizations", element: <Organisations /> },
          {
            element: <PrivateRoutes />,
            children: [
              {
                path: "profile",
                element: <Profile />,
                children: [
                  { path: "", element: <PersonalProfile /> },
                  { path: "account", element: <h1>TODO: Account</h1> },
                ],
              },
              {
                path: "rescue",
                element: <Rescue />,
              },
              {
                path: "donate",
                element: <DonationPage />,
              },
            ],
          },
          {
            element: <PrivateRoutes orgRoute />,
            children: [
              {
                path: "rescue-requests",
                element: <p>Todo: RescueRequests</p>,
              },
            ],
          },
          {
            path: "orglist",
            element: <OrganisationGrid />,
          },
          { path: "*", element: <h1>Not Found</h1> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <UserProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          theme="dark"
          transition={Slide}
        />
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
};

export default App;
