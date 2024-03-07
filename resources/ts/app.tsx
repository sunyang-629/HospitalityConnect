import "./bootstrap";
import "../css/app.css";
import "@fontsource/inter";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        allVariants: {
            fontFamily: "inter",
        },
    },
});

const queryClient = new QueryClient();

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob("./pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider theme={darkTheme}>
                <CssBaseline>
                    <QueryClientProvider client={queryClient}>
                        <SnackbarProvider
                            maxSnack={3}
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "top",
                            }}
                        >
                            <App {...props} />
                        </SnackbarProvider>
                    </QueryClientProvider>
                </CssBaseline>
            </ThemeProvider>
        );
    },
});
