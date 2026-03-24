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
  const [dateTimeIso, shortHash, longHash] = result.stdout
    .trim()
    .split("\n") as [string, string, string];

  const dateIso = dateTimeIso.substring(0, 10);
  const dateFormatted = new Date(dateIso)
    .toLocaleDateString(locale, {
      dateStyle: "long",
      timeZone: "UTC",
    })
    .replace(" ", "\u00A0");

  return {
    dateIso: dateTimeIso,
    dateFormatted,
    shortHash,
    longHash,
  };
}
