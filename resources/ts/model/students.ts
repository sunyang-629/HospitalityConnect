export type StudentResponse = {
    id: number;
    name: string;
    distanceInKm: number;
};

export interface ISearchStudentForm {
    latitude: number;
    longitude: number;
    radius: number;
}
