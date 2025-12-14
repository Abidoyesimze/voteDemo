# Commit Organization Guide

This guide shows how to organize the improvements into 20-30 logical commits.

## Suggested Commit Structure

### 1. Configuration & Code Quality (Commits 1-5)

**Commit 1: Add Prettier configuration**
```bash
git add frontend/.prettierrc.json frontend/.prettierignore
git commit -m "chore(frontend): add Prettier configuration for code formatting"
```

**Commit 2: Add ESLint ignore file**
```bash
git add frontend/.eslintignore
git commit -m "chore(frontend): add ESLint ignore patterns"
```

**Commit 3: Add EditorConfig**
```bash
git add .editorconfig
git commit -m "chore: add EditorConfig for consistent code style"
```

**Commit 4: Update package.json with formatting scripts**
```bash
git add frontend/package.json
git commit -m "chore(frontend): add format and lint scripts to package.json"
```

**Commit 5: Add VS Code settings**
```bash
git add .vscode/
git commit -m "chore: add VS Code workspace settings and recommended extensions"
```

### 2. Testing Infrastructure (Commits 6-9)

**Commit 6: Add Jest configuration**
```bash
git add frontend/jest.config.js frontend/jest.setup.js
git commit -m "test(frontend): add Jest configuration and setup"
```

**Commit 7: Add test dependencies**
```bash
git add frontend/package.json
git commit -m "chore(frontend): add testing dependencies (Jest, React Testing Library)"
```

**Commit 8: Add coverage configuration**
```bash
git add frontend/coverage/.gitkeep
git commit -m "chore(frontend): add coverage directory"
```

**Commit 9: Add Node version files**
```bash
git add frontend/.nvmrc smartcontract/.nvmrc
git commit -m "chore: add .nvmrc files for consistent Node.js version"
```

### 3. Documentation (Commits 10-14)

**Commit 10: Add comprehensive README**
```bash
git add README.md
git commit -m "docs: add comprehensive README with setup and usage instructions"
```

**Commit 11: Add CONTRIBUTING guide**
```bash
git add CONTRIBUTING.md
git commit -m "docs: add CONTRIBUTING guide for contributors"
```

**Commit 12: Add Code of Conduct**
```bash
git add CODE_OF_CONDUCT.md
git commit -m "docs: add Code of Conduct"
```

**Commit 13: Add LICENSE**
```bash
git add LICENSE
git commit -m "docs: add MIT license"
```

**Commit 14: Add GitHub templates**
```bash
git add .github/
git commit -m "docs: add GitHub issue and PR templates"
```

### 4. CI/CD (Commits 15-16)

**Commit 15: Add GitHub Actions workflow**
```bash
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions workflow for CI/CD"
```

**Commit 16: Add commit preparation script**
```bash
git add scripts/prepare-commits.sh
git commit -m "chore: add commit organization helper script"
```

### 5. Frontend Tests (Commits 17-21)

**Commit 17: Add utility function tests**
```bash
git add frontend/lib/__tests__/utils.test.ts
git commit -m "test(frontend): add comprehensive utility function tests"
```

**Commit 18: Add validation tests**
```bash
git add frontend/lib/__tests__/validation.test.ts
git commit -m "test(frontend): add validation utility tests"
```

**Commit 19: Add formatting tests**
```bash
git add frontend/lib/__tests__/formatting.test.ts
git commit -m "test(frontend): add formatting utility tests"
```

**Commit 20: Add custom hook tests**
```bash
git add frontend/hooks/__tests__/
git commit -m "test(frontend): add custom hook tests (useDebounce, useLocalStorage)"
```

**Commit 21: Add component tests**
```bash
git add frontend/components/ui/__tests__/Button.test.tsx
git commit -m "test(frontend): add Button component tests"
```

### 6. Security & Performance (Commits 22-24)

**Commit 22: Add security headers to Next.js config**
```bash
git add frontend/next.config.ts
git commit -m "security(frontend): add security headers to Next.js configuration"
```

**Commit 23: Add PWA manifest**
```bash
git add frontend/public/manifest.json frontend/app/layout.tsx
git commit -m "feat(frontend): add PWA manifest and metadata"
```

**Commit 24: Update layout with PWA metadata**
```bash
# Already included in commit 23, or separate if preferred
```

### 7. Docker & Deployment (Commits 25-27)

**Commit 25: Add Dockerfile**
```bash
git add frontend/Dockerfile frontend/.dockerignore
git commit -m "feat: add Docker configuration for frontend"
```

**Commit 26: Add docker-compose**
```bash
git add docker-compose.yml
git commit -m "feat: add docker-compose configuration"
```

**Commit 27: Update Next.js config for standalone build**
```bash
# Note: May need to update next.config.ts for standalone output
git add frontend/next.config.ts
git commit -m "chore(frontend): configure Next.js for Docker standalone build"
```

### 8. Additional Improvements (Commits 28-30)

**Commit 28: Organize test files structure**
```bash
# If any test files need reorganization
git commit -m "refactor(test): organize test file structure"
```

**Commit 29: Update gitignore if needed**
```bash
git add .gitignore frontend/.gitignore smartcontract/.gitignore
git commit -m "chore: update .gitignore files"
```

**Commit 30: Final documentation updates**
```bash
git add COMMIT_GUIDE.md
git commit -m "docs: add commit organization guide"
```

## Quick Commit Script

You can use this script to commit all changes in logical groups:

```bash
#!/bin/bash
# Run from project root

# Configuration
git add frontend/.prettierrc.json frontend/.prettierignore frontend/.eslintignore .editorconfig
git commit -m "chore: add code formatting and linting configuration"

# Testing
git add frontend/jest.config.js frontend/jest.setup.js frontend/package.json frontend/coverage/.gitkeep
git commit -m "test: add Jest testing infrastructure"

# Documentation
git add README.md CONTRIBUTING.md CODE_OF_CONDUCT.md LICENSE
git commit -m "docs: add project documentation"

# CI/CD
git add .github/
git commit -m "ci: add GitHub Actions workflow and templates"

# Tests
git add frontend/lib/__tests__/ frontend/hooks/__tests__/ frontend/components/ui/__tests__/
git commit -m "test: add comprehensive test suite"

# Security & PWA
git add frontend/next.config.ts frontend/public/manifest.json frontend/app/layout.tsx
git commit -m "feat: add security headers and PWA support"

# Docker
git add frontend/Dockerfile frontend/.dockerignore docker-compose.yml
git commit -m "feat: add Docker configuration"

# Dev tools
git add .vscode/ frontend/.nvmrc smartcontract/.nvmrc scripts/
git commit -m "chore: add development tooling configuration"
```

## Notes

- Each commit should be focused and logical
- Test each commit to ensure the project still works
- Use conventional commit messages
- Keep commits reasonably sized
- Review changes before committing

