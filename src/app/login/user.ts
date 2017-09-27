export interface User {
    id_number: number;
    firstName: string;
    username: string;
    lastName: string;
    role: string;
    email: string;
    permissions: string[];
    entry_date : Date;
}
