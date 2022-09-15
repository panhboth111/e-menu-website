import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Patch,
  Body,
} from '@nestjs/common';
import { UpdateProfileDto } from 'src/users/dto/update-profile.dto';
import { Role } from 'src/users/enums/role.enum';

import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './passport/guards/jwt-auth.guard';
import { LocalAuthGuard } from './passport/guards/local-auth.guard';
import { RolesGuard } from './passport/guards/role-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //get the profile of the user
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.email);
  }
  //log user in and returns jwt
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    return 'logged out';
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('profile')
  test(@Body() updateUserDto: UpdateProfileDto, @Request() req) {
    return this.authService.updateProfile(req.user.id, updateUserDto);
  }
}
