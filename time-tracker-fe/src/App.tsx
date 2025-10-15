import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./api/queryClient";
import { renderRoutes } from "./routes/routes";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>{renderRoutes()}</BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
