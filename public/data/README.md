# Certifications data

The **Certifications** section loads from `certifications.json` at runtime. You can edit this file by hand or regenerate it from a LinkedIn data export.

## Updating from LinkedIn

LinkedIn doesn’t provide a live API for your profile. To keep this page in sync when you add or change certifications on LinkedIn:

1. **Request a data export**  
   LinkedIn → **Me** → **Settings & Privacy** → **Data Privacy** → **Get a copy of your data** → select **Certifications** (or full archive) → **Request archive**.

2. **Download and unzip** the archive when it’s ready (often within minutes).

3. **Run the sync script** from the project root:
   ```bash
   node scripts/sync-linkedin-certs.js "path/to/LinkedIn_Data_Export_..."
   ```
   You can pass either the export folder or the path to the Certifications CSV inside it.

4. The script **merges** with existing `certifications.json`: it keeps your custom **skills**, **category**, and **credentialUrl** for matching entries and updates dates/IDs from LinkedIn. New certifications from LinkedIn are added with default category and empty skills; you can edit the JSON to add skills or set `issuerLogoUrl` for logos.

After updating `certifications.json`, rebuild or refresh the site so the Certifications section shows the new data.
