import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    const result = await this.authService.signUp(signUpDto);
    return result;
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const result = await this.authService.login(loginDto);
    return result;
  }

  @Get("user/:id")
  async getUser(@Param("id") id: string): Promise<{ user: any }> {
    const user = await this.authService.getUser(id);

    return { user };
  }

  @Post("edit")
  async updateUser(@Body() user: any): Promise<{ user: any }> {
    const result = await this.authService.updateUser(user);
    return { user: result };
  }
}
