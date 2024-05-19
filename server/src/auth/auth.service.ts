import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schema/user.schema";

import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (password.length < 8) {
      throw new UnauthorizedException("Password must be at least 8 characters");
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException("User not found.");
    }

    return user;
  }
  async updateUser(data: any): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      data._id,
      data.user,
      {
        new: true,
      }
    );
    return updatedUser;
  }
}
