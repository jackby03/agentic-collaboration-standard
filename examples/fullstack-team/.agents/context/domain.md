# Domain Context

## Core entities
- **User** — platform member with role (admin, member, viewer)
- **Workspace** — isolated tenant with its own users and resources
- **Resource** — any asset owned by a Workspace

## Business rules
- Users can belong to multiple Workspaces
- Resource access is always scoped to Workspace
- Admins can manage Users; Members can manage Resources; Viewers are read-only

## Glossary
- **Tenant** — synonym for Workspace in legacy code
- **IAM** — internal access control module in `/src/services/iam`
- **SLA** — platform uptime target: 99.9%
