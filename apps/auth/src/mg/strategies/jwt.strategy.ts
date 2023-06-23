import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../interfaces/token-payload.interface";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(configService: ConfigService,private readonly userService: UsersService){
    // specify where on the request object the jwt live
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentification
      ]),
      secretOrKey: configService.get("JWT_SECRET")
    })
  }

  async validate({userId}: TokenPayload){
    return this.userService.getUser({_id: userId})
  }
}