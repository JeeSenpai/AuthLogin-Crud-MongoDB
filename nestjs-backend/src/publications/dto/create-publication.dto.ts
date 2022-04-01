import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePublicationDto
{       @ApiProperty()
        @IsNotEmpty()
        title: string;

        @ApiProperty()
        @IsNotEmpty()
        description: string;
}


