import { recommend } from './color-advice.mjs';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';

const app = express();
const root = process.cwd();
const dataDir = path.join(root, '.local-content');
const contentFile = path.join(dataDir, 'site-content.json');
const authFile = path.join(dataDir, 'admin-auth.json');
const port = Number(process.env.PORT || 3021);
const furnitureOnRoot = process.env.BIN_FURNITURE_ROOT === '1';
const sessions = new Map();
const secret = crypto.randomBytes(32);
const tokenDigest = token => crypto.createHmac('sha256', secret).update(token).digest('hex');
const cookieName = 'bin_admin';
app.use((req, res, next) => { if (req.method !== 'GET' && req.method !== 'HEAD' && req.path.startsWith('/api/')) { const origin = req.headers.origin; if (origin && origin !== `${req.protocol}://${req.headers.host}`) return res.status(403).json({ error: 'Forbidden origin' }); } next(); });
const readCookie = req => (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
const authenticated = req => { const token = readCookie(req); if (!token) return false; const digest = tokenDigest(token); const issued = sessions.get(digest); if (!issued || Date.now() - issued > 43200000) { sessions.delete(digest); return false; } return true; };
const mustBeAdmin = (req, res, next) => authenticated(req) ? next() : res.status(401).json({ error: 'Admin login required' });
const store = async (file, value) => { await fs.mkdir(dataDir, { recursive: true }); const temp = file + '.tmp'; await fs.writeFile(temp, JSON.stringify(value, null, 2)); await fs.rename(temp, file); };
let account;
try { account = JSON.parse(await fs.readFile(authFile, 'utf8')); } catch {}
if (!account) {
  const password = process.env.BIN_ADMIN_PASSWORD || crypto.randomBytes(18).toString('base64url');
  const salt = crypto.randomBytes(16).toString('hex');
  account = { username: process.env.BIN_ADMIN_USER || 'binadmin', salt, hash: crypto.scryptSync(password, salt, 64).toString('hex') };
  await store(authFile, account);
  await fs.chmod(authFile, 0o600).catch(() => {});
  if (!process.env.BIN_ADMIN_PASSWORD) {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'first-login.txt'), `B+IN local admin\nUsername: ${account.username}\nPassword: ${password}\nOpen: http://localhost:${port}/#/admin\n`);
    await fs.chmod(path.join(dataDir, 'first-login.txt'), 0o600).catch(() => {});
  }
}
app.disable('x-powered-by');
app.use(express.json({ limit: '3mb' }));
app.get('/api/admin/me', (req, res) => res.json({ authenticated: Boolean(authenticated(req)), isAdmin: Boolean(authenticated(req)), email: authenticated(req) ? account.username : null }));
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  const hash = crypto.scryptSync(String(password || ''), account.salt, 64);
  const expected = Buffer.from(account.hash, 'hex');
  if (String(username || '').toLowerCase() !== account.username.toLowerCase() || !crypto.timingSafeEqual(hash, expected)) return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu.' });
  const token = crypto.randomBytes(32).toString('base64url');
  sessions.set(tokenDigest(token), Date.now());
  res.setHeader('Set-Cookie', `${cookieName}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200`);
  res.json({ isAdmin: true, email: account.username });
});
app.post('/api/admin/logout', (req, res) => { const token = readCookie(req); if (token) sessions.delete(tokenDigest(token)); res.setHeader('Set-Cookie', `${cookieName}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`); res.json({ ok: true }); });
app.post('/api/color-advice', async (req, res) => {
  const body = req.body || {};
  if (typeof body.likes !== 'string' || body.likes.trim().length < 3 || body.likes.length > 500 || typeof body.avoid !== 'string' || body.avoid.length > 200 || !['living','bedroom','dining','study'].includes(body.room) || !['unknown','kim','moc','thuy','hoa','tho'].includes(body.element) || !['balanced','bright','dark'].includes(body.light) || !['VI','EN'].includes(body.language)) return res.status(400).json({ error:'Vui lòng điền thông tin hợp lệ.' });
  const age = body.age ? Number(body.age) : undefined, birthYear = body.birthYear ? Number(body.birthYear) : undefined;
  if (age && (!Number.isInteger(age) || age < 16 || age > 110) || birthYear && (!Number.isInteger(birthYear) || birthYear < 1900 || birthYear > 2100)) return res.status(400).json({ error:'Độ tuổi hoặc năm sinh không hợp lệ.' });
  res.json(await recommend({ age, birthYear, element:body.element, room:body.room, light:body.light, likes:body.likes.trim(), avoid:body.avoid.trim(), language:body.language }));
});
app.get('/api/content/site', async (_req, res) => { try { res.json(JSON.parse(await fs.readFile(contentFile, 'utf8'))); } catch { res.json({ text: {}, images: {}, hidden: [] }); } });
app.put('/api/admin/content/site', mustBeAdmin, async (req, res) => { const { text, images, hidden } = req.body || {}; if (!text || !images || !Array.isArray(hidden) || Object.keys(text).length > 2000 || Object.keys(images).length > 500 || hidden.length > 500) return res.status(400).json({ error: 'Invalid content' }); const content = { text, images, hidden }; await store(contentFile, content); res.json(content); });
if (furnitureOnRoot) app.get('/', (_req, res) => res.sendFile(path.join(root, 'dist', 'legacy-furniture/index.html')));
app.use(express.static(path.join(root, 'dist')));
app.use((_req, res) => res.sendFile(path.join(root, 'dist', furnitureOnRoot ? 'legacy-furniture/index.html' : 'index.html')));
app.listen(port, '0.0.0.0');
