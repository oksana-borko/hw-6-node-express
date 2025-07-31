import {User} from "../model/userTypes.js";

export interface UserService {
    addUser(user:User):boolean;
    removeUser(id:number):User;
    getAllUsers():User[];
    getUserById(id:number):User;
    updateUser(newUser:User):void;
}