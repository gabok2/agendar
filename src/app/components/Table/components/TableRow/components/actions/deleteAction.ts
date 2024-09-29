"use server";

import { revalidatePath } from "next/cache";
import { deleteTableRow } from "../endpoint";

const filterPath = (pathName: string, type: string): string => {
  if (pathName === "classes") {
    return "class";
  }
  if (pathName === "home") {
    return type;
  }
  return pathName;
};

export async function deleteAction(id: string, pathName: string, type: string) {
  const filteredPath = filterPath(pathName, type);
  await deleteTableRow(id, filteredPath);
  revalidatePath(`/${filteredPath}`);
}
