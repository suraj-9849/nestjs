import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsEnum(["INTERN", "ADMIN", "USER"], {
        message: "Valid Role Required"
    })
    role: "INTERN" | "ADMIN" | "USER"
} 