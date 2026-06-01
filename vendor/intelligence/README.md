# VANTAGE Vendor Intelligence Tools

Vendored open-source tools used by the Factory Contact Intelligence module.
All tools are shallow-cloned (`--depth=1`) from their upstream repos.

| Folder | Repo | License | Purpose |
|---|---|---|---|
| `crawlee/` | github.com/apify/crawlee | Apache-2.0 | TypeScript web scraper — primary crawl engine |
| `scrapy/` | github.com/scrapy/scrapy | BSD | Python crawler for bulk directory scraping |
| `searxng/` | github.com/searxng/searxng | AGPL-3.0 | Self-hosted metasearch for contact cross-checking |
| `theHarvester/` | github.com/laramies/theHarvester | GPL-2.0 | Public OSINT email/domain discovery |
| `spiderfoot/` | github.com/smicallef/spiderfoot | MIT | Public OSINT enrichment |
| `check-if-email-exists/` | github.com/reacherhq/check-if-email-exists | AGPL-3.0 | Email syntax/MX/deliverability checks |
| `openrefine/` | github.com/OpenRefine/OpenRefine | BSD | Manual data cleaning and deduplication |

## License Caution: AGPL Tools

**SearXNG** and **check-if-email-exists** are AGPL-3.0 licensed.
- Internal use within VANTAGE: acceptable under AGPL.
- If you ever expose these tools as a service to external users: seek legal advice or obtain a commercial license.
- See `vantage/intelligence/factory-contact-intelligence/LEGAL_AND_PLATFORM_RULES.md` for full details.

## Setup

Each tool has its own setup requirements. See the individual `README.md` inside each subfolder.

General pattern:
- **Crawlee** — used as an npm package (not run directly from vendor folder)
- **Scrapy** — `pip install scrapy` or use `vendor/intelligence/scrapy` virtualenv
- **SearXNG** — run via Docker (see `docker/docker-compose.intelligence.yml`)
- **theHarvester** — `cd theHarvester && pip install -r requirements/base.txt`
- **SpiderFoot** — run via Docker (see `docker/docker-compose.intelligence.yml`)
- **check-if-email-exists** — run via Docker (see docker compose)
- **OpenRefine** — download release JAR and run: `java -jar openrefine.jar`

## Updating

To update a vendor tool to latest:
```bash
cd vendor/intelligence/<tool>
git fetch origin
git reset --hard origin/main   # or origin/master
```
