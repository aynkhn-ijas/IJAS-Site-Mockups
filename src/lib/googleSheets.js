const DEFAULT_SPREADSHEET_ID = "1_Rnd4z6QSpr4iiONl-s0H5XSHkDV4VjBHhtA6RLYhDA";
const TABS = ["Awards 2026", "Projects Database"];

export class GoogleSheetsError extends Error {
  constructor(message) {
    super(message);
    this.name = "GoogleSheetsError";
  }
}

function spreadsheetId() {
  return (process.env.GOOGLE_SHEETS_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID).trim();
}

export function parseCsv(text) {
  const source = String(text || "").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"') {
        if (source[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else quoted = false;
      } else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

async function fetchTab(id, tab) {
  const url = new URL(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq`);
  url.searchParams.set("tqx", "out:csv");
  url.searchParams.set("sheet", tab);
  let response;
  try {
    response = await fetch(url, {
      cache: "no-store",
      redirect: "follow",
      headers: { Accept: "text/csv", "User-Agent": "IJAS-Awards-Update" },
      signal: AbortSignal.timeout(25000),
    });
  } catch {
    throw new GoogleSheetsError(`The request to read “${tab}” did not finish.`);
  }
  const body = await response.text();
  const type = response.headers.get("content-type") || "";
  if (!response.ok || /text\/html|application\/json/i.test(type) || /^\s*</.test(body)) {
    throw new GoogleSheetsError(
      `Could not read the public “${tab}” tab. Confirm the sheet is shared so anyone with the link can view it.`,
    );
  }
  const rows = parseCsv(body);
  if (!rows.length) throw new GoogleSheetsError(`The “${tab}” tab was empty.`);
  return rows;
}

export async function fetchAwardSheets() {
  const id = spreadsheetId();
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new GoogleSheetsError("GOOGLE_SHEETS_SPREADSHEET_ID is not a spreadsheet id.");
  }
  const [awardsValues, projectsValues] = await Promise.all(TABS.map((tab) => fetchTab(id, tab)));
  return { awardsValues, projectsValues };
}
