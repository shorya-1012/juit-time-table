# Contributing to JUIT Timetable

Thanks for considering contributing to the **JUIT Timetable** project!
Whether you're fixing a bug, adding a feature, or improving the UI — you're welcome here.

---

## Project Setup

```bash
# 1. Clone the repo
git clone https://github.com/SurajKharkwal/juit-timetable.git
cd juit-timetable

# 2. Install dependencies
bun install

# 3. Start the dev server
bun run dev
```

### Environment Setup

Check the `.env.example` file and create your own `.env` with the required variables.

---

### Branch Naming

Use meaningful branch names:

- `fix/minor-bug`
- `feat/drawer-ui`
- `refactor/timetable-cleanup`

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `refactor:` — Code refactoring (no behavior change)
- `chore:` — Tooling or dependency updates
---

## ✅ Pull Request Checklist

Before submitting a pull request:

- [ ] Code builds without errors.
- [ ] You've tested the feature manually.
- [ ] UI changes include screenshots/GIFs (if applicable).
- [ ] PR title and description are clear and concise.
- [ ] Linked any related issues (e.g., `Fixes #123`).

---

## Folder Structure (Brief)

```
components/        # UI components
hooks/             # Custom React hooks
lib/               # Utilities & helpers
config/            # Static data like electives
app/               # Route handlers (Next.js App Dir)
```

---

## Tips for Contributors

- Use [Hero UI](https://www.heroui.com/) components when adding new UI.
- Follow Tailwind CSS conventions for styling.
- Keep business logic separate from UI where possible.
- Unsure about something? Open a draft PR or ask in Discussions!

---

Thanks for making this project better!
