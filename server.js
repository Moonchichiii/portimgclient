import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', createProxyMiddleware({
  target: process.env.VITE_API_BASE_URL, 
  changeOrigin: true,
  onProxyRes: (proxyRes) => {
    const cookies = proxyRes.headers['set-cookie'];
    if (cookies) {
      const secureCookies = cookies.map(cookie =>
        cookie.replace(/;(\s*SameSite=[^;]*)?/i, '; SameSite=None; Secure')
      );
      proxyRes.headers['set-cookie'] = secureCookies;
    }
  },
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
