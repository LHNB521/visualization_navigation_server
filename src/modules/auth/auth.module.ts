import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // PassportModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     console.log(configService.get('JWT_SECRET'))
    //     return {
    //       secret: process.env.JWT_SECRET || configService.get('JWT_SECRET'),
    //     }
    //   }
    // })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }