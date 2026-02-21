#!/usr/bin/env node
/**
 * Sync certifications from a LinkedIn data export into public/data/certifications.json.
 *
 * LinkedIn does not offer a live API for personal profile data. This script uses
 * the "Download your data" export so your site can be updated when you update LinkedIn.
 *
 * How to get your LinkedIn certifications export:
 * 1. LinkedIn → Me → Settings & Privacy → Data Privacy
 * 2. Under "How LinkedIn uses your data" → Get a copy of your data
 * 3. Select "Certifications" (or full archive), request archive
 * 4. Download the ZIP when ready (often within minutes)
 * 5. Unzip and run this script pointing at the export folder or the Certifications CSV
 *
 * Usage:
 *   node scripts/sync-linkedin-certs.js <path-to-export>
 *
 * Examples:
 *   node scripts/sync-linkedin-certs.js ./LinkedIn_Data_Export_01-01-2025
 *   node scripts/sync-linkedin-certs.js "./LinkedIn_Data_Export_01-01-2025/Certifications.csv"
 *
 * The script merges with existing public/data/certifications.json: it keeps your
 * custom skills, category, and credentialUrl for matching certs, and adds new
 * ones from LinkedIn with default category "professional" and empty skills
 * (you can edit the JSON afterward to add skills/categories).
 */

const fs = require('fs');
const path = require('path');

const CERT_JSON_PATH = path.join(__dirname, '..', 'public', 'data', 'certifications.json');
const OUT_PATH = CERT_JSON_PATH;

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeId(name, issuer) {
  return `${slugify(issuer)}-${slugify(name)}`.slice(0, 80);
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? '';
    });
    return row;
  });
  return { headers, rows };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if ((c === ',' && !inQuotes) || (c === '\n' && !inQuotes)) {
      result.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

function normalizeDate(val) {
  if (!val) return '';
  // LinkedIn may send "January 2025" or "2025-01" or "1/2025"
  const s = String(val).trim();
  const monthNames = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
  const match = s.match(/(\d{4})-(\d{1,2})/);
  if (match) {
    const month = monthNames[parseInt(match[2], 10) - 1];
    return `${month} ${match[1]}`;
  }
  const match2 = s.match(/(\d{1,2})\/(\d{4})/);
  if (match2) {
    const month = monthNames[parseInt(match2[1], 10) - 1];
    return `${month} ${match2[2]}`;
  }
  return s;
}

function findLinkedInCertFile(dir) {
  const names = fs.readdirSync(dir);
  const lower = names.map((n) => n.toLowerCase());
  const idx = lower.findIndex((n) => n.includes('certification'));
  if (idx >= 0) return path.join(dir, names[idx]);
  return null;
}

function loadLinkedInCerts(inputPath) {
  const stat = fs.statSync(inputPath);
  let csvPath = null;
  if (stat.isDirectory()) {
    csvPath = findLinkedInCertFile(inputPath);
    if (!csvPath) {
      console.error('No Certifications file found in directory. Look for a file whose name contains "Certification".');
      process.exit(1);
    }
  } else if (stat.isFile()) {
    csvPath = inputPath;
  } else {
    console.error('Path is not a file or directory:', inputPath);
    process.exit(1);
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const { headers, rows } = parseCSV(content);
  const col = (name) => headers.find((h) => h.toLowerCase().includes(name.toLowerCase()));
  const nameCol = col('name') || col('certification') || headers[0];
  const authorityCol = col('authority') || col('issuer') || col('organization') || headers[1];
  const numberCol = col('number') || col('license') || col('credential');
  const startCol = col('start') || col('date');
  const endCol = col('end') || col('finish');
  const urlCol = col('url');

  return rows.map((row) => {
    const name = (row[nameCol] || '').trim();
    const issuer = (row[authorityCol] || '').trim();
    const issuedDate = normalizeDate(row[endCol] || row[startCol] || '');
    const credentialId = (row[numberCol] || '').trim() || undefined;
    const credentialUrl = (row[urlCol] || '').trim() || undefined;
    return {
      name,
      issuer,
      issuedDate,
      credentialId,
      credentialUrl,
    };
  }).filter((c) => c.name || c.issuer);
}

function loadExistingCerts() {
  try {
    const raw = fs.readFileSync(CERT_JSON_PATH, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function mergeCerts(linkedIn, existing) {
  const byKey = new Map();
  existing.forEach((c) => byKey.set(`${(c.name || '').toLowerCase()}|${(c.issuer || '').toLowerCase()}`, { ...c }));

  linkedIn.forEach((c) => {
    const key = `${(c.name || '').toLowerCase()}|${(c.issuer || '').toLowerCase()}`;
    const existingCert = byKey.get(key);
    if (existingCert) {
      existingCert.issuedDate = c.issuedDate || existingCert.issuedDate;
      if (c.credentialId) existingCert.credentialId = c.credentialId;
      if (c.credentialUrl) existingCert.credentialUrl = c.credentialUrl;
    } else {
      byKey.set(key, {
        id: makeId(c.name, c.issuer),
        name: c.name,
        issuer: c.issuer,
        issuedDate: c.issuedDate,
        credentialId: c.credentialId,
        credentialUrl: c.credentialUrl,
        skills: [],
        category: 'professional',
      });
    }
  });

  return Array.from(byKey.values()).sort((a, b) => {
    const dA = a.issuedDate || '';
    const dB = b.issuedDate || '';
    return dB.localeCompare(dA);
  });
}

function main() {
  const input = process.argv[2];
  if (!input) {
    console.log('Usage: node scripts/sync-linkedin-certs.js <path-to-linkedin-export-folder-or-certifications-csv>');
    process.exit(1);
  }

  const linkedIn = loadLinkedInCerts(path.resolve(input));
  console.log('LinkedIn certifications found:', linkedIn.length);

  const existing = loadExistingCerts();
  const merged = mergeCerts(linkedIn, existing);
  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2), 'utf8');
  console.log('Wrote', merged.length, 'certifications to', OUT_PATH);
}

main();
