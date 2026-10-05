# NOVA TECH API

Premium React.js API dashboard for testing, monitoring, and documenting public APIs.

## Features

✅ **20 Public API Modules** - Real-time health checks and endpoint testing  
✅ **Professional Dashboard** - Premium dark theme with neon accents  
✅ **Real API Testing** - Actual HTTP requests, not fabricated data  
✅ **REST Code Generator** - Auto-generate cURL, Fetch, Python examples  
✅ **Session Statistics** - Local browser-based request tracking  
✅ **Responsive Design** - Mobile, tablet, desktop optimized  
✅ **CORS Aware** - Accurate error handling and visibility  
✅ **No Database** - Pure frontend application  
✅ **No Login/Auth** - Public developer tool  
✅ **Production Ready** - Clean modular architecture, tested, documented  

## API Modules

1. Temp Email API
2. Weather API
3. Country Information API
4. Currency Exchange API
5. Time Zone API
6. IP Information API
7. Public Holidays API
8. GitHub Public API
9. JSON Placeholder API
10. Random User API
11. Cat Facts API
12. Dog Images API
13. Joke API
14. Quotes API
15. Dictionary API
16. REST Countries API
17. Spaceflight News API
18. Open Library API
19. QR Code API
20. URL Metadata API

## Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Vitest** - Testing framework
- **Vanilla CSS** - Styling (no dependencies)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173

## Production Build

```bash
npm run build
```

Creates optimized `dist/` folder.

```bash
npm run preview
```

Preview production build locally.

## Testing

```bash
npm test
```

Run Vitest unit tests.

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

Vercel will auto-detect Vite configuration.

**Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Other Static Hosts (Netlify, GitHub Pages, etc.)

Deploy the `dist/` folder.

For SPA routing, ensure your host rewrites all routes to `index.html`.

## Architecture

```
src/
  app/
    App.jsx          # Root component
    router.jsx       # React Router setup
  components/        # Reusable UI components
  pages/             # Page components
  services/          # Business logic
  hooks/             # Custom React hooks
  data/              # API library config
  styles/            # Global CSS
  main.jsx           # Entry point
public/
  favicon.svg
```

## Services

### apiClient.js

Core HTTP client with:
- Fetch API wrapper
- URL validation (HTTP/HTTPS only)
- AbortController timeout support
- Safe JSON parsing
- Header normalization
- Comprehensive error handling

### statistics.js

Session-based stats (localStorage):
- Total requests per API
- Success/failure counts
- Network error tracking
- Average response time
- Reset functionality

### restCodeGenerator.js

Dynamic code example generation:
- cURL commands
- JavaScript Fetch snippets
- Python Requests examples
- Safe URL/parameter quoting

### healthCheck.js

Status determination logic:
- HTTP 2xx = Online (green)
- CORS blocked = Blocked (amber)
- HTTP 4xx+ = Error (red)
- Unconfirmed = Unknown (gray)

## Important Notes

### Statistics

All metrics are **local to the browser session**.

They are NOT:
- Sent to servers
- Global statistics
- Representing other users' traffic
- Persisted across sessions (unless manually saved)

### API Keys

This dashboard does NOT:
- Store API keys
- Accept secret credentials in frontend
- Expose private authentication

For APIs requiring keys, use backend proxies or provide configuration documentation.

### CORS

When a browser cannot access an API due to CORS:

The UI will show: "Browser access blocked by CORS; server availability not confirmed"

Not: "API Offline"

This is accurate and transparent.

### Real Data Only

This project:
- Makes real HTTP requests
- Shows actual API responses
- Never fabricates successful responses
- Never marks APIs online without confirmation
- Handles errors honestly

## Adding a New API Module

1. Add entry to `src/data/apiLibrary.js`
2. Create page in `src/pages/apis/YourApiPage.jsx`
3. Add route in `src/app/router.jsx`
4. Run tests to verify
5. Push to GitHub

## Testing

Vitest tests cover:
- API client (requests, errors, timeouts)
- URL validation
- Statistics tracking
- REST code generation
- Component rendering

## Support

For issues or questions:
1. Check GitHub issues
2. Review API documentation
3. Check CORS browser console
4. Verify endpoint URLs

## License

MIT

## Author

NOVA TECH
