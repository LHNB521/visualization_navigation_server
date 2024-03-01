import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Share } from '@/utils/share';
import { ResourceService } from './resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resource]), Share],
  // controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
