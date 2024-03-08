import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreatePost from "./pages/Create";
import Home from "./pages/Home";
import Main from "./pages/Main";
import PostView from "./pages/PostView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "post/:id",
        element: <PostView />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
