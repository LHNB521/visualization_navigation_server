import { CanActivate, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';

@Injectable()
export class PreviewGuard implements CanActivate {
  constructor(protected configService: ConfigService) {}
  canActivate(): boolean {
    if (this.configService.get('IS_PREVIEW') === 'true')
      throw new CustomException(ErrorCode.ERR_30001);
    return true;
  }
}
