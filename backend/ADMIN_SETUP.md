# Admin Authentication Setup - Simplified!

## Quick Start

Your admin authentication is now **much simpler**! No more complex salt/hash calculations.

### Current Setup (.env file)

```bash
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_SESSION_SECRET=c3f0983d14b77ad28f907fccc2382545a55c033b27e4ff5f43d730839711bb66
ADMIN_PASSWORD_HASH=$2b$10$8Po7lIlCtk4Jc.mQvycvZexqg.Porealg0y61TPZuGQyD6zrtRW.W
```

**Current Password:** `Admin12345`

## How to Change the Admin Password

### Option 1: Use the Generator Script (Recommended)

```bash
cd backend
npm run generate-password
```

Then copy the output to your `.env` file.

### Option 2: Generate Manually with Node

```bash
cd backend
node -e "const bcrypt = require('bcryptjs'); (async () => { const hash = await bcrypt.hash('YourNewPassword', 10); console.log(hash); })()"
```

Copy the output as `ADMIN_PASSWORD_HASH` in your `.env` file.

## What Changed?

### Before (Complex) ❌

- ADMIN_PASSWORD (dev only)
- ADMIN_PASSWORD_SALT (required)
- ADMIN_PASSWORD_HASH (required)
- PBKDF2 with 120,000 iterations
- Custom timing-safe comparison
- Separate dev/production modes

### After (Simple) ✅

- ADMIN_PASSWORD_HASH (bcrypt - industry standard)
- Works in all environments
- Auto-salting (salt is in the hash)
- Simpler, more secure

## Environment Variables

| Variable               | Description               | Example                 |
| ---------------------- | ------------------------- | ----------------------- |
| `ADMIN_EMAIL`          | Admin login email         | `admin@yourcompany.com` |
| `ADMIN_SESSION_SECRET` | Secret for session tokens | (64-char hex string)    |
| `ADMIN_PASSWORD_HASH`  | Bcrypt hash of password   | `$2b$10$...`            |

## Security Notes

- Bcrypt is **industry standard** for password hashing
- Auto-salting (salt is embedded in the hash)
- Protection against timing attacks (built-in)
- Much cleaner and more maintainable
- Session cookies are HTTP-only and secure in production

## Admin Login

- **URL:** `http://localhost:5173/admin/login` (dev)
- **Email:** As configured in `ADMIN_EMAIL`
- **Password:** Whatever password was used to generate `ADMIN_PASSWORD_HASH`

## Production Deployment

1. Generate a new strong password using the script
2. Generate a new session secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. Update your `.env` file
4. **Never commit `.env` to git!**
