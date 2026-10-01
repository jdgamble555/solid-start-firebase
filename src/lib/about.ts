import { doc, getDoc } from "firebase/firestore/lite";
import * as v from "valibot";
import { serverDB } from "./firebase-lite";

const AboutDocSchema = v.object({
  name: v.string(),
  description: v.string(),
});

export async function getAbout() {
  const snapshot = await getDoc(doc(serverDB, "about/ZlNJrKd6LcATycPRmBPA"));

  if (!snapshot.exists()) {
    throw new Error("About document does not exist.");
  }

  const result = v.safeParse(AboutDocSchema, snapshot.data());

  if (!result.success) {
    throw new Error("Malformed About document.");
  }

  return result.output;
}
