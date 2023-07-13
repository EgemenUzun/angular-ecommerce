import { Role } from "./role";

export class User {
    userId!:string;
    username!:string;
    password!:string;
    athorities!:Role[];
}
