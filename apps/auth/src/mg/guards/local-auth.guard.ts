import { AuthGuard } from '@nestjs/passport';

// local est le nom de la stratégie que l'on utilise
export class LocalAuthGuard extends AuthGuard('local') {}
