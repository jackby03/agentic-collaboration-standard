import * as fs from "fs";
import * as path from "path";

export interface DetectedProject {
  name: string;
  language: string | null;
  framework: string | null;
}

const JS_FRAMEWORK_DEPS: Record<string, string> = {
  next: "nextjs",
  "next.js": "nextjs",
  react: "react",
  vue: "vue",
  nuxt: "nuxt",
  svelte: "svelte",
  "@sveltejs/kit": "sveltekit",
  angular: "angular",
  "@angular/core": "angular",
  express: "express",
  fastify: "fastify",
  hono: "hono",
  remix: "remix",
  "@remix-run/node": "remix",
  astro: "astro",
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function detectProject(dir: string = process.cwd()): DetectedProject {
  const name = slugify(path.basename(dir));

  // Node.js / TypeScript
  const pkgPath = path.join(dir, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      };

      let framework: string | null = null;
      for (const [dep, fw] of Object.entries(JS_FRAMEWORK_DEPS)) {
        if (allDeps[dep]) {
          framework = fw;
          break;
        }
      }

      const hasTypeScript =
        allDeps["typescript"] ||
        allDeps["ts-node"] ||
        fs.existsSync(path.join(dir, "tsconfig.json"));

      return {
        name: slugify(pkg.name || name),
        language: hasTypeScript ? "typescript" : "javascript",
        framework,
      };
    } catch {
      // fall through
    }
  }

  // Python
  const pyprojectPath = path.join(dir, "pyproject.toml");
  const requirementsPath = path.join(dir, "requirements.txt");
  if (fs.existsSync(pyprojectPath) || fs.existsSync(requirementsPath)) {
    let framework: string | null = null;
    if (fs.existsSync(requirementsPath)) {
      const reqs = fs.readFileSync(requirementsPath, "utf8").toLowerCase();
      if (reqs.includes("django")) framework = "django";
      else if (reqs.includes("fastapi")) framework = "fastapi";
      else if (reqs.includes("flask")) framework = "flask";
    }
    return { name, language: "python", framework };
  }

  // Rust
  const cargoPath = path.join(dir, "Cargo.toml");
  if (fs.existsSync(cargoPath)) {
    return { name, language: "rust", framework: null };
  }

  // Go
  const goModPath = path.join(dir, "go.mod");
  if (fs.existsSync(goModPath)) {
    return { name, language: "go", framework: null };
  }

  return { name, language: null, framework: null };
}
