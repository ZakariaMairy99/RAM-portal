# RAM × Escale CMN — Module de Bidding Hôtelier (POC)

Portail React pour le **POC1** : permettre aux hôtels partenaires de Royal Air Maroc de soumettre leurs tarifs en temps réel et de visualiser leur classement.

> 🎯 **Statut actuel** : Mode démo avec données mockées. Prêt à brancher sur Salesforce dès que la Connected App sera prête.

---

## 🛠 Stack technique

- **Vite** — bundler ultra-rapide
- **React 18** — UI
- **React Router** — navigation
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Chart.js** — graphiques
- **Axios** — appels API Salesforce
- **Lucide React** — icônes

---

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en mode dev
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

L'app démarre sur `http://localhost:3000`.

---

## 📂 Structure du projet

```
ram-bidding-portal/
├── public/                       # Assets statiques
├── src/
│   ├── components/               # Composants partagés
│   │   ├── Navbar.jsx           # Nav transparente → solide au scroll
│   │   ├── Footer.jsx           # Footer sombre élégant
│   │   ├── Layout.jsx           # Wrapper portail
│   │   ├── ConsultationsList.jsx
│   │   ├── KpiGrid.jsx
│   │   ├── RankingTable.jsx
│   │   ├── BidForm.jsx          # Formulaire de soumission
│   │   ├── HistoryTimeline.jsx
│   │   ├── PriceChart.jsx
│   │   └── LoadingState.jsx
│   ├── pages/
│   │   ├── Landing.jsx          # Page d'accueil premium
│   │   ├── Login.jsx            # Page de connexion
│   │   └── HotelDashboard.jsx   # Dashboard du bidding
│   ├── services/
│   │   └── salesforceApi.js     # Couche API (mock / Salesforce)
│   ├── data/
│   │   └── mockData.js          # Données fictives pour le POC
│   ├── App.jsx                   # Routes
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Styles globaux + Tailwind
├── tailwind.config.js            # Palette RAM (rouge, prune, doré)
├── vite.config.js
├── vercel.json                   # Config déploiement Vercel
└── package.json
```

---

## 🎨 Palette de couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| `ram-primary` | `#C20831` | Rouge RAM principal |
| `ram-secondary` | `#4A1E2C` | Prune foncé |
| `ram-gold` | `#C9A86A` | Doré (accents premium) |
| `bg` | `#F8F8F8` | Background général |
| `ink` | `#1A1A1A` | Texte sombre |

Polices : **Poppins** (titres) + **Inter** (corps).

---

## 🔌 Connexion à Salesforce

### Mode actuel : MOCK

Le fichier `src/services/salesforceApi.js` contient une variable `USE_MOCK = true`. Toutes les fonctions retournent des données fictives depuis `src/data/mockData.js`.

### Quand Salesforce sera prêt

1. Récupérer auprès des collègues Salesforce :
   - L'URL de l'instance (ex: `https://ram-dev.my.salesforce.com`)
   - Le `Client ID` de la Connected App
   - Un access token OAuth (ou implémenter le flow OAuth complet)

2. Créer un fichier `.env` à partir de `.env.example` :
   ```bash
   cp .env.example .env
   # puis éditer .env avec les vraies valeurs
   ```

3. Dans `src/services/salesforceApi.js`, passer `USE_MOCK = false`.

4. Les endpoints Apex REST attendus côté Salesforce sont :

| Méthode | URL | Description |
|---------|-----|-------------|
| `GET` | `/services/apexrest/bidding/consultations` | Liste des consultations de l'hôtel |
| `GET` | `/services/apexrest/bidding/consultation/{id}` | Détail (ranking + KPIs + chart) |
| `GET` | `/services/apexrest/bidding/history/{id}` | Historique des soumissions |
| `POST` | `/services/apexrest/bidding/submit` | Soumettre un nouveau tarif |
| `GET` | `/services/apexrest/bidding/me` | Profil de l'hôtel connecté |

**Aucun composant React n'a besoin d'être modifié** — seul le service API change.

---

## ☁️ Déploiement Vercel

```bash
# Première fois
npm i -g vercel
vercel login
vercel

# Mises à jour
vercel --prod
```

Le fichier `vercel.json` est déjà configuré. Les variables d'environnement `VITE_SF_*` sont à renseigner dans le dashboard Vercel (Settings → Environment Variables).

---

## ✅ Pages livrées

- **`/`** — Landing page premium (hero vidéo, sections programme, étapes, CTA)
- **`/login`** — Page de connexion avec SSO Salesforce
- **`/portal`** — Dashboard hôtel : consultations, KPIs, classement, formulaire de bid, historique, graphique évolution

---

## 📝 Points pour les collègues Salesforce

Pour que la connexion fonctionne, il faut côté Salesforce :

1. **Créer une Connected App** avec :
   - OAuth scopes : `api`, `refresh_token`, `web`
   - Callback URL : `https://ram-bidding-portal.vercel.app/oauth/callback` (ou ton URL Vercel)
   - CORS allowlist : ajouter le domaine du portail

2. **Créer 4 objets custom** :
   - `Consultation__c`
   - `Soumission__c`
   - `Classement__c`
   - `Hotel__c`

3. **Exposer 5 endpoints Apex REST** (voir tableau ci-dessus).

4. **Activer CORS** pour le domaine du portail dans Setup → CORS.
# RAM-bidding-portal

# RAM-portal
