import changelogData from "../data/changelog.json";
import type { ChangelogData } from "../types/changelog";

const changelog: ChangelogData = changelogData;
const entries = [...changelog.entries].sort((a, b) => b.date.localeCompare(a.date));
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function Changelog() {
  return (
    <section className="changelog" aria-label="Reference data updates">
      <p className="changelog__label">CURRENT DATA</p>
      <p className="changelog__patch">Patch {changelog.currentPatch}</p>
      <p className="changelog__meta">
        Updated <time dateTime={changelog.lastUpdated}>{formatDate(changelog.lastUpdated)}</time>
      </p>

      <details className="changelog__details">
        <summary>View changelog</summary>
        {entries.map((entry, index) => (
          <article className="changelog__entry" key={`${entry.date}-${entry.title}-${index}`}>
            <p className="changelog__meta">
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              {entry.patch && <span> · Patch {entry.patch}</span>}
            </p>
            <h2>{entry.title}</h2>
            <ul>
              {entry.changes.map((change, changeIndex) => (
                <li key={changeIndex}>{change}</li>
              ))}
            </ul>
          </article>
        ))}
      </details>
    </section>
  );
}
