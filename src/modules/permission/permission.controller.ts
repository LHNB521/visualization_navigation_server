import { JwtGuard, PreviewGuard } from '@/common/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';

@UseGuards(JwtGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Post('batch/create')
  @UseGuards(JwtGuard)
  createBatch(@Body() createPermissionDtos: CreatePermissionDto[]) {
    return this.permissionService.createBatch(createPermissionDtos);
  }

  @Get('list')
  findAll() {
    return this.permissionService.findAll();
  }

  @Get('tree')
  findAllTree() {
    return this.permissionService.findAllTree();
  }

  @Get('menu/tree')
  findMenuTree() {
    return this.permissionService.findMenuTree();
  }

  @Patch('update/:id')
  @UseGuards(PreviewGuard)
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete('delete/:id')
  @UseGuards(PreviewGuard)
  delete(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }

  @Get('button-and-api/:parentId')
  findButtonAndApi(@Param('parentId') parentId: string) {
    return this.permissionService.findButtonAndApi(+parentId);
  }

  /* 校验 path 存不存在menu资源内  */
  @Get('menu/validate')
  validateMenuPath(@Query('path') path: string) {
    return this.permissionService.validateMenuPath(path);
  }
}
