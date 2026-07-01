# Jaime Burgos Portfolio

Minimal Angular portfolio for `skyzerozx.com`.

## Stack

- Angular 22
- Angular SSR / prerender
- PWA support
- ngx-translate
- Font Awesome icons
- Cloudflare Workers Static Assets
- Wrangler

## Development

```bash
npm install
npm start
```

Local URL:

```text
http://localhost:4200
```

## Scripts

```bash
npm run build
npm run lint
npm run deploy:cloudflare:dry-run
npm run deploy:cloudflare
```

## Deployment

Production deploy uses Wrangler and Cloudflare Workers.

```bash
npm run deploy:cloudflare
```

Configured domain:

```text
https://skyzerozx.com
```

Worker route:

```text
skyzerozx.com/*
```

## Author

Jaime Burgos Tejada

- GitHub: https://github.com/SkyZeroZx
- LinkedIn: https://www.linkedin.com/in/jaime-burgos-tejada/
