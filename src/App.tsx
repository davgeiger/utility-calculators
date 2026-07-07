import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./NavBar";
import DonationCalculator from "./DonationCalculator";
import VideoSpeedCalculator from "./VideoSpeedCalculator";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { path: "/donation-calc", element: <DonationCalculator /> },
        { path: "/speed-calc", element: <VideoSpeedCalculator /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
