# hub.7arts.bg — National Cultural Operating System
## Product Architecture & Deep Dive: Funding & Crowdfunding Module

---

## 1. PLATFORM VISION

### Core Proposition
hub.7arts.bg is Bulgaria's first national-scale cultural infrastructure platform — a brutal, category-defining operating system that transforms how culture is created, distributed, funded, and experienced.

### Strategic Imperatives
- **Independent-artist first**: Built for creators, not institutions. Institutions adapt to the platform, not the reverse.
- **Infrastructure-grade reliability**: Must handle national-scale traffic, payments, and critical cultural data.
- **Monetization-native**: Every module has clear revenue streams. Sustainability is not optional.
- **Institution-ready**: Compliant, auditable, integrable with government systems (GDPR, NRA, Ministry of Culture).
- **Category-defining**: Sets the standard that other countries copy. Not "Eventbrite for Bulgaria" — the cultural OS.

### What This Is NOT
- Not a listing site
- Not a ticketing platform with profiles
- Not a social network for artists
- Not a grant portal

### What This IS
- The national cultural graph database
- The operating system for cultural production and distribution
- The reputation and identity layer for Bulgarian culture
- The funding engine for independent creation
- The data infrastructure for cultural policy

---

## 2. USER ROLES

### Primary Actors
1. **Independent Artists** (performers, visual artists, musicians, writers, dancers, filmmakers)
   - Individual creators
   - Collectives and groups (unofficial formations)
   - Freelance cultural workers

2. **Cultural Organizations**
   - Theaters, galleries, museums
   - Cultural centers and houses
   - Festivals and event organizers
   - Production companies

3. **Venues**
   - Theaters, clubs, galleries
   - Non-traditional spaces (cafes, warehouses, public spaces)
   - Venue owners and managers

4. **Audiences**
   - Event attendees
   - Patrons and supporters
   - Cultural tourists
   - Corporate sponsors

5. **Funding Bodies**
   - National Culture Fund (NCF)
   - Municipality culture departments
   - Private foundations
   - EU funding programs

6. **Corporate Partners**
   - Sponsors
   - HR departments (team building, culture benefits)
   - CSR programs

7. **Platform Administrators**
   - 7Arts core team
   - Moderators
   - Data analysts
   - Trust & safety team

### Secondary Actors
- Journalists and critics
- Cultural researchers
- Government agencies (Ministry of Culture, NRA)
- Tourism boards
- Educational institutions

---

## 3. CORE MODULES

### 3.1 Cultural Map
**Purpose**: National graph of cultural entities, relationships, and activity.

**Components**:
- Geographic mapping (events, venues, artists)
- Genre/discipline taxonomy
- Relationship mapping (collaborations, mentorship, ensembles)
- Historical archive (past events, productions)
- Real-time activity feed

**Data Structure**:
- Entities: Artists, Organizations, Venues, Events, Works
- Relationships: collaborated_with, performed_at, funded_by, mentored_by
- Attributes: Genre, location, time, reputation scores

### 3.2 Events & Ticketing
**Purpose**: Event discovery, promotion, and transaction layer.

**Components**:
- Event creation and management
- Ticketing and reservations
- Capacity management
- Revenue splitting (artists/venues/platform)
- Check-in and attendance verification
- Post-event reviews and ratings

**Critical Features**:
- Dynamic pricing algorithms
- Multi-artist split payments
- Recurring event series
- Venue calendar integration
- No-show penalty systems

### 3.3 Jobs & Gigs
**Purpose**: Labor marketplace for cultural production.

**Components**:
- Job postings (full-time, project-based, gigs)
- Skill-based matching
- Portfolio integration
- Contract templates
- Payment escrow
- Reputation-based recommendations

**Job Types**:
- Performance gigs
- Technical crew (sound, light, stage)
- Creative roles (director, choreographer, curator)
- Administrative (producer, manager)

### 3.4 **Funding & Crowdfunding** ⚡
**Purpose**: Multi-modal funding engine for cultural projects.
*See Section 8 for full deep dive*

**Funding Modes**:
1. Crowdfunding (Kickstarter-style)
2. Pre-sales (tickets, merchandise, access)
3. Patronage (recurring support)
4. Grant applications (institutional funding)
5. Corporate sponsorship matching

### 3.5 Profiles & Reputation
**Purpose**: Identity, portfolio, and trust layer.

**Components**:
- Verified profiles (artists, orgs, venues)
- Portfolio and media galleries
- CV/résumé builder
- Reviews and endorsements
- Reputation scores (algorithmic + peer-review)
- Collaboration history

**Reputation Metrics**:
- Project completion rate
- Funder satisfaction scores
- Peer endorsements
- Audience ratings
- Financial transparency score

### 3.6 Data Dashboards
**Purpose**: Intelligence layer for cultural ecosystem.

**User Dashboards**:
- Artists: earnings, audience growth, project pipeline
- Venues: occupancy rates, revenue trends, artist relationships
- Funders: portfolio performance, impact metrics
- Platform: transaction volumes, user growth, geographic distribution

**Public Dashboards**:
- National cultural activity (heatmaps, trends)
- Genre popularity shifts
- Funding flow visualization
- Regional disparities
- Emerging artists index

### 3.7 Governance & Trust
**Purpose**: Dispute resolution, moderation, and platform democracy.

**Components**:
- Dispute arbitration (contracts, payments)
- Content moderation (spam, abuse)
- Community guidelines enforcement
- Governance proposals (platform rules)
- Transparency reports

**Mechanisms**:
- Multi-signature escrow for high-value transactions
- Community jury for disputes
- Reputation staking for governance votes
- Automatic fraud detection (ML-based)

---

## 4. FEATURE SETS PER MODULE

### Cultural Map
- **Discovery**:
  - Advanced filters (genre, location, date, price, accessibility)
  - Personalized recommendations (ML-based)
  - "Near me" real-time event alerts
  - Artist/venue relationship explorer

- **Data Integrity**:
  - Verified entity badges (manual review)
  - Duplicate detection and merging
  - User-submitted corrections (moderated)
  - API for third-party data sources

- **Export & Integration**:
  - Public API for researchers
  - Google Maps integration
  - Tourism platform partnerships
  - Calendar export (iCal, Google Calendar)

### Events & Ticketing
- **Event Creation**:
  - Templates (concert, theater, exhibition, workshop)
  - Recurring event series
  - Multi-venue tours
  - Collaborative events (multiple artists/orgs)

- **Ticketing**:
  - Tiered pricing (early bird, VIP, student)
  - Dynamic pricing (demand-based)
  - Group discounts
  - Seating chart builder
  - QR code check-in
  - Refund policies (configurable)

- **Revenue Management**:
  - Automatic split payments (artist/venue/platform)
  - Revenue withholding (anti-fraud)
  - Tax-compliant invoicing
  - Currency support (BGN, EUR)

### Jobs & Gigs
- **Posting Management**:
  - Job templates by role
  - Budget range transparency
  - Required skills tagging
  - Application tracking
  - Shortlisting and communication

- **Matching Algorithm**:
  - Skill-based recommendations
  - Location proximity
  - Availability matching
  - Reputation filtering
  - Past collaboration history

- **Contract & Payment**:
  - Contract templates (GDPR-compliant)
  - Milestone-based payments
  - Escrow for freelance gigs
  - Invoice generation (NRA-compliant)
  - Dispute mediation

### Profiles & Reputation
- **Identity Verification**:
  - Email/phone verification
  - Government ID verification (optional, for high-trust users)
  - Social media linking (proof of identity)
  - Bank account verification (for payments)

- **Portfolio**:
  - Media uploads (images, video, audio)
  - Project showcase (past work)
  - Press mentions and reviews
  - Collaboration credits
  - Awards and recognitions

- **Reputation System**:
  - Completion rate (projects, events)
  - Audience ratings (post-event)
  - Peer endorsements (verified collaborators)
  - Financial transparency (public funding disclosures)
  - Dispute history (visible only to moderators)

### Data Dashboards
- **Artist Dashboard**:
  - Earnings breakdown (events, funding, jobs)
  - Audience demographics
  - Geographic reach
  - Project pipeline (upcoming, in-progress, completed)
  - Reputation trends

- **Venue Dashboard**:
  - Occupancy rates (by day/month)
  - Revenue per event
  - Artist relationship network
  - Equipment usage tracking
  - Audience retention

- **National Dashboard** (public):
  - Cultural activity heatmap
  - Funding distribution by region/genre
  - Emerging artist index
  - Event density over time
  - Economic impact estimates

### Governance & Trust
- **Dispute Resolution**:
  - Automated negotiation (chatbot-assisted)
  - Community jury (random selection, reputation-weighted)
  - Expert arbitration (paid service)
  - Legal escalation (integration with courts)

- **Moderation**:
  - Automated spam detection
  - User reporting system
  - Moderator dashboard
  - Appeal process
  - Transparency reports (quarterly)

- **Platform Governance**:
  - Feature proposals (user-submitted)
  - Voting (reputation-weighted)
  - Rule changes (require supermajority)
  - Fee adjustments (community input required)

---

## 5. MONETIZATION LAYERS

### Direct Revenue Streams
1. **Transaction Fees**:
   - Events: 3-5% of ticket sales
   - Crowdfunding: 5% of funds raised + payment processing (2-3%)
   - Jobs: 10% fee on contract value (split between poster and worker)
   - Pre-sales: 5% of sales

2. **Premium Subscriptions**:
   - **Artist Pro** (20 BGN/month):
     - Unlimited events
     - Advanced analytics
     - Priority support
     - Promotional boosts
     - Custom profile URL
   - **Venue Pro** (50 BGN/month):
     - Multi-user access
     - Calendar sync
     - Revenue forecasting
     - Artist CRM
   - **Organization Enterprise** (200 BGN/month):
     - White-label event pages
     - API access
     - Custom integrations
     - Dedicated account manager

3. **Premium Features** (pay-per-use):
   - Featured event placement: 50-200 BGN
   - Promoted artist profile: 30 BGN/week
   - Email campaign to followers: 20 BGN
   - Data export (advanced): 100 BGN/report

4. **Corporate Services**:
   - Sponsorship matching: 15% of sponsorship value
   - Team building event packages: fixed fee + commission
   - Cultural benefits administration: per-employee pricing

5. **Data & API Access**:
   - Research API: 500 BGN/month (universities, NGOs)
   - Commercial API: custom pricing (ticketing platforms, agencies)
   - Data reports: 200-2000 BGN (municipalities, agencies)

### Indirect Revenue Streams
1. **Affiliate Partnerships**:
   - Equipment rental (sound, lighting)
   - Travel and accommodation (for touring artists)
   - Insurance (event cancellation, liability)
   - Printing (posters, programs)

2. **Grant Administration**:
   - Fee for managing grant applications (paid by grant bodies): 3-5% of grant value
   - White-label grant portals for municipalities

3. **Corporate Sponsorships**:
   - Platform-level sponsorships (e.g., "Powered by [Brand]")
   - Dashboard ads (non-intrusive, culturally relevant)

### Sustainability Mechanisms
- **Sliding Scale Fees**: Smaller artists/events pay lower percentages
- **Nonprofit Exemptions**: Verified nonprofits get 50% fee discount
- **Regional Equity**: Lower fees for events in underserved regions
- **Freemium Core**: Basic features always free (event creation, profile, discovery)

---

## 6. TRUST & GOVERNANCE

### Trust Infrastructure
1. **Identity Verification**:
   - Tier 1: Email/phone (required)
   - Tier 2: Social media linking (optional)
   - Tier 3: Government ID (optional, for high-value transactions)
   - Tier 4: Bank verification (required for payouts)

2. **Financial Safeguards**:
   - Escrow for all crowdfunding campaigns
   - Multi-signature release (platform + creator)
   - Reserve fund (5% of transaction volume for disputes)
   - Fraud detection (ML-based anomaly detection)

3. **Reputation System**:
   - Multi-dimensional scoring (not just star ratings)
   - Time-decay for old negative reviews
   - Verified reviewer status (attended event, funded project)
   - Appeals process for disputed reviews

4. **Moderation**:
   - AI-assisted content moderation (hate speech, spam)
   - Human review for edge cases
   - Community reporting
   - Transparent moderation log (public dashboard)

### Governance Model
1. **Platform Rules**:
   - Community-proposed amendments
   - Voting: 1 vote = 1 verified user (reputation-weighted)
   - Quorum requirement: 5% of active users
   - Supermajority: 60% for rule changes

2. **Dispute Resolution**:
   - **Stage 1**: Automated mediation (chatbot)
   - **Stage 2**: Community jury (3-5 random verified users, reputation > threshold)
   - **Stage 3**: Expert arbitration (paid, binding)
   - **Stage 4**: Legal escalation (court system)

3. **Transparency**:
   - Quarterly transparency reports (disputes, moderation, financials)
   - Public API for platform statistics
   - Open-source moderation guidelines

### Abuse Prevention
1. **Financial Abuse**:
   - Campaign verification (project viability check)
   - Funding limits for unverified users
   - Suspicious activity alerts (large withdrawals, unusual patterns)
   - Mandatory refund policy for failed campaigns

2. **Reputation Abuse**:
   - Review bombing detection (coordinated negative reviews)
   - Sockpuppet account detection
   - Endorsement reciprocity limits (can't trade endorsements)

3. **Content Abuse**:
   - Spam detection (duplicate events, fake profiles)
   - Copyright infringement reporting
   - GDPR compliance (data deletion, portability)

---

## 7. MVP vs FULL ROADMAP

### MVP (Months 1-6)
**Goal**: Prove core loops work. Ship minimal viable platform.

**Modules**:
1. **Profiles** (basic):
   - Artist/org/venue profiles
   - Portfolio upload
   - Email verification only

2. **Events** (basic):
   - Event creation
   - Simple ticketing (single price tier)
   - Stripe integration
   - 5% platform fee

3. **Cultural Map** (basic):
   - Event listing with filters (date, location, genre)
   - Map view (Google Maps integration)
   - Search

4. **Crowdfunding** (basic):
   - Campaign creation
   - Fixed funding goal (all-or-nothing)
   - Escrow via Stripe
   - 5% platform fee

**Metrics to Validate**:
- 500 registered artists
- 100 events created
- 10 funded campaigns
- 50,000 BGN in ticket sales
- 20,000 BGN in crowdfunding

### Phase 2 (Months 7-12)
**Goal**: Add critical features for retention and growth.

**New Features**:
- **Reputation system**: Reviews, endorsements, completion rates
- **Jobs module**: Gig postings, escrow payments
- **Advanced crowdfunding**: Flexible funding, pre-sales, patronage
- **Premium subscriptions**: Artist Pro, Venue Pro
- **Dashboard v1**: Basic analytics for artists and venues

### Phase 3 (Months 13-18)
**Goal**: Scale to national infrastructure.

**New Features**:
- **Grant integration**: NCF, municipality grant applications
- **Corporate tools**: Sponsorship matching, team building packages
- **Advanced map**: Relationship explorer, historical archive
- **Governance**: Dispute resolution, community voting
- **Public dashboards**: National cultural activity heatmaps

### Phase 4 (Months 19-24)
**Goal**: Become category-defining platform.

**New Features**:
- **API ecosystem**: Third-party integrations (ticketing, CRM, accounting)
- **White-label solutions**: Municipalities, festivals
- **International expansion**: English interface, multi-currency
- **AI features**: Recommendation engine, fraud detection, automated moderation
- **Data products**: Research API, commercial insights

### Long-term Vision (Year 3+)
- **Cultural graph database**: Open data standard for European cultural platforms
- **Blockchain integration**: NFTs for unique cultural works, immutable provenance
- **Government integration**: Direct Ministry of Culture funding flows
- **Education layer**: Courses, workshops, certifications
- **Hardware layer**: POS systems for venues, artist payment cards

---

---

# 8. DEEP DIVE: FUNDING & CROWDFUNDING MODULE ⚡

---

## 8.1 MODULE OVERVIEW

### Purpose
The Funding & Crowdfunding module is the financial engine of hub.7arts.bg. It transforms how cultural projects are funded in Bulgaria by providing:
- **Decentralized funding** (not dependent on institutions)
- **Speed** (launch campaigns in minutes, get funded in days)
- **Transparency** (public funding goals, backers, usage)
- **Flexibility** (multiple funding models for different project types)
- **Trust** (escrow, reputation, accountability)

### Why This Matters
Bulgarian independent culture is chronically underfunded. Traditional funding routes:
- **NCF (National Culture Fund)**: Slow (6-12 month application cycles), bureaucratic, favors established organizations
- **Private sponsors**: Opaque, relationship-based, unpredictable
- **Ticket sales**: Only works for proven artists with existing audiences

The Funding module bypasses these bottlenecks and creates a **direct line between creators and supporters**.

### Design Principles
1. **Creator-first**: Campaign creation must be faster than writing a grant application
2. **Transparent**: All funding is public. All usage is tracked.
3. **Flexible**: Support one-off projects, recurring work, and institutional grants
4. **Safe**: Escrow, fraud detection, refund guarantees
5. **Scalable**: Handle everything from a 500 BGN short film to a 500,000 BGN theater production

---

## 8.2 FUNDING MODES

### Mode 1: All-or-Nothing Crowdfunding
**Model**: Kickstarter-style. Campaign sets a goal. If goal is met by deadline, funds are released. If not, backers are refunded.

**Use Cases**:
- Production funding (theater shows, films, albums)
- Event expenses (festival budgets, tour costs)
- Equipment purchases (instruments, cameras, sound systems)
- Publication costs (books, art catalogs)

**Key Features**:
- Fixed funding goal (minimum viable budget)
- Fixed deadline (7-90 days)
- Tiered rewards (backer incentives)
- Stretch goals (optional, if overfunded)
- Public backer list (opt-in for backers)

**Risk Mitigation**:
- Funds held in escrow until goal met
- Automatic refunds if goal not met
- Project viability check (moderator review for campaigns > 10,000 BGN)

---

### Mode 2: Flexible Funding (Keep What You Raise)
**Model**: Indiegogo-style. Campaign keeps all funds raised, even if goal not met.

**Use Cases**:
- Ongoing projects (web series, podcast seasons)
- Community initiatives (artist residencies, workshops)
- Experimental work (prototypes, R&D)
- Emergency funding (artist in crisis, venue repairs)

**Key Features**:
- Minimum goal (optional, for transparency)
- Rolling deadline or no deadline
- Funds released incrementally (weekly payouts)
- Refund option (backer-initiated, before payout)

**Risk Mitigation**:
- Higher platform fee (7% vs 5% for all-or-nothing)
- Mandatory project updates (weekly, or funds frozen)
- Refund reserve (10% held for 30 days post-campaign)

---

### Mode 3: Pre-Sales
**Model**: Sell access before creation (tickets, books, merchandise, digital content).

**Use Cases**:
- Event tickets (concerts, shows, screenings)
- Physical goods (albums, art prints, books)
- Digital goods (film rentals, courses, exclusive content)
- Memberships (season passes, artist clubs)

**Key Features**:
- Product catalog (items, quantities, delivery dates)
- Inventory management (limited editions)
- Fulfillment tracking (shipped, delivered, downloaded)
- Automatic refunds (if project canceled)

**Revenue Model**:
- 3% platform fee (lower than crowdfunding because less risk)
- Payment processing fee (2-3%, passed to creator)

**Legal Compliance**:
- Consumer protection laws (14-day refund window for digital goods)
- Delivery guarantees (max 90 days from purchase)
- Tax invoicing (automatic NRA-compliant receipts)

---

### Mode 4: Patronage (Recurring Support)
**Model**: Patreon-style. Backers pledge monthly support. Creators deliver ongoing content/perks.

**Use Cases**:
- Independent theaters (sustaining operations)
- Writers and journalists (free access, member perks)
- Musicians (monthly releases, live streams)
- Visual artists (studio access, work-in-progress updates)

**Key Features**:
- Tiered memberships (Bronze, Silver, Gold)
- Recurring billing (monthly, quarterly, annual)
- Exclusive content (members-only posts, events, merch)
- Early access (tickets, releases)
- Cancellation (anytime, no penalty)

**Revenue Model**:
- 5% platform fee (lower than crowdfunding because predictable)
- Automatic invoicing (monthly receipts)

**Churn Prevention**:
- Creator commitment (must deliver content monthly or lose 50% of patrons)
- Pause option (backers can pause, not cancel)
- Milestone rewards (6 months, 12 months bonuses)

---

### Mode 5: Grant Applications (Institutional Funding)
**Model**: Platform as intermediary for NCF, municipalities, foundations. Digital application, automated processing, transparent tracking.

**Use Cases**:
- NCF annual grant programs
- Municipality culture budgets
- Private foundation grants (e.g., America for Bulgaria)
- EU funding programs (Creative Europe)

**Key Features**:
- Grant portal (white-label for each funder)
- Application templates (pre-filled from artist profile)
- Automated eligibility checks (saves time for reviewers)
- Review dashboard (for grant committees)
- Public awards database (transparency)
- Milestone-based disbursement (tranches, not lump sum)

**Revenue Model**:
- Fee paid by grant bodies (3-5% of total grant budget)
- No fee for applicants

**Value Proposition for Funders**:
- Reduced administrative burden (digital applications, automated checks)
- Better data (see full artist history, reputation, past projects)
- Transparency (public dashboard of grants awarded)
- Impact tracking (see project outcomes, audience reach)

---

### Mode 6: Corporate Sponsorship Matching
**Model**: Platform connects projects with corporate sponsors. Automated matching based on brand alignment, budget, audience.

**Use Cases**:
- Event sponsorships (festivals, concerts, exhibitions)
- Artist endorsements (brand partnerships)
- CSR programs (corporate cultural initiatives)
- Product placements (films, theater, music videos)

**Key Features**:
- Sponsor profiles (budget, interests, past sponsorships)
- Matching algorithm (genre, audience demographics, values alignment)
- Sponsorship tiers (naming rights, logo placement, exclusive access)
- Contract templates (sponsorship agreements)
- Performance tracking (impressions, engagement, ROI)

**Revenue Model**:
- 15% platform fee (higher because of matchmaking value)
- Split: 10% from sponsor, 5% from project

**Abuse Prevention**:
- Brand safety filters (no tobacco, gambling, political parties unless creator opts in)
- Creative control clauses (sponsor cannot dictate artistic content)
- Disclosure requirements (sponsored content labeled)

---

## 8.3 USER FLOWS

### Flow 1: Artist Creates All-or-Nothing Campaign

#### Step 1: Campaign Setup
1. **Navigate**: Profile → "Create Campaign" → Select "All-or-Nothing Crowdfunding"
2. **Project Details**:
   - Title (e.g., "Hamlet in Sofia Metro")
   - Category (Theater, Music, Film, Visual Arts, Dance, Literature, Other)
   - Short description (2-3 sentences, public)
   - Full description (rich text editor, images, videos, embeds)
   - Funding goal (in BGN, minimum 500 BGN)
   - Deadline (7-90 days from launch)

3. **Budget Breakdown** (transparent):
   - Production costs (e.g., set design: 3000 BGN)
   - Venue rental (e.g., 5000 BGN)
   - Artist fees (e.g., 4000 BGN)
   - Marketing (e.g., 1000 BGN)
   - Platform fee (auto-calculated: 5%)
   - Payment processing (auto-calculated: ~3%)
   - **Total goal**: e.g., 15,000 BGN

4. **Rewards Setup** (optional but recommended):
   - Tier 1: 20 BGN → Thank you in program + digital poster
   - Tier 2: 50 BGN → Above + 1 ticket
   - Tier 3: 100 BGN → Above + backstage tour
   - Tier 4: 500 BGN → Above + private rehearsal invite + name in credits
   - Tier 5: 2000 BGN → All above + executive producer credit + premiere dinner

5. **Media**:
   - Cover image (required, 1200x630px)
   - Campaign video (optional but increases success rate by 50%)
   - Additional images (up to 10)
   - Links (website, social media, press)

6. **Legal**:
   - Confirm identity (email verification required, ID verification for >10k BGN)
   - Accept terms (refund policy, content guidelines)
   - Tax information (personal ID or company EIK for invoicing)

#### Step 2: Moderation Review
- **Auto-approval**: Campaigns < 5000 BGN, from verified users, no red flags
- **Manual review**: Campaigns > 5000 BGN, first-time users, flagged keywords
  - Review time: 24-48 hours
  - Criteria: Feasibility, clarity, no prohibited content (hate speech, scams, illegal activity)

#### Step 3: Campaign Launch
- Campaign goes live on platform
- Shareable link: hub.7arts.bg/campaigns/hamlet-metro
- Automatic sharing: Facebook, Instagram, Twitter (if artist connected)
- Email to artist followers on platform

#### Step 4: Fundraising Period
- **Artist actions**:
  - Post updates (text, images, videos)
  - Reply to backer comments
  - Adjust rewards (if campaign struggling)
  - Reach milestones (e.g., "50% funded!")

- **Platform actions**:
  - Send milestone emails to backers ("24 hours left!", "90% funded!")
  - Surface campaign in discovery (if trending)
  - Provide analytics (traffic sources, conversion rates)

- **Backer actions**:
  - Pledge funds (via Stripe: card, Apple Pay, Google Pay)
  - Select reward tier
  - Leave public comment or support message
  - Share campaign
  - Cancel pledge (before campaign ends)

#### Step 5A: Campaign Succeeds (Goal Met)
- **Automatic actions**:
  - Charge all backers (funds move from authorization to capture)
  - Transfer funds to escrow account (platform-controlled)
  - Send success email to artist and backers
  - Release 50% of funds to artist immediately (for production start)
  - Hold 50% until project milestones met (or 90 days, whichever sooner)

- **Artist obligations**:
  - Post update within 7 days (project timeline, next steps)
  - Fulfill rewards (ship items, send tickets, deliver digital goods)
  - Complete project within 12 months (or deadline specified in campaign)
  - Post final report (photos, videos, outcomes)

#### Step 5B: Campaign Fails (Goal Not Met)
- **Automatic actions**:
  - Release all payment authorizations (backers not charged)
  - Send failure email to artist and backers
  - Archive campaign (visible but marked "Not Funded")

- **Artist options**:
  - Relaunch with lower goal
  - Switch to Flexible Funding mode (keep what was raised)
  - Contact platform for advice (free consultation)

---

### Flow 2: Backer Supports a Campaign

#### Step 1: Discovery
- **Methods**:
  - Browse campaigns page (filters: category, location, trending, ending soon)
  - Search (keywords, artist name)
  - Personalized feed (based on past support, followed artists)
  - Social media (artist shares campaign link)
  - Email (platform newsletter, artist announcement)

#### Step 2: Campaign Page
- **Information presented**:
  - Header: Title, artist name, cover image, funding progress bar
  - Stats: Goal, pledged, backers, days left
  - Description: Full project details
  - Budget breakdown (transparent costs)
  - Rewards: Tiers with delivery dates
  - Updates: Artist posts
  - Comments: Backer questions and support
  - Artist profile: Link to full profile, past projects, reputation score

#### Step 3: Pledge Decision
- **User selects**:
  - Reward tier (or "no reward, just support")
  - Quantity (e.g., 2 tickets)
  - Additional amount (optional, round up pledge)

- **Payment info**:
  - Card details (Stripe Checkout)
  - Billing address
  - Email (for receipt and updates)

- **User account**:
  - Option to create account (saves payment info, tracks pledges)
  - Or pledge as guest (email-only tracking)

#### Step 4: Pledge Confirmation
- **Immediate feedback**:
  - "You pledged 50 BGN to Hamlet in Sofia Metro!"
  - Pledge details (reward, delivery date, total)
  - Payment authorization (not charged yet if all-or-nothing)
  - Next steps (invite to follow artist, share campaign)

- **Email confirmation**:
  - Receipt (if funds charged immediately, i.e., flexible funding)
  - Authorization (if all-or-nothing, funds charged only if goal met)

#### Step 5: Campaign Updates
- **Backer receives**:
  - Email notifications (updates, milestones, campaign success/failure)
  - Dashboard (if registered user): "My Pledges" page with all campaigns backed
  - Reward fulfillment notifications (shipped, delivered)

#### Step 6: Reward Fulfillment
- **For physical goods**:
  - Artist marks item as "shipped" (adds tracking number)
  - Platform emails backer
  - Backer confirms receipt or reports issue

- **For digital goods**:
  - Download link sent automatically (if file upload)
  - Access code (if membership or event)

- **For event tickets**:
  - QR code sent 7 days before event
  - Check-in at event (scanned via platform app)

#### Step 7: Post-Campaign
- **Backer actions**:
  - Leave review (rate project 1-5 stars, write comment)
  - Report issue (reward not delivered, project not completed)
  - Follow artist (get notified of future campaigns)

---

### Flow 3: Corporate Sponsor Finds and Funds a Project

#### Step 1: Sponsor Profile Creation
- **Company info**:
  - Name, logo, website
  - Industry (tech, finance, FMCG, pharma, etc.)
  - Sponsorship budget (annual, per-project)
  - Interests (genres, causes, audience demographics)
  - Brand values (e.g., sustainability, innovation, tradition)

- **Verification**:
  - Company registration check (EIK lookup)
  - Contract signer authorization
  - Payment method (invoice-based, not card)

#### Step 2: Browse Sponsorable Projects
- **Discovery methods**:
  - Matching algorithm (platform suggests projects aligned with sponsor interests)
  - Browse campaigns (filter by budget need, audience size, genre)
  - Artist outreach (artists can pitch directly to sponsors)

- **Project pages show**:
  - Sponsorship opportunities (naming rights, logo placement, VIP tickets)
  - Audience demographics (age, location, interests)
  - Past sponsorships (if artist has history)
  - Expected reach (attendees, social media impressions)

#### Step 3: Sponsorship Proposal
- **Sponsor sends inquiry**:
  - Desired sponsorship tier (logo on poster, naming rights, etc.)
  - Budget (amount willing to commit)
  - Requirements (branding guidelines, exclusivity)

- **Artist responds**:
  - Accept, counter-offer, or decline
  - Negotiate terms (via platform messaging)

#### Step 4: Contract & Payment
- **Platform generates contract**:
  - Auto-filled template (sponsorship amount, deliverables, deadlines)
  - Both parties review and e-sign (DocuSign integration)

- **Payment**:
  - Invoice sent to sponsor (via platform)
  - Payment to escrow (bank transfer or card, if smaller amount)
  - Funds released to artist in tranches (50% upfront, 50% after event/project completion)

#### Step 5: Fulfillment & Reporting
- **Artist delivers**:
  - Logo placement (posters, programs, website)
  - VIP tickets or backstage access
  - Social media mentions (tagged posts)
  - Post-event report (photos, videos, attendance numbers, media coverage)

- **Platform tracks**:
  - Deliverable completion (checklist)
  - Sponsor satisfaction (post-campaign survey)
  - Performance metrics (reach, engagement, ROI estimate)

#### Step 6: Post-Sponsorship
- **Sponsor reviews artist**:
  - Rate collaboration (professionalism, deliverables, impact)
  - Public testimonial (optional)

- **Artist reviews sponsor**:
  - Rate experience (payment speed, communication, flexibility)

- **Platform benefits**:
  - Successful sponsors get priority access to future high-value projects
  - Artists with high sponsor ratings get boosted in matching algorithm

---

## 8.4 LEGAL CONSIDERATIONS

### Bulgarian Legal Framework

#### 1. Payment Services & Escrow
- **Regulation**: Payment Services and Payment Systems Act (ZPPSP)
- **Requirements**:
  - Platform must partner with licensed payment institution (e.g., Stripe, PayPal)
  - Cannot hold funds directly unless licensed as payment institution
  - Escrow accounts must be segregated (client funds ≠ platform funds)

- **Implementation**:
  - Use Stripe Connect (marketplace solution)
  - Funds held in Stripe-managed escrow accounts
  - Platform triggers payouts via API

#### 2. Consumer Protection
- **Regulation**: Consumer Protection Act (ZZP)
- **Key clauses**:
  - **14-day cooling-off period**: For digital goods, backers can request refunds within 14 days (unless content delivered)
  - **Refund rights**: If project not delivered, backers entitled to full refund
  - **Transparency**: Pricing must be clear (no hidden fees)

- **Implementation**:
  - Refund policy clearly stated on every campaign page
  - Automatic refund processing (no manual approval needed)
  - Fee breakdown (platform fee + payment processing) shown before pledge

#### 3. Tax Compliance (NRA)
- **Regulation**: Corporate Income Tax Act, VAT Act
- **Requirements**:
  - Platform must issue invoices for all transactions
  - Artists must declare income (personal or corporate tax)
  - VAT applies if artist is VAT-registered (20% in Bulgaria)
  - Platform must report transaction data to NRA (annual filing)

- **Implementation**:
  - Auto-generate invoices (PDF, sent via email)
  - Collect tax info from artists (personal ID or EIK)
  - Provide annual transaction summary (for artist tax filings)
  - API integration with NRA (if available, for automated reporting)

#### 4. Anti-Money Laundering (AML)
- **Regulation**: Measures Against Money Laundering Act (ZMIP)
- **Requirements**:
  - Know Your Customer (KYC) for high-value transactions (> 15,000 EUR)
  - Report suspicious activity to Financial Intelligence Directorate (FID)
  - Keep records for 5 years

- **Implementation**:
  - ID verification (via Onfido or Jumio) for campaigns > 50,000 BGN
  - Automated fraud detection (ML models)
  - Suspicious activity alerts (manual review by compliance team)

#### 5. GDPR Compliance
- **Regulation**: General Data Protection Regulation (EU)
- **Requirements**:
  - User consent for data processing
  - Right to access, correct, delete data
  - Data breach notification (72 hours)
  - Data minimization (collect only necessary data)

- **Implementation**:
  - Privacy policy (clear, accessible)
  - Cookie consent banner
  - Data export tool (user downloads all their data as JSON)
  - Data deletion (user can delete account, data erased within 30 days)
  - Encrypted data storage (PII encrypted at rest)

#### 6. Crowdfunding-Specific Regulations
- **Current status**: Bulgaria has no specific crowdfunding law (as of 2026)
- **EU Regulation**: European Crowdfunding Service Providers Regulation (ECSPR) applies
  - **Threshold**: If campaign > 5 million EUR, must comply with ECSPR
  - **Requirements**: Platform authorization, disclosure requirements, governance

- **Implementation**:
  - Cap campaigns at 1 million BGN (below ECSPR threshold)
  - Monitor EU regulatory changes
  - Prepare for future licensing (if Bulgaria adopts stricter rules)

---

### International Considerations (Future Expansion)

#### If Expanding Beyond Bulgaria:
1. **EU Markets**:
   - ECSPR compliance (authorization in one EU country = passport to all)
   - Multi-currency support (EUR)
   - Localized terms & conditions

2. **Payment Processing**:
   - Stripe Atlas (multi-country support)
   - Local payment methods (e.g., Sofort in Germany, iDEAL in Netherlands)

3. **Tax**:
   - VAT MOSS (Mini One Stop Shop) for cross-border digital sales
   - Withholding tax (if paying artists in other countries)

---

## 8.5 EDGE CASES & RISK MITIGATION

### Edge Case 1: Campaign Funded but Artist Disappears
**Scenario**: Artist raises 20,000 BGN, gets 50% upfront, then stops responding. No updates, no project.

**Prevention**:
- **Milestone-based payouts**: 50% upfront, 25% at mid-point update, 25% at completion
- **Update requirements**: If no update in 30 days, platform freezes remaining funds
- **Refund trigger**: If no update in 90 days, backers can vote to trigger refunds (majority vote)

**Response**:
- Platform contacts artist (email, phone, registered address)
- If no response in 14 days, case escalated to dispute resolution
- Community jury reviews case
- If fraud confirmed, remaining funds returned to backers (pro-rata)
- Artist banned from platform, reputation score destroyed

**Aftermath**:
- Platform's reserve fund covers shortfall (if artist already withdrew funds)
- Legal action (if amount > 10,000 BGN)
- Case published in transparency report (anonymized)

---

### Edge Case 2: Backer Requests Refund After Project Completed
**Scenario**: Backer supported a film campaign. Film completed and screened. Backer now claims they want refund because "didn't like the film."

**Policy**:
- **No refunds after project completion** (stated in terms)
- Exception: If project materially different from campaign description (e.g., promised documentary, delivered fiction)

**Response**:
- Platform reviews campaign description vs delivered project
- If materially different: partial refund offered (50%)
- If not: refund denied, explanation sent to backer
- Backer can escalate to dispute resolution (but unlikely to win)

**Prevention**:
- Clear refund policy on every campaign page
- Backer confirms policy before pledging (checkbox)

---

### Edge Case 3: Campaign Succeeds but Costs Overrun
**Scenario**: Theater production raises 15,000 BGN. Venue rental increases unexpectedly. Artist needs 5,000 BGN more.

**Options**:
1. **Stretch goal**: If campaign exceeded original goal, use surplus
2. **New campaign**: Launch "Part 2" campaign (clearly labeled)
3. **Personal funds**: Artist covers shortfall
4. **Scale down**: Reduce production scope (fewer performances, smaller venue)

**Platform support**:
- Consultation (project management advice)
- Discounted fees for follow-up campaigns (3% instead of 5%)
- Promote follow-up campaign to original backers

**Transparency**:
- Artist must post update explaining situation
- Backers can opt out (request refund if project not delivered as promised)

---

### Edge Case 4: Sponsor Withdraws After Contract Signed
**Scenario**: Sponsor commits 10,000 BGN, contract signed. Artist prints posters with sponsor logo. Sponsor backs out.

**Prevention**:
- **Payment upfront**: 50% of sponsorship paid to escrow when contract signed
- **Cancellation clause**: If sponsor cancels, forfeits 50% (covers artist's sunk costs)

**Response**:
- Platform mediates (tries to resolve dispute)
- If sponsor insists on canceling: 50% paid to artist, 50% refunded to sponsor
- Sponsor's reputation score penalized (visible to future artists)

**Aftermath**:
- Artist can seek replacement sponsor (platform assists with matchmaking)
- If no replacement, project continues with reduced budget or scales down

---

### Edge Case 5: Campaign Contains Prohibited Content (Discovered After Funding)
**Scenario**: Campaign raises funds for a documentary. After funding, backers discover film promotes extremist views (not obvious in campaign description).

**Policy**:
- **Content guidelines**: No hate speech, violence incitement, illegal activity
- **Post-funding review**: Backers can report campaigns even after funding

**Response**:
- Platform investigates (reviews campaign, artist's statement, film synopsis)
- If violation confirmed:
  - Freeze remaining funds
  - Offer refunds to backers (optional)
  - Artist can dispute (appeals process)
  - If appeal fails: funds returned, artist banned

**Gray area**:
- Controversial ≠ prohibited (e.g., politically provocative art is allowed)
- Platform uses community jury for edge cases (not unilateral censorship)

---

### Edge Case 6: Campaign Success Triggers Tax Liability Artist Didn't Expect
**Scenario**: Artist raises 30,000 BGN. Didn't realize this counts as income. Now owes 15% personal income tax (4,500 BGN) + social security.

**Prevention**:
- **Tax warning**: During campaign setup, platform shows estimated tax liability
- **Withholding option**: Artist can opt to have platform withhold 15% for taxes (paid directly to NRA)
- **Accountant referrals**: Platform partners with accountants (discounted services for artists)

**Response**:
- Platform provides transaction summary (for tax filing)
- Artist responsible for paying taxes (platform not liable)
- If artist fails to pay, NRA can audit (not platform's issue)

**Education**:
- Help center articles ("Tax Guide for Crowdfunding")
- Webinars (quarterly, with tax experts)
- Email reminders (before tax filing deadlines)

---

### Edge Case 7: Backer Pays with Stolen Credit Card
**Scenario**: Backer pledges 500 BGN using stolen card. Campaign succeeds, funds released to artist. Card owner initiates chargeback.

**Prevention**:
- **Stripe Radar**: Fraud detection (blocks suspicious cards)
- **Verification**: For pledges > 500 BGN, require 3D Secure (SMS code)
- **Payout delay**: Hold funds for 14 days (standard chargeback window)

**Response**:
- Chargeback hits platform, not artist
- Platform's reserve fund covers loss
- Investigate backer (if pattern of fraud, ban account + IP)

**Recovery**:
- Platform absorbs loss (cost of doing business)
- If artist already received funds, platform eats the cost (artist not penalized)

---

### Edge Case 8: Artist Overpromises and Underdelivers
**Scenario**: Campaign promises 10 performances. Artist delivers 5. Backers upset.

**Policy**:
- **Deliverable tracking**: Artist must log each performance (with proof: photos, ticket stubs)
- **Backer recourse**: If deliverables not met, can request partial refund

**Response**:
- Platform reviews campaign vs delivery
- If shortfall confirmed (50% of promised performances):
  - Artist must refund 50% to backers OR
  - Artist must deliver remaining performances within 6 months
- If artist refuses: reputation score tanked, banned from future campaigns

**Transparency**:
- Case published (artist name visible, to warn future backers)

---

### Edge Case 9: Currency Fluctuation (If International Expansion)
**Scenario**: Campaign in EUR (for EU backers). EUR/BGN exchange rate shifts 10% during campaign. Artist gets less BGN than expected.

**Prevention**:
- **Lock-in rate**: When backer pledges, exchange rate locked (Stripe handles this)
- **Currency choice**: Artist chooses currency (BGN or EUR), campaign displays in that currency

**Risk**:
- If artist receives EUR but has BGN expenses, bears exchange risk
- Platform does not offer hedging (artist must manage)

---

### Edge Case 10: Platform Shuts Down (Doomsday Scenario)
**Scenario**: Platform goes bankrupt. Active campaigns in progress. Funds in escrow.

**Protection**:
- **Segregated accounts**: Escrow funds legally separate from platform assets (creditors can't touch)
- **Payout plan**: If shutdown, Stripe automatically disburses funds:
  - Successful campaigns: funds go to artists
  - Unsuccessful campaigns: refunds to backers
- **Data export**: Artists can download all campaign data (backer list, updates) before shutdown

**Communication**:
- 90-day notice (if planned shutdown)
- Emergency contact (if sudden shutdown)

---

## 8.6 MONETIZATION

### Revenue Streams

#### 1. Platform Fees (Primary Revenue)
- **All-or-Nothing Crowdfunding**: 5% of funds raised
  - Example: 10,000 BGN raised → 500 BGN to platform
- **Flexible Funding**: 7% of funds raised (higher risk = higher fee)
- **Pre-Sales**: 3% of sales (lower risk, transactional)
- **Patronage**: 5% of monthly pledges
- **Corporate Sponsorship**: 15% of sponsorship value (split: 10% sponsor, 5% artist)

#### 2. Payment Processing Fees (Pass-Through + Markup)
- **Stripe charges**: ~2.9% + 0.30 BGN per transaction
- **Platform charges**: 3% + 0.50 BGN (includes Stripe + small markup)
- **Markup revenue**: ~0.1-0.2% (low but adds up at scale)

#### 3. Premium Features (Optional Upsells)
- **Featured campaign**: 50-200 BGN (appears in "Trending" section for 7 days)
- **Email blast**: 30 BGN (send campaign to all platform users in relevant genre)
- **Analytics Pro**: 20 BGN/month (advanced conversion tracking, A/B testing)
- **Consultation**: 100 BGN/hour (campaign strategy, budget planning)

#### 4. Success Bonuses (Performance-Based)
- **Overfunding bonus**: If campaign exceeds goal by 200%, platform fee drops to 3% (incentivizes ambitious goals)
- **Repeat creator discount**: 2nd campaign: 4% fee, 3rd+: 3% fee (rewards loyalty)

#### 5. Data & Insights (B2B Revenue)
- **Cultural reports**: Sell aggregated data to municipalities, NCF, EU agencies
  - Example: "Crowdfunding Trends in Bulgarian Theater 2025" — 500 BGN per report
- **API access**: Researchers, ticketing platforms pay for data access (500 BGN/month)

#### 6. Affiliate Revenue
- **Referrals**: Equipment rental, printing, insurance
  - Example: Artist rents sound system via platform partner → 10% commission

---

### Pricing Strategy

#### Tiered Fee Structure (Fairness)
| Campaign Size      | Platform Fee | Rationale                          |
|--------------------|--------------|------------------------------------|
| 0 - 2,000 BGN      | 3%           | Encourage small creators           |
| 2,001 - 10,000 BGN | 5%           | Standard rate                      |
| 10,001 - 50,000 BGN| 4%           | Volume discount                    |
| 50,001+ BGN        | 3%           | Large projects, negotiable         |

#### Free Tier (Freemium)
- **Always free**:
  - Campaign creation (unlimited)
  - Profile and portfolio
  - Basic analytics
  - Discovery (browse campaigns)

- **Paid**:
  - Actual fundraising (only pay if you raise money)
  - Premium placement
  - Advanced features

---

### Revenue Projections (Year 1)

**Assumptions**:
- 200 campaigns launched (conservative)
- Average campaign size: 5,000 BGN
- Success rate: 60% (industry standard)
- Platform fee: 5% average

**Calculation**:
- Total funds raised: 200 campaigns × 5,000 BGN × 60% success = 600,000 BGN
- Platform revenue: 600,000 BGN × 5% = **30,000 BGN**
- Payment processing markup: 600,000 BGN × 0.2% = **1,200 BGN**
- Premium features: 50 campaigns × 100 BGN = **5,000 BGN**
- **Total Year 1 Revenue: ~36,000 BGN**

**Year 2** (scaling):
- 1,000 campaigns, 70% success rate, 7,000 BGN average
- Total raised: 4,900,000 BGN
- Platform revenue: **245,000 BGN**

**Year 3** (maturity):
- 5,000 campaigns, 75% success rate, 8,000 BGN average
- Total raised: 30,000,000 BGN
- Platform revenue: **1,500,000 BGN**

---

### Cost Structure

#### Fixed Costs (Annual)
- **Infrastructure**: 20,000 BGN (AWS, Stripe, CDN, monitoring)
- **Salaries**: 120,000 BGN (2 devs, 1 designer, 1 community manager)
- **Legal & Compliance**: 10,000 BGN (lawyer retainer, audits)
- **Marketing**: 30,000 BGN (ads, PR, events)
- **Total Fixed**: **180,000 BGN**

#### Variable Costs (Per Campaign)
- **Moderation**: 20 BGN/campaign (manual review for large campaigns)
- **Support**: 10 BGN/campaign (average customer service time)
- **Payment processing**: ~3% (Stripe fees, passed to creator but platform absorbs fraud losses)

#### Break-Even Analysis
- **Year 1**: Revenue 36k BGN, Costs 180k BGN → **Loss: 144k BGN** (expected, seed funded)
- **Year 2**: Revenue 245k BGN, Costs 220k BGN → **Break-even**
- **Year 3**: Revenue 1.5M BGN, Costs 400k BGN → **Profit: 1.1M BGN**

---

## 8.7 ABUSE PREVENTION

### Fraud Types & Countermeasures

#### Fraud Type 1: Fake Campaigns (Scams)
**Description**: Creator launches campaign with no intent to deliver. Collects funds and disappears.

**Red Flags**:
- New account with no profile history
- Unrealistic goals (e.g., "Hollywood film for 5,000 BGN")
- Stock photos (reverse image search matches)
- Generic descriptions (copy-pasted from other campaigns)
- No social media presence

**Prevention**:
1. **Identity verification**: Require ID for campaigns > 10,000 BGN
2. **Social proof**: Show if artist has past campaigns, events, job history
3. **Moderation**: Manual review for first-time creators > 5,000 BGN
4. **Algorithmic scoring**: ML model flags suspicious campaigns (low profile completeness, unusual language)

**Mitigation**:
- Escrow (funds not released until milestones)
- Refund guarantee (platform's reserve fund)
- Ban creator, report to authorities if fraud confirmed

---

#### Fraud Type 2: Self-Pledging (Fake Backers)
**Description**: Creator pledges to own campaign using multiple accounts/cards to fake momentum.

**Red Flags**:
- Multiple pledges from same IP address
- Cards with similar billing addresses
- Pledges immediately after campaign launch (no organic discovery)
- Unusual pledge amounts (e.g., all 37 BGN)

**Prevention**:
1. **IP tracking**: Flag multiple pledges from same IP
2. **Payment fingerprinting**: Stripe detects card reuse, shared billing info
3. **Velocity checks**: Too many pledges too fast = suspicious
4. **Manual review**: If 30%+ of pledges flagged, hold campaign

**Mitigation**:
- Cancel fraudulent pledges
- Refund to legitimate backers
- Ban creator
- Publish case (transparency report)

---

#### Fraud Type 3: Backer Collusion (Coordinated Chargebacks)
**Description**: Group of backers pledge, campaign succeeds, then all initiate chargebacks (stealing funds).

**Red Flags**:
- Multiple chargebacks from same campaign (>5%)
- Chargebacks initiated on same day
- Backers have history of chargebacks on other platforms (if data shared)

**Prevention**:
1. **Payout delay**: Hold funds 14 days (standard chargeback window)
2. **Reputation check**: Flag backers with chargeback history (Stripe Radar)
3. **3D Secure**: Require SMS verification for pledges > 500 BGN

**Mitigation**:
- Investigate (contact backers, request proof of fraud)
- If legitimate dispute: refund
- If coordinated fraud: ban all accounts, report to Stripe + authorities
- Platform absorbs loss (via reserve fund)

---

#### Fraud Type 4: Reward Manipulation
**Description**: Artist promises rewards, delivers inferior or nothing. Backers can't get refunds because "project completed."

**Red Flags**:
- High volume of backer complaints
- No proof of reward fulfillment (no tracking numbers, download links)
- Artist stops responding after funds received

**Prevention**:
1. **Reward tracking**: Artist must mark rewards as fulfilled (with proof)
2. **Backer confirmation**: Backer confirms receipt (or reports non-delivery)
3. **Withholding**: If >10% of backers report non-delivery, freeze final payout

**Mitigation**:
- Force artist to fulfill or refund
- If artist unresponsive: platform refunds from withheld funds
- Artist banned, reputation destroyed

---

#### Fraud Type 5: Money Laundering
**Description**: Criminal uses platform to launder money (self-pledge large amounts, withdraw "clean" funds).

**Red Flags**:
- Single backer pledges entire campaign goal (e.g., 50,000 BGN)
- Backer and creator have same IP/location
- Unusual withdrawal patterns (immediate cash-out)

**Prevention**:
1. **AML compliance**: KYC for campaigns > 50,000 BGN
2. **Suspicious activity monitoring**: Automated alerts for unusual patterns
3. **Manual review**: High-value single pledges reviewed by compliance team

**Mitigation**:
- Freeze funds, investigate
- Report to Financial Intelligence Directorate (FID) if suspected laundering
- Refund backer, ban creator

---

#### Fraud Type 6: Reputation Manipulation
**Description**: Artist creates fake accounts to leave positive reviews, inflate reputation score.

**Red Flags**:
- Multiple reviews from new accounts (no pledge history)
- Reviews posted same day
- Generic language ("Great artist!")
- Reviewers have no social media, no other activity

**Prevention**:
1. **Verified reviewers only**: Only backers/collaborators can review
2. **Review velocity**: Flag if 10+ reviews in 24 hours
3. **Sockpuppet detection**: ML model detects writing style similarity, IP overlap

**Mitigation**:
- Delete fake reviews
- Penalize reputation score
- Ban creator if repeated abuse

---

#### Fraud Type 7: Campaign Cloning (Copycat Scams)
**Description**: Scammer copies legitimate campaign (text, images, video), launches duplicate to steal funds.

**Red Flags**:
- Identical or near-identical campaign descriptions
- Reused images (reverse image search)
- Different creator account

**Prevention**:
1. **Duplicate detection**: Hash campaign content, flag matches
2. **Image fingerprinting**: Detect reused images
3. **Manual review**: If duplicate detected, hold both campaigns, contact creators

**Mitigation**:
- Verify original creator (via email, social media)
- Shut down clone campaign
- Ban scammer
- Alert backers of original campaign

---

### Abuse Prevention Infrastructure

#### Technical Safeguards
1. **Machine Learning Models**:
   - Fraud scoring (campaign launch, backer behavior)
   - Duplicate detection (text, images)
   - Chargeback prediction (flag high-risk backers)

2. **Manual Review Queue**:
   - Flagged campaigns reviewed by humans (24-48 hours)
   - Escalation process (junior reviewer → senior → legal)

3. **Reputation System**:
   - Multi-dimensional (not just star ratings)
   - Decay over time (old bad behavior matters less)
   - Public dispute history (for high-value transactions)

#### Process Safeguards
1. **Escrow & Payouts**:
   - Milestone-based releases (not lump sum)
   - Withholding reserve (5-10% until project complete)
   - Refund guarantee (platform reserve fund: 2% of transaction volume)

2. **Community Moderation**:
   - User reporting (flag campaigns, reviews, profiles)
   - Community jury (for disputes)
   - Transparency reports (quarterly, published publicly)

3. **Legal Compliance**:
   - AML/KYC (for high-value transactions)
   - NRA reporting (annual tax data)
   - GDPR (data privacy, deletion requests)

---

## 8.8 TECHNICAL IMPLEMENTATION NOTES

### Tech Stack (Recommended)

#### Backend
- **Framework**: Node.js + Express (or Python + Django)
- **Database**: PostgreSQL (relational data: users, campaigns, pledges)
- **Cache**: Redis (session management, real-time leaderboards)
- **Search**: Elasticsearch (campaign discovery, full-text search)
- **File Storage**: AWS S3 (campaign images, videos, receipts)

#### Frontend
- **Framework**: React (already in use for vouchers app)
- **State Management**: Redux or Zustand
- **Styling**: Tailwind CSS (consistent with current design)
- **Forms**: React Hook Form + Zod validation

#### Payments
- **Provider**: Stripe Connect (marketplace escrow, multi-party payouts)
- **Webhooks**: Stripe events → backend (payment captured, refund issued, etc.)
- **Invoicing**: Stripe invoicing or custom PDF generation (for NRA compliance)

#### Infrastructure
- **Hosting**: AWS (EC2, RDS, S3, CloudFront CDN)
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry (error tracking), Datadog (performance)
- **Email**: SendGrid or Postmark (transactional emails)

#### Security
- **Auth**: Auth0 or custom JWT (with refresh tokens)
- **Encryption**: TLS 1.3, bcrypt for passwords, AES-256 for PII
- **Fraud Detection**: Stripe Radar + custom ML models (TensorFlow or scikit-learn)

---

### Key Database Entities

```typescript
// Simplified schema (expand per requirements)

User {
  id: UUID
  email: string
  name: string
  type: 'artist' | 'backer' | 'sponsor' | 'venue' | 'org'
  verified: boolean
  reputation_score: float
  created_at: timestamp
}

Campaign {
  id: UUID
  creator_id: UUID (FK → User)
  title: string
  description: text
  category: enum
  funding_mode: 'all_or_nothing' | 'flexible' | 'pre_sale' | 'patronage'
  goal_amount: decimal
  raised_amount: decimal
  deadline: timestamp
  status: 'draft' | 'active' | 'successful' | 'failed' | 'canceled'
  created_at: timestamp
}

Pledge {
  id: UUID
  campaign_id: UUID (FK → Campaign)
  backer_id: UUID (FK → User)
  amount: decimal
  reward_tier_id: UUID (nullable)
  status: 'pending' | 'captured' | 'refunded' | 'chargeback'
  stripe_payment_intent_id: string
  created_at: timestamp
}

Reward {
  id: UUID
  campaign_id: UUID (FK → Campaign)
  title: string
  description: text
  price: decimal
  quantity_available: int (nullable, for limited rewards)
  delivery_date: date
  fulfillment_status: 'not_shipped' | 'shipped' | 'delivered'
}

Update {
  id: UUID
  campaign_id: UUID (FK → Campaign)
  content: text
  media_urls: array<string>
  created_at: timestamp
}

Dispute {
  id: UUID
  campaign_id: UUID (FK → Campaign)
  reporter_id: UUID (FK → User)
  reason: text
  status: 'open' | 'under_review' | 'resolved' | 'escalated'
  resolution: text (nullable)
  created_at: timestamp
}
```

---

### API Endpoints (Crowdfunding Module)

```
POST   /campaigns                    # Create new campaign
GET    /campaigns/:id                # Get campaign details
PUT    /campaigns/:id                # Update campaign (creator only)
DELETE /campaigns/:id                # Cancel campaign (creator only)

POST   /campaigns/:id/pledge         # Back a campaign
GET    /campaigns/:id/pledges        # List all pledges (public)
POST   /pledges/:id/cancel           # Cancel pledge (before campaign ends)

POST   /campaigns/:id/updates        # Post campaign update (creator only)
GET    /campaigns/:id/updates        # Get all updates

POST   /campaigns/:id/report         # Report campaign (abuse)
GET    /campaigns/:id/disputes       # Get disputes (moderators only)

GET    /users/:id/campaigns          # Get user's campaigns
GET    /users/:id/pledges            # Get user's pledges

POST   /rewards                      # Add reward tier (during campaign creation)
PUT    /rewards/:id/fulfill          # Mark reward as fulfilled (creator)

POST   /refunds                      # Request refund (backer or auto-triggered)
```

---

### Stripe Integration Flow

#### Campaign Pledge Flow
1. **Backer initiates pledge**:
   - Frontend: Stripe Checkout (embeddable form)
   - Backend: Create Stripe PaymentIntent (amount, metadata: campaign_id, backer_id)

2. **Payment authorization**:
   - If all-or-nothing: authorize only (don't capture)
   - If flexible: capture immediately

3. **Webhook: payment_intent.succeeded**:
   - Backend: Update pledge status to 'captured'
   - Update campaign raised_amount
   - Send confirmation email to backer

4. **Campaign ends successfully**:
   - Backend: Capture all authorized payments (for all-or-nothing)
   - Transfer funds to creator's Stripe Connect account (minus platform fee)

5. **Campaign fails**:
   - Backend: Cancel all authorized payments
   - Send failure email to backers

#### Payout Flow (Stripe Connect)
1. **Creator onboarding**:
   - Stripe Connect Express account (simplified onboarding)
   - KYC: Stripe verifies identity

2. **Transfer funds**:
   - Use Stripe Transfers API
   - Transfer 95% to creator (5% platform fee withheld)
   - Metadata: campaign_id, transfer_type: 'milestone_1'

3. **Creator withdraws**:
   - Stripe auto-disburses to creator's bank (daily or weekly)

---

## 8.9 SUCCESS METRICS (KPIs)

### Campaign-Level Metrics
- **Success rate**: % of campaigns that meet goal
  - Target MVP: 50%, Target Year 2: 65%
- **Average campaign size**: BGN raised per campaign
  - Target MVP: 3,000 BGN, Target Year 2: 7,000 BGN
- **Average backers per campaign**:
  - Target MVP: 30, Target Year 2: 60
- **Overfunding rate**: % of campaigns that exceed goal
  - Target MVP: 20%, Target Year 2: 30%

### Platform-Level Metrics
- **Total funds raised**: Cumulative BGN
  - Target Year 1: 500,000 BGN, Target Year 2: 5M BGN
- **Active campaigns**: Live campaigns at any time
  - Target MVP: 20, Target Year 2: 150
- **Repeat creator rate**: % of creators who launch 2+ campaigns
  - Target Year 2: 25%
- **Backer retention**: % of backers who support multiple campaigns
  - Target Year 2: 40%

### Financial Metrics (Platform)
- **Revenue**: Platform fees + premium features
  - Target Year 1: 35,000 BGN, Target Year 2: 250,000 BGN
- **Chargeback rate**: % of transactions disputed
  - Target: < 1% (industry standard)
- **Fraud loss rate**: % of revenue lost to fraud
  - Target: < 0.5%

### Qualitative Metrics
- **Creator satisfaction**: Survey score (1-10)
  - Target: 8+
- **Backer trust**: % of backers who would back again
  - Target: 75%+
- **Project completion rate**: % of funded campaigns that deliver
  - Target: 85%+ (industry benchmarks: 75-90%)

---

## 8.10 COMPETITIVE ANALYSIS

### International Platforms
| Platform       | Strengths                                      | Weaknesses (for Bulgaria)                |
|----------------|------------------------------------------------|------------------------------------------|
| Kickstarter    | Huge audience, credibility, proven model       | US-focused, no BGN support, high fees    |
| Indiegogo      | Flexible funding, global reach                 | Generic (not culture-specific)           |
| Patreon        | Recurring support, creator-first               | Not for one-off projects                 |
| GoFundMe       | Easy to use, wide appeal                       | Charity-focused, not art/culture         |

### Bulgarian Context
- **No dominant local crowdfunding platform** (as of 2026)
- Existing options: Kickstarter (artists use but face currency/payment hurdles), Facebook fundraisers (informal, no escrow)
- **Opportunity**: First mover advantage in Bulgaria's cultural sector

### Competitive Advantages of hub.7arts.bg
1. **Local**: BGN currency, Bulgarian language, NRA compliance
2. **Culture-specific**: Designed for artists, not generic causes
3. **Integrated**: Part of full cultural platform (events, jobs, map, profiles)
4. **Trust**: Reputation system, escrow, transparency
5. **Support**: Local customer service, artist education, grant integration

---

## 8.11 GO-TO-MARKET STRATEGY

### Phase 1: Beta (Months 1-3)
**Goal**: Test with 20 hand-picked campaigns.

**Selection criteria**:
- Established artists (reputation buffer)
- Diverse genres (theater, music, film, visual arts)
- Realistic budgets (2,000-10,000 BGN)

**Support**:
- Free campaign setup (white-glove service)
- Fee waived (0% platform fee for beta)
- Direct mentorship (campaign strategy, promotion)

**Learnings**:
- Which campaign types succeed
- Common creator mistakes (unclear descriptions, unrealistic goals)
- Backer behavior (pledge amounts, reward preferences)
- Technical bugs

---

### Phase 2: Public Launch (Month 4)
**Marketing**:
- **PR**: Press release, interviews (Kultura, Trud, Dnevnik)
- **Social media**: Campaign videos, creator testimonials
- **Events**: Launch party (invite artists, backers, press)
- **Partnerships**: National Culture Fund, Sofia Municipality (endorsements)

**Incentives**:
- First 100 campaigns: 3% fee (discounted from 5%)
- Backer rewards: First 1,000 backers entered in raffle (prize: tickets to major cultural event)

**Content**:
- Success stories (blog posts, videos)
- How-to guides ("Launch Your First Campaign in 10 Minutes")
- Webinars (monthly, with successful creators)

---

### Phase 3: Scale (Months 5-12)
**Tactics**:
- **Referral program**: Creators get 50 BGN credit if referred campaign succeeds
- **Influencer partnerships**: Established artists promote platform
- **SEO**: Optimize for "как да финансирам проект" (how to fund a project)
- **Paid ads**: Facebook, Instagram (target: artists, cultural audiences)

**Expansion**:
- Corporate sponsors (onboard 10 companies)
- Grant bodies (integrate 3 grant programs)
- Regional push (events in Plovdiv, Varna, Burgas)

---

## 8.12 RISKS & MITIGATIONS

| Risk                                      | Impact | Probability | Mitigation                                  |
|-------------------------------------------|--------|-------------|---------------------------------------------|
| Low adoption (artists don't trust platform) | High   | Medium      | Beta with known artists, transparency, PR   |
| High fraud rate (scams damage reputation)  | High   | Medium      | Robust KYC, escrow, manual review           |
| Regulatory crackdown (Bulgaria bans crowdfunding) | High   | Low         | Monitor laws, lobby, compliance-first       |
| Payment processor shuts down (Stripe exits Bulgaria) | High   | Low         | Backup: PayPal, local banks                 |
| Competition (Kickstarter localizes)        | Medium | Medium      | First-mover advantage, integration, culture |
| Economic downturn (backers have less money) | Medium | Medium      | Diversify (corporate sponsors, grants)      |
| Platform costs exceed revenue (burn cash)  | High   | Medium      | Control costs, raise funding, adjust fees   |

---

## CONCLUSION

The **Funding & Crowdfunding module** is the beating heart of hub.7arts.bg. It is:
- **Financially critical**: Primary revenue driver (50%+ of platform income)
- **Strategically essential**: Decentralizes cultural funding, reduces dependency on institutions
- **Category-defining**: First local, culture-specific, transparent crowdfunding platform in Bulgaria

**Success depends on**:
1. **Trust**: Escrow, transparency, reputation, moderation
2. **Speed**: Faster than grant applications, simpler than sponsorships
3. **Flexibility**: Multiple funding modes (crowdfunding, pre-sales, patronage, grants, corporate)
4. **Community**: Artists and backers feel ownership, not just transactions

**Next steps**:
1. Build MVP (campaign creation, pledges, escrow, basic moderation)
2. Recruit 20 beta campaigns (established artists, diverse genres)
3. Launch publicly (PR, partnerships, incentives)
4. Iterate based on data (success rates, friction points, fraud attempts)
5. Scale (corporate sponsors, grant integration, regional expansion)

This is not just a crowdfunding platform.
This is the **financial operating system for Bulgarian culture**.

---

*End of Deep Dive: Funding & Crowdfunding Module*
