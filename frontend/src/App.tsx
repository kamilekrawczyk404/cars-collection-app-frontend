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
import { ModalProvider } from "./context/modals/Modal";

type View = "Home" | "Update" | "Create";
type Views = {
  [V in View]: {
    path: string;
    element: React.ReactElement;
    showInHeader: boolean;
  };
};

export const views: Views = {
  Home: { path: "/", element: <List />, showInHeader: true },
  Create: { path: "/create", element: <Create />, showInHeader: true },
  Update: { path: "/update/:carId", element: <Update />, showInHeader: false },
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
            <div className={"flex lg:gap-8 md:gap-6 gap-4 items-end"}>
              {Object.entries(views).map(
                ([name, view], index) =>
                  view.showInHeader && (
                    <Link
                      to={view.path}
                      key={index}
                      className={"text-neutral-200"}
                    >
                      {name}
                    </Link>
                  ),
              )}
            </div>
          </div>
        </nav>
      </div>

      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Routes>
            {Object.entries(views).map(([_, view], index) => (
              <Route key={index} path={view.path} element={view.element} />
            ))}
          </Routes>
          <Toaster position={"bottom-right"} reverseOrder={false} />
        </ModalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
