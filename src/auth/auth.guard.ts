import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PUBLIC_KEY } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Switch context sang http de lay cac request dang toi
    const request = context.switchToHttp().getRequest()
    // Lay metadata tu cac handler, route de check xem handler do la public hay private
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    // Handler do ma public thi khong can token
    if (isPublic) {
      return true
    }
    const token = this.extractToken(request)
    if (!token) {
      throw new UnauthorizedException('', { cause: new Error(), description: 'INVALID_TOKEN' })
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token)
      const { userId } = decoded
      request['userId'] = userId
      return true
    } catch (error) {
      throw new UnauthorizedException('', { cause: new Error(), description: 'INVALID_TOKEN' })
    }
  }

  extractToken(request: Request) {
    if (!request.headers['authorization'] || !request.headers['authorization'].startsWith('Bearer')) {
      throw new UnauthorizedException('', { cause: new Error(), description: 'MISSING_TOKEN' })
    }
    const token = request.headers['authorization'].split(' ')[1]
    return token
  }
}