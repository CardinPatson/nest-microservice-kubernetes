import { PGAbstractInterface } from "@app/common/database";
import { Users } from "../models/users.entity";

export interface UsersRepositoryInterface extends PGAbstractInterface<Users>{}