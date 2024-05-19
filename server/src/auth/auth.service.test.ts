import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "./schema/user.schema";

describe("AuthService", () => {
  let authService: AuthService;
  let model: Model<User>;
  let jwtService: JwtService;

  const mockUser = {
    _id: "61c0ccf11d7bf83d153d7c06",
    username: "test",
    email: "test@test.com",
  };

  let token = "63257etgwhgdate8733434d";

  const mockAuthService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    model = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });
  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("logIn", () => {
    const loginDto = {
      email: "test@test.com",
      password: "12345678",
    };

    it("should login and returns token", async () => {
      jest.spyOn(model, "findOne").mockResolvedValueOnce(mockUser);

      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
      jest.spyOn(jwtService, "sign").mockReturnValue(token);

      const result = await authService.login(loginDto);

      expect(result).toEqual({ token });
    });

    it("should throw invalid email error", async () => {
      jest.spyOn(model, "findOne").mockResolvedValueOnce(null);

      expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it("should throw invalid password error", async () => {
      jest.spyOn(model, "findOne").mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);

      expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
