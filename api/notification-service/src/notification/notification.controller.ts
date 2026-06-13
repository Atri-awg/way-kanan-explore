import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { NotificationService } from './notification.service';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(
    @Body()
    createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll(
    @Query()
    query: QueryNotificationDto,
  ) {
    return this.notificationService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.notificationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,

    @Body()
    updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Patch(':id/read')
  markAsRead(
    @Param('id')
    id: string,
  ) {
    return this.notificationService.markAsRead(id);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.notificationService.remove(id);
  }

  @Patch(':id/restore')
  restore(
    @Param('id')
    id: string,
  ) {
    return this.notificationService.restore(id);
  }
}
