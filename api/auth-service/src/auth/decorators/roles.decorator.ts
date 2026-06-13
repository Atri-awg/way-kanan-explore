import { SetMetadata } from '@nestjs/common'; // Sesuaikan dengan output generator prisma kamu
import { Role } from 'src/generated/prisma/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);