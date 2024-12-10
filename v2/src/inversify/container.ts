// inversify.config.ts
import { Container } from "inversify";
import TYPES from "./types";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { IUserService } from "../services/interfaces/IUserService";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { AuthController } from "../controllers/AuthController";
import { IAuthService } from "../services/interfaces/IAuthService";
import { AuthService } from "../services/AuthService";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { AuthRepository } from "../repositories/AuthRepository";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository);

export default container;
