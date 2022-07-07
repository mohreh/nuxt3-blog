interface RegisterData {
  username: string;
  password: string;
}

interface ResponseData<T> {
  ok: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface UserInterface {
  username: string;
  role: Role;
}

enum Role {
  User = 'User',
  Admin = 'Admin',
}
