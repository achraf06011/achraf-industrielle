# ACHRAF INDUSTRIELLE - Guide d'installation et de déploiement

## Prérequis

- Node.js 18.17+ (recommandé: Node.js 20+)
- npm ou yarn

---

## Installation locale

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Copier le fichier `.env.local.example` en `.env.local` :

```bash
cp .env.local.example .env.local
```

Puis modifier `.env.local` avec vos clés EmailJS (voir section EmailJS ci-dessous).

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Configuration EmailJS (formulaire de devis)

1. Créer un compte gratuit sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créer un **Service Email** (Gmail recommandé)
3. Créer un **Template Email** avec les variables suivantes :
   - `{{from_name}}` - Nom du demandeur
   - `{{from_email}}` - Email du demandeur
   - `{{company}}` - Société
   - `{{phone}}` - Téléphone
   - `{{sector}}` - Secteur d'activité
   - `{{service}}` - Service demandé
   - `{{message}}` - Description du projet
4. Récupérer votre **Service ID**, **Template ID** et **Public Key**
5. Les ajouter dans `.env.local` :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

**Note :** Sans EmailJS configuré, le formulaire simule un succès (mode démonstration).

---

## Déploiement sur Vercel (gratuit)

### Option 1 : Via GitHub (recommandé)

1. Créer un repository GitHub et pousser le code :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/achraf-industrielle.git
   git push -u origin main
   ```

2. Aller sur [https://vercel.com](https://vercel.com) et créer un compte gratuit
3. Cliquer **"New Project"** → Importer votre repository GitHub
4. Ajouter les variables d'environnement dans les paramètres Vercel :
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_SITE_URL` = votre domaine Vercel
5. Cliquer **Deploy** → Le site sera en ligne en 2 minutes !

### Option 2 : Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Personnalisation

### Ajouter votre domaine personnalisé
Dans Vercel → Settings → Domains → ajouter votre domaine (ex: `achraf-industrielle.ma`)

### Modifier le contenu
Tous les textes sont dans les fichiers de traduction :
- `messages/fr.json` - Français
- `messages/en.json` - Anglais  
- `messages/ar.json` - Arabe

### Modifier les couleurs
Dans `tailwind.config.ts`, section `colors.brand` :
- `blue: '#0F4C81'` - Bleu principal
- `blue-bright: '#00A8E8'` - Bleu accent

### Ajouter de vraies photos de projets
Remplacer les icônes de portfolio dans `Portfolio.tsx` par des `<Image>` Next.js pointant vers vos photos.

---

## Structure du projet

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── [locale]/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Portfolio.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── QuoteForm.tsx
│   │   ├── FAQ.tsx
│   │   └── Contact.tsx
│   └── ui/ (composants shadcn/ui)
├── i18n/
│   ├── routing.ts
│   ├── request.ts
│   └── navigation.ts
└── lib/
    ├── utils.ts
    └── animations.ts
messages/
├── fr.json
├── en.json
└── ar.json
```

---

## Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| Next.js 15 | Framework React |
| React 19 | UI Library |
| TypeScript | Typage statique |
| Tailwind CSS | Styles |
| Framer Motion | Animations |
| next-intl | Internationalisation (FR/EN/AR) |
| shadcn/ui + Radix UI | Composants UI |
| React Hook Form + Zod | Formulaires & validation |
| EmailJS | Envoi d'emails |
| Embla Carousel | Carousel témoignages |
| Sonner | Notifications toast |

---

## Support

Contact : aaachchak@gmail.com | +212 697601775
