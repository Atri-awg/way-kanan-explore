import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { Notification, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const data: Notification = await this.prisma.notification.create({
      data: createNotificationDto,
    });

    return {
      success: true,
      message: 'Notifikasi berhasil dibuat',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data,
    };
  }

  async findAll(query: QueryNotificationDto) {
    const page = Number(query.page ?? 1);

    const limit = Number(query.limit ?? 10);

    const skip = (page - 1) * limit;

    const where: Prisma.NotificationWhereInput = {
      deletedAt: null,
    };

    const data: Notification[] = await this.prisma.notification.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total: number = await this.prisma.notification.count({
      where,
    });

    return {
      success: true,
      metadata: {
        status: HttpStatus.OK,
        total_data: total,
        page,
        limit,
      },
      data,
    };
  }

  async findOne(id: string) {
    const data: Notification | null = await this.prisma.notification.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Notifikasi tidak ditemukan',
      });
    }

    return {
      success: true,
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async markAsRead(id: string) {
    const notification: Notification | null =
      await this.prisma.notification.findUnique({
        where: { id },
      });

    if (!notification) {
      throw new NotFoundException({
        success: false,
        message: 'Notifikasi tidak ditemukan',
      });
    }

    const data: Notification = await this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });

    return {
      success: true,
      message: 'Notifikasi berhasil dibaca',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notification: Notification | null =
      await this.prisma.notification.findUnique({
        where: { id },
      });

    if (!notification) {
      throw new NotFoundException({
        success: false,
        message: 'Notifikasi tidak ditemukan',
      });
    }

    const data: Notification = await this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });

    return {
      success: true,
      message: 'Notifikasi berhasil diperbarui',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async remove(id: string) {
    const notification: Notification | null =
      await this.prisma.notification.findUnique({
        where: { id },
      });

    if (!notification) {
      throw new NotFoundException({
        success: false,
        message: 'Notifikasi tidak ditemukan',
      });
    }

    await this.prisma.notification.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Notifikasi berhasil dihapus',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }

  async restore(id: string) {
    const notification: Notification | null =
      await this.prisma.notification.findUnique({
        where: { id },
      });

    if (!notification) {
      throw new NotFoundException({
        success: false,
        message: 'Notifikasi tidak ditemukan',
      });
    }

    await this.prisma.notification.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });

    return {
      success: true,
      message: 'Notifikasi berhasil direstore',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }
}
