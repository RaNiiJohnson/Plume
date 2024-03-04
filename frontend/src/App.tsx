import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./features/layout/Main";
import Home from "./pages/Home";
import PostView from "./pages/PostView";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "post/:id",
        element: <PostView />
      },
    ]
  }
])
const App = () => {

  return (
    <RouterProvider router={router} />
  );
};

export default App;
