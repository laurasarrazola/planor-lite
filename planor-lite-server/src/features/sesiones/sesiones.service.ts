// Gestiona los JWT invalidados para impedir reutilizar tokens después de cerrar sesión.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { TokenSesionInvalida } from './entities/token-sesion-invalida.entity';

@Injectable()
export class SesionesService {
  constructor(
    // Inyecta el repositorio TypeORM asociado a la entidad TokenSesionInvalida para operar sobre esa tabla.
    @InjectRepository(TokenSesionInvalida)
    private readonly repositorioTokensSesionInvalida: Repository<TokenSesionInvalida>,
  ) {}

  // Guarda un token JWT invalidado en la base de datos con su fecha de expiración.
  async guardarTokenInvalidado(
    token: string,
    fechaExpiracion: Date,
  ): Promise<TokenSesionInvalida> {
    // create() construye una entidad en memoria usando los datos recibidos, pero aún no la guarda en la BD.
    const nuevoTokenInvalidado = this.repositorioTokensSesionInvalida.create({
      token,
      fechaExpiracion,
    });
    // save() inserta el registro en la tabla para bloquear el uso futuro de este JWT.
    return this.repositorioTokensSesionInvalida.save(nuevoTokenInvalidado);
  }

  // Verifica si un token JWT ya ha sido invalidado y está presente en la tabla de tokens invalidados.
  async existeTokenInvalidado(token: string): Promise<boolean> {
    // Busca en la BD si el JWT ya fue registrado como inválido durante el cierre de sesión.
    const tokenEncontrado = await this.repositorioTokensSesionInvalida.findOne({
      where: {
        token,
      },
    });
    // Si no existe un registro, el token no ha sido invalidado.
    if (tokenEncontrado === null) {
      return false;
    }
    // Si existe un registro, AuthGuard rechazará el acceso aunque el JWT siga siendo válido.
    return true;
  }

  // Elimina de la base de datos todos los tokens JWT invalidados cuya fecha de expiración ya haya pasado.
  async eliminarTokensExpirados(): Promise<void> {
    // Obtiene la fecha actual para comparar con la expiración almacenada de cada token.
    const fechaActual = new Date();
    // LessThan genera la condición SQL "menor que" para eliminar tokens ya vencidos.
    await this.repositorioTokensSesionInvalida.delete({
      fechaExpiracion: LessThan(fechaActual),
    });
  }
}
