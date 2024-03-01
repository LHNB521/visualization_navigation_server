import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { Share } from '@/utils/share';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), Share],
  controllers: [],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
