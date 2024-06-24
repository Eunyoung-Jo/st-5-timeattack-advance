import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./shared/Router";


const queryClient = new QueryClient();


function App() {
  return (
  <QueryClientProvider client={QueryClient}>
  <Router />
  </QueryClientProvider>
  );
}

export default App;
