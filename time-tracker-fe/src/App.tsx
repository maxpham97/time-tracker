import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./api/queryClient";
import { store } from "./redux/store";
import { renderRoutes } from "./routes/routes";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>{renderRoutes()}</BrowserRouter>
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
