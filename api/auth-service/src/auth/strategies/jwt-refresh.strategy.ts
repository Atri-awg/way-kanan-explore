import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'refresh_waykanan_secret',
      passReqToCallback: true, // Supaya bisa mengambil string token mentahnya
    });
  }

  validate(req: Request, payload: any) {
  // Ditambahkan null-protection menggunakan fallback || '' untuk mengatasi TS2532
    const authHeader = req.get('Authorization') || '';
    const refreshToken = authHeader.replace('Bearer', '').trim();
    
    return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        refreshToken,
    };
    }
}