---
name: web-design-guidelines
description: Audit existing website pages and components for typography, responsive layout, interaction and accessibility. Use for a rendered UI review or the final visual QA pass of a template conversion.
---

# Website UI review

Use the pinned [Vercel Web Interface Guidelines](references/vercel-web-interface-guidelines.md) as a checklist. Apply the checks that fit the existing framework and the requested scope. Follow the repository's design tokens, locale conventions and instructions for owner-supplied content.

1. Review the relevant shared styles and components, then verify actual rendered pages. Reuse the repo's browser checks and sample mobile, tablet and desktop sizes. Include the longest localized headings, buttons and navigation, both supported themes where relevant, and the review archive and product views when affected.
2. Inspect heading hierarchy and wrapping, text size and line height, prose width, spacing, contrast, typography appropriate to each language, overflow and layout shifts. Check consistent component alignment against the homepage. Preserve readable source quotations and the existing design system.
3. Exercise keyboard and touch interactions. Check visible focus, semantic controls, accessible names, reduced motion and layout at zoom. Preserve built-in keyboard behavior on native controls. Reuse existing test tooling and keep checkout checks local and intercepted.
4. Report actionable findings with route, viewport or locale, and source file when known. Fix confirmed defects when the task authorizes repair and repeat the affected checks. Record unavailable checks as unverified.

The reference includes platform-specific suggestions and English editorial defaults. Apply only relevant rules and use the native language, current UI patterns and measured behavior to resolve conflicts.
