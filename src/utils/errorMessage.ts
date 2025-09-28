export const ERROR_MESSAGES = {
  USER_NOT_FOUND: "El usuario no existe. Verifica tu correo electrónico.",
  EMAIL_AND_PASSWORD_REQUIRED: "El correo y la contraseña son obligatorios.",
  CredentialsSignin: "Credenciales inválidas. Verifica tus datos.",

  EMAIL_ALREADY_EXISTS:
    "Ya existe una cuenta con este correo. Intenta iniciar sesión.",
  VALIDATION_ERROR: "Por favor, revisa que todos los campos estén correctos.",
  SERVER_ERROR: "Error del servidor. Inténtalo más tarde.",

  CONNECTION_ERROR:
    "Error de conexión. Verifica tu internet e inténtalo de nuevo.",
  UNKNOWN_ERROR: "Error al iniciar sesión. Inténtalo más tarde.",
} as const;

export const getErrorMessage = (error: string) =>
  ERROR_MESSAGES[error as keyof typeof ERROR_MESSAGES] ||
  ERROR_MESSAGES.UNKNOWN_ERROR;
