import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { SocketProvider } from "./context/SocketContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster richColors />
    </QueryClientProvider>
  </SocketProvider>
);
