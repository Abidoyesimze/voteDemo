# Contributing to Voting dApp

Thank you for your interest in contributing to the Voting dApp! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit with clear messages
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```
feat(voting): add real-time vote count updates
fix(contract): resolve voting end time calculation
docs(readme): update installation instructions
```

## Code Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint rules
- Use Prettier for formatting
- Write self-documenting code with clear variable names
- Add JSDoc comments for public functions

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript interfaces for props

### Smart Contracts

- Follow Solidity style guide
- Add NatSpec documentation
- Write comprehensive tests
- Consider gas optimization

## Testing

### Frontend

- Write tests for utility functions
- Test React components with React Testing Library
- Aim for >50% code coverage
- Test user interactions, not implementation details

### Smart Contracts

- Write tests for all functions
- Test edge cases and error conditions
- Use Hardhat fixtures for test setup
- Report gas usage for optimization

## Pull Request Process

1. **Update Documentation**: Update README or docs if needed
2. **Add Tests**: Ensure new code is tested
3. **Run Linters**: Fix any linting errors
4. **Check Formatting**: Run Prettier
5. **Test Locally**: Verify everything works
6. **Write Clear PR Description**: Explain what and why
7. **Link Issues**: Reference related issues

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No new warnings
- [ ] TypeScript compiles without errors

## Review Process

- Maintainers will review PRs within 48 hours
- Address review comments promptly
- Be open to feedback and suggestions
- Keep PRs focused and reasonably sized

## Questions?

Feel free to open an issue for questions or reach out to maintainers.

Thank you for contributing! 🎉

