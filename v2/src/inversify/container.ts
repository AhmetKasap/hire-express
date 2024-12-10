import { Container } from "inversify";
import TYPES from "./types";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { IUserService } from "../services/interfaces/IUserService";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";

const container = new Container();


container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

//container.bind<IUserRepository>(TYPES.UserRepository).to(PostgresUserRepository);


export default container;
