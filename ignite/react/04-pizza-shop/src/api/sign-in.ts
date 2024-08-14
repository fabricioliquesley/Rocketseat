import { api } from "@/lib/axios";

export interface SignInRequestBody {
  email: string;
}

export async function signIn({ email }: SignInRequestBody) {
  await api.post("/authenticate", { email });
}
