import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UpdateProfileDto } from 'src/users/dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //get the profile of the logged in user
  async getProfile(email: string) {
    try {
      const user = await this.usersService.findAuthUser(email);
      return { user };
    } catch (error) {
      return null;
    }
  }
  //validate the credential
  async validateUser(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findAuthUser(loginDto.email);

      const isMatch = await compare(loginDto.password, user.password);

      return isMatch ? user : null;
    } catch (error) {
      return null;
    }
  }
  //sign the jwt for the auth user
  async login(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    try {
      console.log(id);
      console.log(updateProfileDto);
      const response = await this.usersService.updateProfile(
        id,
        updateProfileDto,
      );
      return response;
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
}
