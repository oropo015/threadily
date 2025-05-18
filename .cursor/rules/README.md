# Threadily Project Rules

This directory contains a set of YAML rule files defining governance rules and standards for the Threadily application. These rules are designed to preserve the core functionality, architecture, and user experience of the application.

## Purpose

These rules serve several critical purposes:

1. **Architectural Consistency**: Ensure the application remains aligned with its original architecture and design patterns.
2. **Feature Integrity**: Maintain the core functionality and prevent feature drift or regression.
3. **Code Quality**: Establish and enforce coding standards and practices.
4. **Security Baseline**: Define security requirements that must be maintained.
5. **Development Guidance**: Provide clear guidelines for future development work.

## Rule Files

The following rule files are available:

### [`architecture.yaml`](./architecture.yaml)
Core architectural patterns and design choices for the application, including framework choices, component structure, and technical stack requirements.

### [`naming_conventions.yaml`](./naming_conventions.yaml)
Standardized naming patterns for files, components, variables, functions, and other code elements to maintain consistency.

### [`security_practices.yaml`](./security_practices.yaml)
Security guidelines and best practices covering data handling, input validation, authentication, and other security concerns.

### [`feature_scope.yaml`](./feature_scope.yaml)
Boundaries for feature scope and logic, defining what features must be maintained and how they should evolve.

### [`code_style.yaml`](./code_style.yaml)
Coding style and formatting guidelines, including TypeScript usage, React patterns, and code organization.

### [`testing_standards.yaml`](./testing_standards.yaml)
Standards for test coverage, testing approaches, and test quality to ensure application reliability.

## Rule Structure

Each rule within the YAML files follows a consistent structure:

```yaml
- id: unique-rule-id
  name: Rule Name
  description: Brief description of the rule
  details: |
    Detailed explanation of the rule,
    often with multiple lines.
  examples:
    - correct: Example of correct implementation
    - incorrect: Example of incorrect implementation
  enforcement: strict|recommended
```

The `enforcement` level can be:

- `strict`: Rules that must be followed to maintain core functionality or architecture
- `recommended`: Best practices that should be followed unless there's a good reason not to

## Using These Rules

These rules can be used in several ways:

1. **Manual Reference**: Developers can refer to these rules during code review and development
2. **Tool Integration**: Rules can be integrated with linters, code analyzers, and CI/CD pipelines
3. **AI Assistant Guidance**: Rules can guide AI-assisted coding tools to ensure adherence to project standards

## Contributing New Rules

When adding new rules:

1. Use the consistent YAML format described above
2. Assign a unique ID with the appropriate prefix
3. Include clear examples where helpful
4. Add the rule to the appropriate category file
5. Update this README if adding a new category

## Rule Enforcement

While these rules provide guidance, the ultimate responsibility for maintaining code quality and architectural integrity rests with the development team. Regular code reviews should verify adherence to these standards. 