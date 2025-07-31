import {UserService} from "./UserService.js";
import {User} from "../model/userTypes.js";
import {UserFilePersistenceService} from "./UserFilePersistenceService.js";
import fs from "fs";
import {myLogger} from "../utils/logger.ts";

export  class UserServiceEmbeddedImpl implements UserService, UserFilePersistenceService{
    private users: User[] = [];
    private rs = fs.createReadStream('data.txt',{encoding: "utf-8", highWaterMark:24})

    addUser(user: User): boolean {
        if(this.users.findIndex((u:User) => u.id === user.id) === -1)
        {
            this.users.push(user);
            return true;
        }
        return false;
    }

    getAllUsers(): User[] {
        return [...this.users];
    }

    getUserById(id: number): User {
       const user = this.users.find(item => item.id === id);
       if(!user) throw "404";
        return user;
    }

    removeUser(id: number): User {
        const index = this.users.findIndex(item => item.id === id);
        if(index === -1) throw "404";
        const removed = this.users[index];
        this.users.splice(index, 1);
        return removed;
    }

    updateUser(newUser: User): void {
        const index = this.users.findIndex(item => item.id === newUser.id);
        if(index === -1) throw "404";
        this.users[index] = newUser;
    }

    async restoreDataFromFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            let result = "";

            this.rs.on('data', (chunk) => {
                if (chunk) {
                    console.log("Got chunk");
                    result += chunk.toString();
                }
            });

            this.rs.on('end', () => {
                try {
                    if (result) {
                        this.users = JSON.parse(result);
                        myLogger.log("Data was restored from file");
                        myLogger.save("Data was restored from file");
                    } else {
                        this.users = [{ id: 123, userName: "Panikovsky" }];
                    }
                    this.rs.close();
                    resolve("Ok");
                } catch (e) {
                    myLogger.log("JSON parse error: " + (e as Error).message);
                    this.users = [{ id: 456, userName: "ParserErrorFallback" }];
                    resolve("Recovered with fallback after parse error");
                }
            });

            this.rs.on('error', (err) => {
                this.users = [{ id: 2, userName: "Bender" }];
                myLogger.log("File to restore not found or read error: " + err.message);
                resolve("Recovered with fallback after read error");
            });
        });
    }

    async saveDataToFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            const ws = fs.createWriteStream('data.txt', { flags: 'w' });
            myLogger.log("WriteStream created");

            const data = JSON.stringify(this.users);
            myLogger.log("Data to save: " + data);

            ws.write(data, (err) => {
                if (err) {
                    myLogger.log("Write error: " + err.message);
                    reject("Error writing to file");
                    return;
                }
                ws.end();
            });

            ws.on('finish', () => {
                myLogger.log("Data was saved to file");
                myLogger.save("Data was saved to file");
                resolve("Ok");
            });

            ws.on('error', (err) => {
                myLogger.log("Stream error: " + err.message);
                reject("Stream error");
            });
        });
    }
}