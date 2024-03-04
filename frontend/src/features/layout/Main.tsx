import { Outlet } from "react-router";
import Header from "./Header";

export default function Main() {
  return (
    <div className="relative w-full h-full m-auto bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
