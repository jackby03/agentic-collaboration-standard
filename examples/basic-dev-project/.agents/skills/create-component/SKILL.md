---
name: create-component
description: Create a React component following project conventions. Use when asked to build a UI component, widget, card, form, or page section.
---

## Steps

1. Read `context/project.md` for naming and export conventions
2. Create file in `/components` with PascalCase filename
3. Use named export (not default)
4. Add TypeScript props interface
5. Add Tailwind classes for styling
6. Create a basic test in `/tests/components`

## Template

```tsx
interface Props {
  // define props here
}

export function ComponentName({ ...props }: Props) {
  return (
    <div>
      {/* implementation */}
    </div>
  );
}
```

See [references/design-system.md](references/design-system.md) for available tokens and components.
