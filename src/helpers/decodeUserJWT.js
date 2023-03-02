import * as jose from 'jose';

export default async function decodeUserJWT(userToken) {
  const secret = new TextEncoder().encode(import.meta.env.VITE_SECRET_KEY);
  const jwt = userToken;

  const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);

  const user = {
    id: payload.id,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    role: payload.role,
  }

  return user;
}