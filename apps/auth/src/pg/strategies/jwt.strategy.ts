import { PassportStrategy } from "@nestjs/passport"
import { UsersService } from "../users/users.service"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Request } from "express"
import { ConfigService } from "@nestjs/config"
import { TokenPayload } from "../interfaces/token-payload.interface"
import { Injectable } from "@nestjs/common"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(configService: ConfigService, private readonly userService: UsersService){
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request)=> request?.cookies?.Authentification
      ]),
      secretOrKey: configService.get("JWT_SECRET")
      // secretOrKey: 'gSOhMEWxft7GvRnWk4EE'
    })
  }

  async validate({userId}: TokenPayload){
    return this.userService.getUser({id: +userId})
  }
}