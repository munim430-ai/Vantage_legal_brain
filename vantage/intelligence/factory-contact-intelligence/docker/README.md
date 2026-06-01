# VANTAGE Intelligence — Docker Services

## Quick Start

```bash
# From the factory-contact-intelligence directory:
docker compose -f docker/docker-compose.intelligence.yml up -d

# Check services are running:
docker compose -f docker/docker-compose.intelligence.yml ps
```

## Services

| Service | Port | Purpose |
|---|---|---|
| SearXNG | 8080 | Private metasearch for cross-checking factory contacts |
| SpiderFoot | 5001 | OSINT enrichment — access UI at http://localhost:5001 |
| Reacher | 8084 | Email deliverability check API |

## Environment Variables

Update `.env` after starting services:

```
SEARXNG_BASE_URL=http://localhost:8080
SPIDERFOOT_URL=http://localhost:5001
REACHER_BASE_URL=http://localhost:8084
```

## Tools NOT in Docker (run manually)

- **theHarvester** — run via Python venv: `vendor/intelligence/theHarvester`
- **OpenRefine** — run via Java: `vendor/intelligence/openrefine`
- **Scrapy** — run via Python venv: `vendor/intelligence/scrapy`

## Stopping

```bash
docker compose -f docker/docker-compose.intelligence.yml down
```
