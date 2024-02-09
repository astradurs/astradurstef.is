// This example uses Next.js with React Server Components.
import { WorkOS, type User, type Profile } from "@workos-inc/node"
import { cookies } from "next/headers"

// Javascript Object Signing and Encryption (JOSE)
// https://www.npmjs.com/package/jose
import { jwtVerify } from "jose"

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientId = process.env.WORKOS_CLIENT_ID || ""
const redirectUri = process.env.WORKOS_REDIRECT_URI || ""
export function getAuthorizationUrl(pathname?: string) {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    // Specify that we'd like AuthKit to handle the authentication flow
    provider: "authkit",
    state: `pathname=${pathname}`,
    // The callback endpoint that WorkOS will redirect to after a user authenticates
    redirectUri: redirectUri,
    clientId,
  })

  return authorizationUrl
}

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not set")
  }

  return new Uint8Array(Buffer.from(secret, "base64"))
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey())
    return payload
  } catch (error) {
    return null
  }
}

// Verify the JWT and return the user
export async function getUser(): Promise<{
  isAuthenticated: boolean
  user?: User | null
}> {
  const token = cookies().get("token")?.value

  if (token) {
    const verifiedToken = await verifyJwtToken(token)
    if (verifiedToken) {
      return {
        isAuthenticated: true,
        user: verifiedToken.user as User | null,
      }
    }
  }

  return { isAuthenticated: false }
}

/* 
  Because RSC allows running code on the server, you can
  call `getUser()` directly within a server component:

  function SignInButton() {
    const { isAuthenticated } = getUser();
    return <button>{isAuthenticated ? "Sign Out" : "Sign In"}</button>;
  }
*/
