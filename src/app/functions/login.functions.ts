import { LoginService } from '../services/login.service';

export async function login(
  username: string,
  password: string,
  loginService: LoginService
): Promise<void> {
  console.log('Попытка входа с данными:', { username, password });

  try {
    await loginService.login(username, password).toPromise();
    console.log('Вход выполнен успешно');
  } catch (error) {
    console.error('Ошибка при входе:', error);
    throw error;
  }
}