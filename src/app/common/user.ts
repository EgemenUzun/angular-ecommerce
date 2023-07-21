import { Role } from "./role";

export class User {
    constructor(public userId:string,
        public username:string,
        public password:string,
        public athorities:Role[]){}
}
