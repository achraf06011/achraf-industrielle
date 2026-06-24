# Admin Panel Setup

## 1. Create Supabase project (FREE)

1. Go to https://supabase.com → New project
2. Name: `achraf-industrielle` — choose region closest to Morocco (EU West)
3. Set a database password (save it)

## 2. Run the SQL schema

In Supabase Dashboard → SQL Editor → paste contents of `supabase/schema.sql` → Run

## 3. Create admin user

In Supabase Dashboard → Authentication → Users → "Add user"
- Email: aaachchak@gmail.com (or any email you prefer)
- Password: choose a strong password
- Click "Create user"

## 4. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  (Settings → API → anon public)
SUPABASE_SERVICE_ROLE_KEY=eyJ...       (Settings → API → service_role secret)
```

## 5. Admin Panel URLs

- Login:     /admin
- Dashboard: /admin/dashboard
- Projects:  /admin/projects
- New:       /admin/projects/new

## Image options in the form

| Mode | When to use |
|------|-------------|
| **URL directe** | Any public image URL (hosted anywhere) |
| **Upload fichier** | Upload directly to Supabase Storage (1 GB free) |
| **Google Drive** | Paste the share link → auto-converted to direct URL |

### Google Drive tip
Share the file: right-click → Share → "Anyone with the link" → Copy link
Then paste in the form — the system converts it automatically.
