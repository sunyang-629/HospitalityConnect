import React, { FC, Fragment } from "react";
import { StudentResponse } from "../../model";
import { distanceNumberToString } from "../../utils/helper";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

interface StudentListProps {
    students: StudentResponse[];
}

const StudentList: FC<StudentListProps> = ({ students }) => {
    return (
        <List
            component="nav"
            aria-label="students list"
            sx={{ maxWidth: 360, width: "100%" }}
        >
            {students.map((student) => (
                <Fragment key={student.id}>
                    <ListItem>
                        <ListItemText
                            primary={student.name}
                            secondary={distanceNumberToString(
                                student.distanceInKm
                            )}
                        />
                    </ListItem>
                    <Divider />
                </Fragment>
            ))}
        </List>
    );
};

export default StudentList;
