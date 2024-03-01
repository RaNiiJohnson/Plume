import { useQuery } from "@tanstack/react-query";
import { Spotlight } from "./components/ui/Spotlight";

function App() {
  const { data } = useQuery({
    queryKey: ["Posts"],
    queryFn: () =>
      fetch("http://localhost:5000/api/posts/").then((res) => res.json),
  });

  return (
    <div>
      <Spotlight
        className="left-0 -top-40 md:left-60 md:-top-20"
        fill="white"
      />
    </div>
  );
}

export default App;
