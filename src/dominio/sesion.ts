

interface PayloadJwt {
  sub?: string;
  exp?: number; // segundos Unix
  iat?: number;
}

function decodificarPayload(token: string): PayloadJwt | null {
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;
    // atob decodifica base64url -> hay que normalizar '-'/'_' a '+'/'/'
    const normalizado = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(normalizado);
    return JSON.parse(json) as PayloadJwt;
  } catch {
    return null;
  }
}

export function tokenExpirado(token: string | null): boolean {
  if (!token) return true;
  const payload = decodificarPayload(token);
  if (!payload?.exp) return true;
  const ahoraEnSegundos = Date.now() / 1000;
  return payload.exp < ahoraEnSegundos;
}

export function fechaExpiracion(token: string | null): Date | null {
  if (!token) return null;
  const payload = decodificarPayload(token);
  if (!payload?.exp) return null;
  return new Date(payload.exp * 1000);
}
