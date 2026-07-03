# Product Requirements Document (PRD)
## Kan - Open-Source Project Management Tool

**Version**: 1.0
**Date**: 2026-07-02
**Status**: Active Development

---

## 1. Product Overview

**Kan** is an open-source project management tool and a Trello alternative built with modern web technologies. It provides kanban-style board management for teams and individuals, with a focus on simplicity, collaboration, and extensibility.

### 1.1 Vision

To provide a self-hostable, feature-rich alternative to Trello that gives teams full control over their project data while delivering a seamless, modern user experience.

### 1.2 Target Users

- Small to medium-sized development teams
- Project managers and product teams
- Open-source enthusiasts who prefer self-hosted solutions
- Teams migrating from Trello seeking more control

### 1.3 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| API | tRPC, Node.js |
| Database | PostgreSQL with Drizzle ORM |
| Auth | Better Auth |
| i18n | Lingui |
| Monorepo | pnpm workspaces with Turbo |
| Email | React Email |
| Storage | S3-compatible (AWS S3, Cloudflare R2, MinIO) |

---

## 2. Core Features

### 2.1 Workspace Management

**Description**: Multi-workspace support allowing users to organize projects into separate workspaces.

**Database**: `workspace` table

| Feature | Details |
|---------|---------|
| Create workspace | Users can create multiple workspaces |
| Workspace slug | Custom URL-friendly identifiers (e.g., `/my-team`) |
| Workspace description | Optional description field |
| Workspace plans | `free`, `team`, `pro`, `enterprise` |
| Card prefix | Customizable prefix for card numbering (e.g., `PROJ-`) |
| Card counter | Auto-incrementing card numbers per workspace |
| Week start day | Configurable first day of the week (0-6) |
| Email visibility | Toggle showing member emails to other members |

### 2.2 Board Management

**Description**: Kanban boards for organizing tasks within workspaces.

**Database**: `board` table

| Feature | Details |
|---------|---------|
| Board creation | Create boards within workspaces |
| Board visibility | `private` or `public` |
| Board types | `regular` or `template` |
| Board slug | Custom URL slugs per workspace |
| Board description | Rich text description |
| Board archive | Archive boards without deleting |
| Board favorites | Star/favorite boards for quick access |
| Move board | Move boards between workspaces |
| Board templates | Create reusable board templates |

### 2.3 List Management

**Description**: Lists (columns) within boards for organizing cards by stage.

**Database**: `list` table

| Feature | Details |
|---------|---------|
| List creation | Add lists to boards |
| List reordering | Drag-and-drop list reordering |
| List deletion | Soft delete with confirmation |
| Sequential indexing | Maintains ordered positions |

### 2.4 Card Management

**Description**: Cards are the core work items representing tasks, ideas, or issues.

**Database**: `card` table

| Feature | Details |
|---------|---------|
| Card creation | Create cards in any list |
| Card title | Required title field |
| Card description | Rich text editor with formatting |
| Card number | Auto-incrementing number per workspace |
| Card reordering | Drag-and-drop within and across lists |
| Card movement | Move cards between lists with activity tracking |
| Due dates | Set and track due dates |
| Card archiving | Archive completed cards |
| Card duplication | Duplicate cards with all properties |
| Card deletion | Soft delete with confirmation |

### 2.5 Labels

**Description**: Color-coded labels for categorizing and filtering cards.

**Database**: `label` table, `_card_labels` junction table

| Feature | Details |
|---------|---------|
| Label creation | Create labels per board |
| Color coding | Custom color codes |
| Label assignment | Assign multiple labels to cards |
| Label filtering | Filter cards by labels |

### 2.6 Members & Assignment

**Description**: Assign workspace members to cards for task ownership.

**Database**: `_card_workspace_members` junction table

| Feature | Details |
|---------|---------|
| Member assignment | Assign multiple members to cards |
| Member filtering | Filter cards by assigned members |
| Member management | Add/remove workspace members |

### 2.7 Checklists

**Description**: Sub-task checklists within cards.

**Database**: `card_checklist`, `card_checklist_item` tables

| Feature | Details |
|---------|---------|
| Multiple checklists | Add multiple checklists per card |
| Checklist items | Add items with titles |
| Item completion | Toggle item completion status |
| Progress tracking | Visual progress indicators (circular progress) |
| Reordering | Drag-and-drop item reordering |

### 2.8 Comments

**Description**: Discussion threads on cards for team collaboration.

**Database**: `card_comments` table

| Feature | Details |
|---------|---------|
| Add comments | Post comments on cards |
| Edit comments | Edit your own comments |
| Delete comments | Delete comments with confirmation |
| Activity tracking | All comment changes logged |

### 2.9 Attachments

**Description**: File attachments on cards stored via S3-compatible storage.

**Database**: `card_attachment` table

| Feature | Details |
|---------|---------|
| File upload | Upload files to cards |
| Thumbnail previews | Image thumbnail generation |
| Multiple files | Multiple attachments per card |
| File metadata | Track filename, size, content type |
| Soft delete | Archive attachments without hard delete |

### 2.10 Activity Log

**Description**: Comprehensive activity tracking for all card changes.

**Database**: `card_activity` table

**Tracked Activities**:
- Card created, archived
- Title, description updated
- List movement (from/to)
- Label added/removed
- Member added/removed
- Comment added/updated/deleted
- Checklist added/renamed/deleted
- Checklist item added/updated/completed/uncompleted/deleted
- Attachment added/removed
- Due date added/updated/removed

### 2.11 Board Filters

**Description**: Filter cards across a board to find specific items quickly.

**Filter Types**:
- **By members**: Filter by assigned members
- **By labels**: Filter by label assignments
- **By lists**: Filter by list membership
- **By due date**: Filter by semantic date ranges:
  - Overdue
  - Due today
  - Due tomorrow
  - Due next week
  - Due next month
  - No due date

### 2.12 Templates

**Description**: Reusable board templates for common workflows.

| Feature | Details |
|---------|---------|
| Template boards | Create boards of type `template` |
| Template listing | Browse available templates |
| Create from template | Create new boards from templates |
| Template cards | Cards within templates are preserved |

---

## 3. Collaboration Features

### 3.1 Member Management

**Database**: `workspace_members` table

| Feature | Details |
|---------|---------|
| Invite by email | Send email invitations to new members |
| Invite links | Generate shareable invite links with optional expiry |
| Member roles | `admin`, `member`, `guest` |
| Member status | `invited`, `active`, `removed`, `paused` |
| Remove members | Remove members from workspace |
| Edit permissions | Modify member roles and permissions |

### 3.2 Role-Based Access Control (RBAC)

**Database**: `workspace_roles`, `workspace_role_permissions`, `workspace_member_permissions` tables

| Feature | Details |
|---------|---------|
| System roles | Built-in admin/member/guest roles |
| Custom roles | Create custom roles with specific permissions |
| Role hierarchy | Hierarchical permission levels |
| Per-member overrides | Override role permissions for individual members |
| Granular permissions | Fine-grained permission control |

### 3.3 Notifications

**Database**: `notification` table

| Notification Type | Trigger |
|------------------|---------|
| `mention` | When a user is mentioned in a comment |
| `workspace.member.added` | When a new member joins the workspace |
| `workspace.member.removed` | When a member is removed from the workspace |
| `workspace.role.changed` | When a member's role is changed |

| Feature | Details |
|---------|---------|
| Read tracking | Track read/unread status |
| Soft delete | Archive notifications |

### 3.4 Public Boards

| Feature | Details |
|---------|---------|
| Public visibility | Make boards publicly accessible |
| Public board view | View public boards without authentication |
| Public card view | View individual cards on public boards |

---

## 4. Authentication & Security

### 4.1 Authentication Methods

| Method | Details |
|--------|---------|
| Email + Password | Traditional credential-based login (optional) |
| Magic Link | Passwordless email-based authentication |
| OAuth Providers | Google, GitHub, Discord, GitLab, Microsoft, Twitter, Twitch, Apple, Spotify, TikTok, LinkedIn, Reddit, Roblox, Kick, Zoom, Dropbox, VK |
| Generic OIDC | Support for any OpenID Connect provider |
| API Keys | Programmatic access with API key authentication |

### 4.2 Security Features

| Feature | Details |
|---------|---------|
| Session management | Token-based sessions with expiry |
| IP tracking | Log IP addresses for sessions |
| User agent tracking | Log browser/client information |
| Rate limiting | API key rate limiting (100 req/min default) |
| Trusted origins | Configurable CORS origins |
| Email domain restriction | Restrict OIDC logins to specific email domains |

---

## 5. Integrations

### 5.1 Trello Import

**Database**: `import` table

| Feature | Details |
|---------|---------|
| Board import | Import boards from Trello |
| Full data import | Import lists, cards, labels, and members |
| Import tracking | Track import status (started/success/failed) |
| Import history | View past imports |

### 5.2 S3 Storage

| Feature | Details |
|---------|---------|
| AWS S3 | Native AWS S3 support |
| Cloudflare R2 | R2-compatible storage |
| MinIO | Self-hosted S3-compatible storage |
| Avatar uploads | User profile picture storage |
| Attachment storage | Card file attachment storage |
| Configurable limits | Custom upload size limits |

### 5.3 Email

| Feature | Details |
|---------|---------|
| SMTP support | Standard SMTP email sending |
| Magic link emails | Authentication magic link delivery |
| Invitation emails | Workspace invitation emails |
| React Email | Modern email templates |

### 5.4 Webhooks

**Database**: `workspace_webhooks` table

| Feature | Details |
|---------|---------|
| Webhook creation | Create webhooks per workspace |
| Event subscriptions | Subscribe to specific events |
| Webhook secrets | HMAC signature verification |
| Active/inactive toggle | Enable/disable webhooks |

**Supported Events**:
- `card.created`
- `card.updated`
- `card.moved`
- `card.deleted`

### 5.5 MCP Server (AI Control)

| Feature | Details |
|---------|---------|
| Model Context Protocol | AI client integration |
| 46 tools | Across 7 resource types |
| Natural language | Control Kan via AI assistants |
| Compatible clients | GitHub Copilot, Claude Desktop, Cursor, Codex |

---

## 6. User Interface

### 6.1 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with features, testimonials, pricing |
| `/login` | User login page |
| `/signup` | User registration page |
| `/boards` | Board listing page |
| `/boards/[...boardId]` | Individual board view |
| `/cards/[cardId]` | Individual card view |
| `/templates` | Template listing page |
| `/templates/[boardId]` | Template board view |
| `/[workspaceSlug]` | Workspace dashboard |
| `/[workspaceSlug]/[...boardSlug]` | Board by workspace slug |
| `/members` | Workspace member management |
| `/settings/account` | User account settings |
| `/settings/workspace` | Workspace settings |
| `/settings/billing` | Subscription billing settings |
| `/settings/permissions` | Role & permission management |
| `/settings/api` | API key management |
| `/settings/webhooks` | Webhook management |
| `/settings/integrations` | Integration settings (Trello) |
| `/settings/trello/authorize` | Trello OAuth authorization |
| `/invite/[code]` | Workspace invite link |
| `/onboarding/workspace` | New workspace onboarding |
| `/onboarding/select-plan` | Plan selection during onboarding |
| `/upgrade/select-plan` | Plan upgrade page |
| `/pricing` | Pricing page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/oss-friends` | Open-source friends page |
| `/partner/activate` | Partner license activation |
| `/unsubscribe` | Email unsubscribe |

### 6.2 UI Components

| Component | Description |
|-----------|-------------|
| `CommandPallette` | Global search (Ctrl+K) for boards and cards |
| `ThemeToggle` | Dark/light mode toggle |
| `FontSizeSelector` | Adjustable font size |
| `LanguageSelector` | Language/locale selector |
| `SideNavigation` | Workspace sidebar navigation |
| `WorkspaceMenu` | Workspace switcher |
| `UserMenu` | User profile dropdown |
| `Dashboard` | Main dashboard view |
| `Editor` | Rich text editor for card descriptions |
| `PlainTextEditor` | Plain text editor |
| `LabelForm` | Create/edit labels |
| `LabelIcon` | Colored label display |
| `FeedbackModal` | User feedback submission |
| `NewWorkspaceForm` | Create new workspace |
| `PatternedBackground` | Decorative board backgrounds |
| `CircularProgress` | Checklist progress indicator |
| `Badge` | Status/count badges |
| `Avatar` | User avatar display |
| `Tooltip` | Hover tooltips |
| `Popup` | Toast notifications |
| `Modal` | Dialog/modal system |
| `Dropdown` | Dropdown menus |
| `CheckboxDropdown` | Multi-select dropdown |
| `Button` | Button component |
| `Input` | Form input |
| `Toggle` | Toggle switch |
| `LoadingSpinner` | Loading indicator |
| `PageHead` | Page title/meta |
| `AuthForm` | Authentication form |
| `DateSelector` | Date picker |
| `YouTubeEmbed` | YouTube video embedding in cards |

### 6.3 Board View Features

| Feature | Description |
|---------|-------------|
| Drag & drop cards | Move cards between lists via drag-and-drop |
| Drag & drop lists | Reorder lists via drag-and-drop |
| Context menu | Right-click menu on cards for quick actions |
| Card context actions | Move, duplicate, edit labels, edit members, edit due date |
| Horizontal scroll | Drag-to-scroll for wide boards |
| Keyboard shortcuts | Keyboard shortcuts for common actions |
| Board dropdown | Board-level actions (settings, delete, move, visibility) |
| Visibility toggle | Quick toggle board public/private |
| Create from template | Create template boards |

### 6.4 Card Detail View

| Feature | Description |
|---------|-------------|
| Title editing | Inline title editing |
| Rich text description | Full-featured rich text editor |
| Label management | Add/remove labels |
| Member management | Add/remove assigned members |
| Due date picker | Set/change/remove due dates |
| List selector | Move card to different list |
| Checklists | Add/manage checklists and items |
| Comments | Add/edit/delete comments |
| Attachments | Upload/manage file attachments |
| Activity feed | View complete change history |
| Card archiving | Archive cards |
| Card deletion | Delete cards with confirmation |

---

## 7. Settings & Configuration

### 7.1 Account Settings

| Setting | Description |
|---------|-------------|
| Profile picture | Upload/change avatar |
| Display name | Update display name |
| Email | View email (read-only) |
| Language | Select interface language |
| Font size | Adjust UI font size |
| Change password | Update account password |
| Delete account | Permanently delete account |
| Create workspace | Create new workspace from settings |

### 7.2 Workspace Settings

| Setting | Description |
|---------|-------------|
| Workspace name | Update workspace name |
| Workspace description | Update description |
| Custom URL | Change workspace slug |
| Email visibility | Toggle showing emails to members |
| Week start day | Set first day of the week |
| Delete workspace | Permanently delete workspace |

### 7.3 Billing Settings

| Feature | Description |
|---------|-------------|
| Plan display | Show current subscription plan |
| Plan comparison | Compare plan features |
| Upgrade flow | Upgrade to Team/Pro plans |
| Stripe integration | Secure payment processing |

### 7.4 Permission Settings

| Feature | Description |
|---------|-------------|
| Role management | Create/edit/delete custom roles |
| Permission matrix | View/edit permission assignments |
| Member role assignment | Assign roles to members |
| Custom permission overrides | Per-member permission overrides |
| Clear custom permissions | Reset to role defaults |

---

## 8. Internationalization (i18n)

### 8.1 Supported Languages

| Code | Language |
|------|----------|
| `en` | English |
| `fr` | Francais |
| `de` | Deutsch |
| `es` | Espanol |
| `it` | Italiano |
| `nl` | Nederlands |
| `ru` | Russkiy |
| `pl` | Polski |
| `ptbr` | Portugues (BR) |

### 8.2 Implementation

- All user-facing strings use Lingui `t` template literals
- Locale files in `apps/web/src/locales/`
- Extract new strings with `pnpm lingui:extract`

---

## 9. Theming & Accessibility

### 9.1 Theme Support

| Theme | Description |
|-------|-------------|
| Light mode | Default light theme |
| Dark mode | Full dark theme with dark backgrounds |
| System preference | Follows OS theme setting |

### 9.2 Accessibility Features

| Feature | Description |
|---------|-------------|
| Font size selector | Adjustable font sizes |
| Keyboard navigation | Keyboard shortcuts for common actions |
| ARIA labels | Proper ARIA labeling on interactive elements |
| Focus management | Focus trapping in modals |

---

## 10. Data Model

### 10.1 Entity Relationship Overview

```
User
 ├── Workspace (createdBy)
 ├── WorkspaceMember
 │    ├── Workspace
 │    ├── WorkspaceRole
 │    └── WorkspaceMemberPermission
 ├── Board (createdBy)
 │    ├── List
 │    │    └── Card
 │    │         ├── CardLabel (many-to-many)
 │    │         ├── CardMember (many-to-many)
 │    │         ├── Comment
 │    │         ├── Checklist
 │    │         │    └── ChecklistItem
 │    │         ├── Attachment
 │    │         └── CardActivity
 │    ├── Label
 │    └── UserBoardFavorite
 ├── WorkspaceInviteLink
 ├── Integration
 ├── ApiKey
 ├── Webhook
 ├── Notification
 ├── Import
 └── Feedback

Workspace
 ├── WorkspaceMember
 ├── WorkspaceRole
 │    └── WorkspaceRolePermission
 ├── Board
 ├── Subscription
 ├── Webhook
 └── InviteLink
```

### 10.2 Key Design Patterns

| Pattern | Implementation |
|---------|---------------|
| Soft deletes | `deletedAt` timestamp on all major entities |
| Public IDs | 12-character `publicId` for all external-facing entities |
| Internal IDs | Never exposed externally; use `publicId` for API/URLs |
| Sequential indexing | Cards and lists maintain ordered `index` fields |
| Activity logging | All card mutations create activity records |
| Row-level security | RLS enabled on all tables |

---

## 11. API Architecture

### 11.1 tRPC Routers

| Router | File | Key Operations |
|--------|------|----------------|
| `workspace` | `workspace.ts` | CRUD, slug management, settings |
| `board` | `board.ts` | CRUD, visibility, favorites, archive, move |
| `list` | `list.ts` | CRUD, reordering |
| `card` | `card.ts` | CRUD, movement, labels, members, due dates |
| `label` | `label.ts` | CRUD for board labels |
| `checklist` | `checklist.ts` | CRUD for checklists and items |
| `member` | `member.ts` | Invite, remove, update roles |
| `permission` | `permission.ts` | Role and permission management |
| `user` | `user.ts` | User profile, account management |
| `attachment` | `attachment.ts` | Upload, download, delete |
| `feedback` | `feedback.ts` | Submit user feedback |
| `import` | `import.ts` | Trello board import |
| `integration` | `integration.ts` | Trello OAuth integration |
| `webhook` | `webhook.ts` | Webhook CRUD |
| `health` | `health.ts` | Health check endpoint |

### 11.2 Authentication Flow

- `protectedProcedure` for authenticated endpoints
- `publicProcedure` for public endpoints
- `assertUserInWorkspace` for workspace authorization
- Zod validation on all inputs
- TRPCError with appropriate HTTP codes

---

## 12. Deployment

### 12.1 Deployment Options

| Method | Description |
|--------|-------------|
| Railway | One-click deploy via Railway template |
| Docker Compose | Self-hosted with PostgreSQL |
| Vercel | Next.js deployment (requires external DB) |
| Local development | `pnpm dev` for development |

### 12.2 Environment Requirements

| Requirement | Details |
|-------------|---------|
| Node.js | 18+ |
| PostgreSQL | 15+ |
| Redis | Optional (for rate limiting) |
| S3 Storage | Optional (for file uploads) |
| SMTP Server | Optional (for email features) |

---

## 13. Pricing (Cloud)

### 13.1 Plan Tiers

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | Basic features, limited members |
| Team | Monthly/Yearly | More members, priority support |
| Pro | Monthly/Yearly | Unlimited seats, advanced features |
| Enterprise | Custom | Custom deployment, SLA |

### 13.2 Billing Features

| Feature | Description |
|---------|-------------|
| Stripe integration | Secure payment processing |
| Subscription management | Monthly/yearly billing |
| Free trial | 14-day trial for Team and Pro plans |
| Seat management | Per-seat billing for Team plan |
| Unlimited seats | Included in Pro plan |
| Promo codes | Support for promotion codes |
| Webhook events | Trial start/end/expired, subscription changes |

---

## 14. Security Considerations

| Area | Implementation |
|------|---------------|
| Authentication | Better Auth with session management |
| Authorization | Role-based access control |
| Data isolation | Workspace-scoped data access |
| Input validation | Zod schema validation on all inputs |
| SQL injection | Drizzle ORM parameterized queries |
| XSS prevention | React's built-in XSS protection |
| CSRF protection | Better Auth CSRF tokens |
| Rate limiting | Configurable API rate limiting |
| Soft deletes | No hard deletes on user data |
| Row-level security | PostgreSQL RLS on all tables |
| Secrets management | Environment variable configuration |

---

## 15. Future Roadmap (Planned)

| Feature | Status |
|---------|--------|
| Integrations | Coming soon |
| More board views (Timeline, Calendar, Table) | Planned |
| Advanced search | Planned |
| Custom fields | Planned |
| Automation rules | Planned |
| More OAuth providers | In progress |
| Mobile apps | Planned |
| API v2 | Planned |
