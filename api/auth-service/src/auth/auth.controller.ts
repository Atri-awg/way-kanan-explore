import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/jwt-refresh.guard';
// Ubah bagian ini menjadi 'import type' untuk mengatasi TS1272
import type { Request } from 'express'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, false);
  }

  @Post('cms/login')
  cmsLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, true);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    // Gunakan optional chaining (?.) untuk mengatasi TS18048
    const userId = req.user?.['id'];
    const refreshToken = req.user?.['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    // Gunakan optional chaining (?.) untuk mengatasi TS18048
    const userId = req.user?.['id'];
    return this.authService.logout(userId);
  }
}