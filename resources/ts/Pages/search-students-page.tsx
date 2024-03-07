import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { PageLayout } from "../layouts";
import { SearchStudentForm } from "../components/search-students-page";

const SearchStudentsPage = () => {
    return (
        <PageLayout>
            <Typography variant="h3" component="h1">
                Search Nearby Students
            </Typography>

            <Container sx={{ marginTop: 5 }}>
                <SearchStudentForm />
            </Container>
        </PageLayout>
    );
};

export default SearchStudentsPage;
