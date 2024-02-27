import { SetMetadata } from '@nestjs/common';
import { ReturnType as Type } from '@/types';

export const ReturnType = (returnType: Type) => SetMetadata('returnType', returnType);
