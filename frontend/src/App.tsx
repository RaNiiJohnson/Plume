import { useQuery } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { fetchToken } from "./actions/userAction";
import Home from "./pages/Home";
import Main from "./pages/Main";
import PostView from "./pages/PostView";
import { UidContext } from "./utils/AppContext";

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
    ],
  },
]);
const App = () => {
  const { data, isError } = useQuery({
    queryKey: ["Token"],
    queryFn: fetchToken,
  });

  if (isError) {
    return;
  }

  return (
    <UidContext.Provider value={data ?? ""}>
      <RouterProvider router={router} />
    </UidContext.Provider>
  );
};

export default App;
