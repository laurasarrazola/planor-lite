import { ApiProperty } from '@nestjs/swagger';
//import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class EliminarUsuarioDto {
  @ApiProperty({
    description: 'Contraseña actual del usuario',
    required: true,
    minLength: 8,
    maxLength: 255,
  })
  // @Transform(({ value }: { value: unknown }) => {
  //   if (typeof value === 'string') {
  //     const trimmed: string = value.trim();
  //     if (trimmed === '') {
  //       return undefined;
  //     }
  //     return trimmed;
  //   }
  //   return value;
  //})
  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/,
  )
  contrasenaActual!: string;
}
