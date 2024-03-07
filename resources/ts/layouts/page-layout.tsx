import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren } from "react";

interface PageLayoutProps extends PropsWithChildren {}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
    return (
        <Container fixed>
            <Stack
                direction="column"
                paddingTop="20px"
                paddingBottom="20px"
                alignItems="center"
            >
                {children}
            </Stack>
        </Container>
    );
};

export default PageLayout;
