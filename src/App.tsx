import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import List from "./views/List";
import Update from "./views/Update";
import Create from "./views/Create";
import Delete from "./views/Delete";
import { Car } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

type View = "Home" | "Update" | "Create";
type Views = {
  [V in View]: { path: string; element: React.ReactElement };
};

export const views: Views = {
  Home: { path: "/", element: <List /> },
  Update: { path: "/update", element: <Update /> },
  Create: { path: "/create", element: <Create /> },
};

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  });

  return (
    <BrowserRouter>
      <div className="App tracking-tighter">
        <nav className={"w-full p-4 bg-neutral-900"}>
          <div className={"mx-auto max-w-7xl flex lg:gap-12 md:gap:8 gap-4"}>
            <h3
              className={
                "text-2xl font-semibold text-neutral-200 inline-flex items-center gap-x-2 tracking-tight"
              }
            >
              <Car size={"1.75rem"} />
              <span className={"md:inline hidden"}>Cars collection</span>
            </h3>
            <div className={"flex gap-4 items-end"}>
              {Object.entries(views).map(([name, view], index) => (
                <Link to={view.path} key={index} className={"text-neutral-200"}>
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {Object.entries(views).map(([_, view], index) => (
            <Route key={index} path={view.path} element={view.element} />
          ))}
        </Routes>
        <Toaster position={"bottom-right"} reverseOrder={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
