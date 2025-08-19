import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function getLastCommitInfo(locale: string): Promise<{
  dateIso: string;
  dateFormatted: string;
  shortHash: string;
  longHash: string;
}> {
  const result = await execAsync("git log -1 --format=%cI%n%h%n%H");
  const [dateIso, shortHash, longHash] = result.stdout.trim().split("\n");

  const dateFormatted = new Date(dateIso).toLocaleDateString(locale, {
    dateStyle: "medium",
    timeZone: "Europe/Helsinki",
  });

  return {
    dateIso,
    dateFormatted,
    shortHash,
    longHash,
  };
}
