import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'exception_log', schema: 'aurora' })
export class ExceptionLog {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'opt_url', type: 'varchar', comment: '请求接口', length: 255 })
  optUrl: string;

  @Column({ name: 'opt_method', type: 'varchar', comment: '请求方式', length: 255 })
  optMethod: string;

  @Column({
    name: 'request_param',
    type: 'varchar',
    nullable: true,
    comment: '请求参数',
    length: 2000,
  })
  requestParam: string | null;

  @Column({
    name: 'opt_desc',
    type: 'varchar',
    nullable: true,
    comment: '操作描述',
    length: 255,
  })
  optDesc: string | null;

  @Column({
    name: 'exception_info',
    type: 'text',
    nullable: true,
    comment: '异常信息',
  })
  exceptionInfo: string | null;

  @Column({
    name: 'ip_address',
    type: 'varchar',
    nullable: true,
    comment: 'ip',
    length: 255,
  })
  ipAddress: string | null;

  @Column({
    name: 'ip_source',
    type: 'varchar',
    nullable: true,
    comment: 'ip来源',
    length: 255,
  })
  ipSource: string | null;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    nullable: true,
    comment: '操作时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
}
