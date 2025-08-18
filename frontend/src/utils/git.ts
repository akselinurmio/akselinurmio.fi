import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function getLastCommitInfo(locale: string): Promise<{
  dateIso: string;
  dateFormatted: string;
  shortHash: string;
  longHash: string;
}> {
  const [timestampResult, shortHashResult, longHashResult] = await Promise.all([
    execAsync("git log -1 --format=%cI"),
    execAsync("git log -1 --format=%h"),
    execAsync("git log -1 --format=%H"),
  ]);

  const dateIso = timestampResult.stdout.trim();
  const shortHash = shortHashResult.stdout.trim();
  const longHash = longHashResult.stdout.trim();

  const dateFormatted = new Date(dateIso).toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "shortOffset",
    timeZone: "Europe/Helsinki",
  });

  return {
    dateIso,
    dateFormatted,
    shortHash,
    longHash,
  };
}
