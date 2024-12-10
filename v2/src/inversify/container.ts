// inversify.config.ts
import { Container } from "inversify";
import TYPES from "./types";
import { IUserService } from "../api/services/interfaces/IUserService";
import { IUserRepository } from "../api/repositories/interfaces/IUserRepository";
import { AuthController } from "../api/controllers/AuthController";
import { IAuthService } from "../api/services/interfaces/IAuthService";
import { AuthService } from "../api/services/AuthService";
import { IAuthRepository } from "../api/repositories/interfaces/IAuthRepository";
import { AuthRepository } from "../api/repositories/AuthRepository";

import { UserController } from "../api/controllers/UserController";
import { UserService } from "../api/services/UserService";
import { UserRepository } from "../api/repositories/UserRepository";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository);

export default container;
