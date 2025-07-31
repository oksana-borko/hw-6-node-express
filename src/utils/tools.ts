import { IncomingMessage } from "node:http";

export const sayHi = (name: string): void => {
  console.log(`Hello ${name}`);
};

export async function parseBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed as T);
      } catch (e) {
        reject(new Error("Invalid json"));
      }
    });
  });
}

export const isUserType = (obj: any): boolean => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.userName === "string"
  );
};
