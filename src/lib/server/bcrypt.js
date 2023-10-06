import { hashSync } from "bcrypt";

export async function hash(text) {
  return hashSync(text);
}
