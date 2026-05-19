import Head from 'next/head'
import { useEffect } from 'react'

const problemItems = [
  '⚠ CLAUDE.md / .claude/ — Claude Code only',
  '⚠ .cursorrules / .cursor/rules/ — Cursor only',
  '⚠ .github/copilot-instructions.md — Copilot only',
  '⚠ GEMINI.md — Gemini CLI only',
  '⚠ .windsurfrules — Windsurf only',
  '⚠ .clinerules / .roo/ — Roo Code only',
  '⚠ .junie/guidelines.md — JetBrains Junie only',
  '⚠ .kiro/steering/ — Kiro only',
  '⚠ No shared permissions model',
  '⚠ Skills defined per-tool, not portable',
  '⚠ Switch tools → lose everything',
  '⚠ No standard for non-dev users',
]

const withAcsItems = [
  '✓ One .agents/ folder for everything',
  '✓ One spec across ACS-compatible tools',
  '✓ Explicit, version-controlled permissions',
  '✓ SKILL.md-compatible reusable skills',
  '✓ Portable when you switch tools',
  '✓ Human-readable for non-devs too',
]
const readmeHighlights = [
  'One folder for agent context',
  'Portable across ACS-compatible tools',
  'README-first presentation for the standard',
]

const layers = [
  {
    icon: '📄',
    title: 'context/',
    description: 'What agents need to know. Architecture, conventions, do-not-touch rules.',
    badge: 'v1.0',
    active: true,
  },
  {
    icon: '⚡',
    title: 'skills/',
    description: 'Reusable capabilities. SKILL.md compatible with agentskills.io.',
    badge: 'v1.0',
  },
  {
    icon: '⌨',
    title: 'commands/',
    description: 'Named, single-shot tasks. Like slash commands for any agent.',
    badge: 'v1.0',
  },
  {
    icon: '🤖',
    title: 'agents/',
    description: 'Named subagents: reviewer, tester, docs-writer, and more.',
    badge: 'v1.0',
  },
  {
    icon: '🔒',
    title: 'permissions/',
    description: 'Explicit allow/deny rules for file access. Committed to git.',
    badge: 'v1.0',
  },
  {
    icon: '⋯',
    title: 'workflows, hooks, profiles',
    description: 'Multi-step orchestration and lifecycle triggers.',
    badge: 'v2.0',
    future: true,
  },
]

const compatItems = [
  {
    icon: 'AGT',
    iconClass: '',
    title: 'AGENTS.md',
    description: 'Keep your AGENTS.md for broad compatibility. ACS adds structured layers on top. They live side by side in the same repo.',
  },
  {
    icon: 'SKL',
    iconClass: 'b',
    title: 'SKILL.md (agentskills.io)',
    description: 'ACS skills use the exact same SKILL.md format. Any agentskills.io skill works inside .agents/skills/ with zero changes.',
  },
  {
    icon: 'MCP',
    iconClass: 'y',
    title: 'Model Context Protocol',
    description: 'MCP handles runtime tools. ACS handles project configuration. Different layers, fully complementary.',
  },
  {
    icon: 'CLD',
    iconClass: 'm',
    title: 'CLAUDE.md',
    description: 'Migrate incrementally. The planned acs compile CLI will generate CLAUDE.md from ACS automatically.',
  },
]

const footerColumns = [
  {
    title: 'Standard',
    links: [
      ['Specification', 'https://github.com/jackby03/agentic-collaboration-standard/tree/main/spec/v1'],
      ['Getting Started', 'https://github.com/jackby03/agentic-collaboration-standard/blob/main/docs/guides/getting-started.md'],
      ['Examples', 'https://github.com/jackby03/agentic-collaboration-standard/tree/main/examples'],
      ['For Tool Builders', 'https://github.com/jackby03/agentic-collaboration-standard/blob/main/docs/guides/for-tool-builders.md'],
    ],
  },
  {
    title: 'Community',
    links: [
      ['GitHub', 'https://github.com/jackby03/agentic-collaboration-standard'],
      ['Issues', 'https://github.com/jackby03/agentic-collaboration-standard/issues'],
      ['Contributing', 'https://github.com/jackby03/agentic-collaboration-standard/blob/main/CONTRIBUTING.md'],
      ['Governance', 'https://github.com/jackby03/agentic-collaboration-standard/blob/main/GOVERNANCE.md'],
    ],
  },
  {
    title: 'Tooling',
    links: [
      ['VS Code Extension', 'https://marketplace.visualstudio.com/items?itemName=jackby03.acs-vscode'],
      ['npm package', 'https://www.npmjs.com/package/agentic-standard'],
      ['PyPI package', 'https://pypi.org/project/agentic-standard/'],
    ],
  },
]

function ExternalLink({ href, children, className, ariaLabel, title }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={ariaLabel} title={title}>
      {children}
    </a>
  )
}

export default function Home() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll('.reveal'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => entry.target.classList.add('visible'), index * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    revealItems.forEach((element) => observer.observe(element))

    const layerItems = Array.from(document.querySelectorAll('.litem'))
    let currentIndex = 0

    const interval = window.setInterval(() => {
      layerItems.forEach((element) => element.classList.remove('active'))
      if (layerItems.length > 0) {
        layerItems[currentIndex % Math.max(layerItems.length - 1, 1)]?.classList.add('active')
        currentIndex += 1
      }
    }, 2000)

    return () => {
      observer.disconnect()
      window.clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Head>
        <title>ACS — Agentic Collaboration Standard</title>
        <meta name="description" content="A unified open format for agent-ready projects. One .agents/ folder for ACS-compatible agents and tools." />
        <link rel="canonical" href="https://agentstandard.jackby03.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agentstandard.jackby03.com/" />
        <meta property="og:title" content="ACS — Agentic Collaboration Standard" />
        <meta property="og:description" content="One .agents/ folder. Any ACS-compatible agent. Stop scattering project context across CLAUDE.md, .cursorrules, GEMINI.md, and a dozen vendor-specific files." />
        <meta property="og:image" content="https://agentstandard.jackby03.com/readme.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Agentic Collaboration Standard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ACS — Agentic Collaboration Standard" />
        <meta name="twitter:description" content="One .agents/ folder. Any ACS-compatible agent. Stop scattering context across vendor-specific files." />
        <meta name="twitter:image" content="https://agentstandard.jackby03.com/readme.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <main className="page-shell">
        <nav className="nav">
          <a className="nav-logo" href="#top">
            ACS
          </a>
          <ul className="nav-links">
            <li><a href="#layers">Spec</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#compat">Compatibility</a></li>
            <li><ExternalLink href="https://github.com/jackby03/agentic-collaboration-standard">Docs</ExternalLink></li>
            <li><ExternalLink href="https://github.com/jackby03/agentic-collaboration-standard" className="nav-cta">GitHub →</ExternalLink></li>
          </ul>
        </nav>

        <div className="hero" id="top">
          <div className="hero-eyebrow">
            <span className="badge badge-a">v1.0.0</span>
            <span className="badge">Open Standard</span>
          </div>
          <h1>
            Agentic
            <br />
            <span className="hi">Collaboration</span>
            <br />
            Standard
          </h1>
          <p className="hero-sub">One folder. Any ACS-compatible agent.</p>
          <p className="hero-desc">
            ACS defines a unified <code className="code-pill">.agents/</code> folder for agent-ready projects. Instead of scattering project guidance across <code className="code-pill">CLAUDE.md</code>, <code className="code-pill">.cursorrules</code>, <code className="code-pill">.github/copilot-instructions.md</code>, <code className="code-pill">GEMINI.md</code>, <code className="code-pill">.windsurfrules</code>, <code className="code-pill">.clinerules</code>, <code className="code-pill">.junie/guidelines.md</code>, and a dozen more vendor-specific files, write your context, skills, and permissions once for ACS-compatible tools.
          </p>
          <div className="hero-actions">
            <ExternalLink className="btn-p" href="https://github.com/jackby03/agentic-collaboration-standard">
              Get started →
            </ExternalLink>
            <ExternalLink className="btn-s" href="https://github.com/jackby03/agentic-collaboration-standard/tree/main/spec/v1">
              Read the spec
            </ExternalLink>
          </div>
          <div className="hero-preview" aria-label="Updated ACS README preview">
            <img src="/readme.png" alt="ACS README preview showing the new landing style and core message" className="hero-image" />
            <div className="hero-preview-footer">
              {readmeHighlights.map((item) => (
                <span key={item} className="hero-preview-chip">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="ticker" aria-hidden="true">
          <div className="tt">
            <span className="ti">context <span className="ts">·</span></span><span className="ti">skills <span className="ts">·</span></span><span className="ti">commands <span className="ts">·</span></span><span className="ti">agents <span className="ts">·</span></span><span className="ti">permissions <span className="ts">·</span></span><span className="ti">progressive disclosure <span className="ts">·</span></span><span className="ti">vendor neutral <span className="ts">·</span></span><span className="ti">open standard <span className="ts">·</span></span><span className="ti">SKILL.md compatible <span className="ts">·</span></span><span className="ti">MCP ready <span className="ts">·</span></span><span className="ti">one folder <span className="ts">·</span></span><span className="ti">human readable <span className="ts">·</span></span><span className="ti">git friendly <span className="ts">·</span></span><span className="ti">monorepo support <span className="ts">·</span></span><span className="ti">AGENTS.md compatible <span className="ts">·</span></span><span className="ti">v1.0.0 released <span className="ts">·</span></span><span className="ti">B1–B6 conformance <span className="ts">·</span></span><span className="ti">no runtime required <span className="ts">·</span></span><span className="ti">plain markdown <span className="ts">·</span></span><span className="ti">tier 1 / 2 / 3 loading <span className="ts">·</span></span>
            <span className="ti">context <span className="ts">·</span></span><span className="ti">skills <span className="ts">·</span></span><span className="ti">commands <span className="ts">·</span></span><span className="ti">agents <span className="ts">·</span></span><span className="ti">permissions <span className="ts">·</span></span><span className="ti">progressive disclosure <span className="ts">·</span></span><span className="ti">vendor neutral <span className="ts">·</span></span><span className="ti">open standard <span className="ts">·</span></span><span className="ti">SKILL.md compatible <span className="ts">·</span></span><span className="ti">MCP ready <span className="ts">·</span></span><span className="ti">one folder <span className="ts">·</span></span><span className="ti">human readable <span className="ts">·</span></span><span className="ti">git friendly <span className="ts">·</span></span><span className="ti">monorepo support <span className="ts">·</span></span><span className="ti">AGENTS.md compatible <span className="ts">·</span></span><span className="ti">v1.0.0 released <span className="ts">·</span></span><span className="ti">B1–B6 conformance <span className="ts">·</span></span><span className="ti">no runtime required <span className="ts">·</span></span><span className="ti">plain markdown <span className="ts">·</span></span><span className="ti">tier 1 / 2 / 3 loading <span className="ts">·</span></span>
          </div>
        </div>

        <div className="logos">
          <span className="ll">Works with</span>
          <div className="logo-list">
            <span className="li">Cursor</span><span className="li">Zed</span><span className="li">Claude Code</span><span className="li">Gemini</span><span className="li">Codex</span><span className="li">Kiro</span><span className="li">Trae</span><span className="li">Windsurf</span><span className="li">JetBrains Junie</span><span className="li">Coodo</span><span className="li">GitHub Copilot</span><span className="li">Roo Code</span><span className="li">Antigravity</span><span className="li">Firebase Studio</span><span className="li">any agent →</span>
          </div>
        </div>

        <section className="ps">
          <div className="container">
            <div className="reveal">
              <div className="stag">The problem</div>
              <h2 className="stit">Every tool reinvents<br />the same wheel.</h2>
              <p className="sdesc">Agent configuration is fragmented. Your context, skills, and rules live in vendor-specific formats that don't travel. File examples below are illustrative and can evolve by vendor version.</p>
            </div>
            <div className="pgrid reveal">
              <div className="pcol">
                <div className="pcl"><span className="drd" />Without ACS</div>
                <div className="pitems">
                  {problemItems.map((item) => (
                    <div key={item} className="pi">{item}</div>
                  ))}
                </div>
              </div>
              <div className="pcol">
                <div className="pcl"><span className="dgr" />With ACS</div>
                <div className="pitems">
                  {withAcsItems.map((item) => (
                    <div key={item} className="si"><span className="chk">✓</span>&nbsp;{item.slice(2)}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ls" id="layers">
          <div className="container">
            <div className="reveal">
              <div className="stag">Specification</div>
              <h2 className="stit">Five layers.<br />One folder.</h2>
              <p className="sdesc">ACS is additive. Start with context only. Add layers as your project grows.</p>
            </div>
            <div className="ll2">
              <div className="llist reveal">
                {layers.map((layer) => (
                  <div key={layer.title} className={`litem${layer.active ? ' active' : ''}`}>
                    <div className="lic">{layer.icon}</div>
                    <div className="lt">
                      <h3>{layer.title}</h3>
                      <p>{layer.description}</p>
                    </div>
                    <span className={`lb${layer.future ? ' lbf' : ''}`}>{layer.badge}</span>
                  </div>
                ))}
              </div>
              <div className="reveal">
                <div className="tree" aria-label="Example project structure">
                  <div className="tl"><span className="tb">📁</span>&nbsp;<span className="tr">your-project/</span></div>
                  <div className="ti2">
                    <div className="tl"><span className="tb">├─</span>&nbsp;<span className="tfi">AGENTS.md</span>&nbsp;<span className="tc"># human overview</span></div>
                    <div className="tl"><span className="tb">└─</span>&nbsp;<span className="tf">.agents/</span>&nbsp;<span className="tc">&nbsp;&nbsp;&nbsp;# ACS root</span></div>
                    <div className="ti2">
                      <div className="tl"><span className="tb">├─</span>&nbsp;<span className="th">main.yaml</span>&nbsp;<span className="tc">&nbsp;&nbsp;&nbsp;# manifest</span></div>
                      <div className="tl"><span className="tb">├─</span>&nbsp;<span className="tf">context/</span></div>
                      <div className="ti2"><div className="tl"><span className="tb">└─</span>&nbsp;<span className="tfi">project.md</span></div></div>
                      <div className="tl"><span className="tb">├─</span>&nbsp;<span className="tf">skills/</span></div>
                      <div className="ti2">
                        <div className="tl"><span className="tb">└─</span>&nbsp;<span className="tf">create-component/</span></div>
                        <div className="ti2">
                          <div className="tl"><span className="tb">├─</span>&nbsp;<span className="th">SKILL.md</span></div>
                          <div className="tl"><span className="tb">└─</span>&nbsp;<span className="tf">references/</span></div>
                        </div>
                      </div>
                      <div className="tl"><span className="tb">├─</span>&nbsp;<span className="tf">commands/</span></div>
                      <div className="ti2"><div className="tl"><span className="tb">└─</span>&nbsp;<span className="tfi">explain-error.md</span></div></div>
                      <div className="tl"><span className="tb">├─</span>&nbsp;<span className="tf">agents/</span></div>
                      <div className="ti2"><div className="tl"><span className="tb">└─</span>&nbsp;<span className="tfi">reviewer.md</span></div></div>
                      <div className="tl"><span className="tb">└─</span>&nbsp;<span className="tf">permissions/</span></div>
                      <div className="ti2"><div className="tl"><span className="tb">└─</span>&nbsp;<span className="tfi">policy.yaml</span></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hs" id="how">
          <div className="container">
            <div className="reveal">
              <div className="stag">How it works</div>
              <h2 className="stit">Progressive disclosure.<br />Load only what you need.</h2>
              <p className="sdesc">ACS uses a three-tier loading strategy. Agents get the right context at the right time — without bloating the session.</p>
            </div>
            <div className="sg reveal">
              <div className="step">
                <div className="sn">Tier 01</div>
                <h3>Always in context</h3>
                <p>Manifest, permissions, and project context load at session start. Skill names only — ~50 tokens each.</p>
                <code className="sc">~200 tokens total overhead</code>
              </div>
              <div className="step">
                <div className="sn">Tier 02</div>
                <h3>On activation</h3>
                <p>Full SKILL.md body loads when the agent decides the task matches. Commands and agents load on invocation.</p>
                <code className="sc">&lt; 5,000 tokens per skill</code>
              </div>
              <div className="step">
                <div className="sn">Tier 03</div>
                <h3>On demand</h3>
                <p>Reference files, scripts, and assets load only when the skill instructions reference them explicitly.</p>
                <code className="sc">zero cost if unused</code>
              </div>
            </div>
          </div>
        </section>

        <section className="cs2" id="compat">
          <div className="container">
            <div className="reveal">
              <div className="stag">Compatibility</div>
              <h2 className="stit">Designed to coexist,<br />not replace.</h2>
              <p className="sdesc">ACS works alongside every existing standard. Add .agents/ to any project without breaking what's there.</p>
            </div>
            <div className="cg reveal">
              {compatItems.map((item) => (
                <div key={item.title} className="ci2">
                  <div className={`cicon ${item.iconClass}`.trim()}>{item.icon}</div>
                  <div className="ct">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ctas">
          <div className="container">
            <div className="ctai reveal">
              <div className="ctax">
                <div className="stag">Get started</div>
                <h2 className="stit">Your project,<br />agent-ready in minutes.</h2>
                <p>Create a .agents/ folder. Add main.yaml. Write context. Done — any ACS-compatible agent picks it up automatically.</p>
                <div className="inline-actions">
                  <ExternalLink className="btn-p" href="https://github.com/jackby03/agentic-collaboration-standard">
                    View on GitHub →
                  </ExternalLink>
                  <ExternalLink className="btn-s" href="https://github.com/jackby03/agentic-collaboration-standard/tree/main/spec/v1">
                    Read the spec
                  </ExternalLink>
                </div>
              </div>
              <div className="ctab">
                <ExternalLink className="ctac" href="https://github.com/jackby03/agentic-collaboration-standard/blob/main/docs/guides/getting-started.md">
                  <span className="ctac-ic">🚀</span>
                  <div className="ctac-t"><h4>Getting Started</h4><p>Scaffold your first .agents/ in under 5 minutes</p></div>
                  <span className="ctac-ar">→</span>
                </ExternalLink>
                <ExternalLink className="ctac" href="https://marketplace.visualstudio.com/items?itemName=jackby03.acs-vscode">
                  <span className="ctac-ic">⬡</span>
                  <div className="ctac-t"><h4>VS Code Extension</h4><p>YAML autocomplete + inline validation for .agents/</p></div>
                  <span className="ctac-ar">→</span>
                </ExternalLink>
                <ExternalLink className="ctac" href="https://github.com/jackby03/agentic-collaboration-standard/tree/main/examples">
                  <span className="ctac-ic">💡</span>
                  <div className="ctac-t"><h4>Examples</h4><p>Real .agents/ configs for solo and team projects</p></div>
                  <span className="ctac-ar">→</span>
                </ExternalLink>
                <ExternalLink className="ctac" href="https://github.com/jackby03/agentic-collaboration-standard/blob/main/docs/guides/for-tool-builders.md">
                  <span className="ctac-ic">🔧</span>
                  <div className="ctac-t"><h4>For Tool Builders</h4><p>Add ACS support to your agent or IDE</p></div>
                  <span className="ctac-ar">→</span>
                </ExternalLink>
              </div>
            </div>
          </div>
        </section>

        <div className="install-strip">
          <div className="install-inner">
            <span className="install-label">Install v1.0.0</span>
            <code className="install-code">npm install -g agentic-standard</code>
            <code className="install-code">pip install agentic-standard</code>
            <ExternalLink className="install-link" href="https://marketplace.visualstudio.com/items?itemName=jackby03.acs-vscode">
              VS Code Marketplace →
            </ExternalLink>
          </div>
        </div>

        <div className="final-banner">
          <div className="final-inner">
            <div className="stag center">Star on GitHub</div>
            <h2 className="stit center-title">Like what you see?<br />Give it a star.</h2>
            <p>ACS is open source and community driven. Star the repo, open an issue, or contribute a skill — every bit helps the standard grow.</p>
            <div className="final-actions">
              <ExternalLink className="btn-p" href="https://github.com/jackby03/agentic-collaboration-standard">
                <svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
                Star on GitHub
              </ExternalLink>
              <ExternalLink className="btn-s" href="https://github.com/jackby03/agentic-collaboration-standard/issues">
                Open an issue →
              </ExternalLink>
            </div>
          </div>
        </div>

        <footer>
          <div className="footer-inner">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="footer-brand-name">ACS</div>
                <div className="footer-brand-desc">Agentic Collaboration Standard — one <code className="footer-inline-code">.agents/</code> folder, any ACS-compatible agent.</div>
                <div className="footer-socials">
                  <ExternalLink className="footer-social" href="https://github.com/jackby03" ariaLabel="GitHub">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
                  </ExternalLink>
                  <ExternalLink className="footer-social" href="https://linkedin.com/in/jackby03" ariaLabel="LinkedIn">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </ExternalLink>
                  <ExternalLink className="footer-social" href="https://x.com/ijackby03" ariaLabel="X">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                  </ExternalLink>
                  <ExternalLink className="footer-social" href="https://jackby03.com" ariaLabel="Website">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                  </ExternalLink>
                </div>
              </div>

              <div className="footer-nav">
                {footerColumns.map((column) => (
                  <div key={column.title} className="footer-col">
                    <h4>{column.title}</h4>
                    {column.links.map(([label, href]) => (
                      <ExternalLink key={label} href={href}>{label}</ExternalLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-copy">
                <span className="footer-copy-accent">ACS</span> — Agentic Collaboration Standard · v1.0.0 · Built by <ExternalLink href="https://jackby03.com">jackby03</ExternalLink>
              </div>
              <div className="footer-badge">CC0 · Open Standard</div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        :root {
          --bg: #0a0a0a;
          --bg2: #111111;
          --bg3: #161616;
          --border: #222222;
          --border2: #333333;
          --accent: #b8ff57;
          --accent2: #7ab83a;
          --text: #e8e8e8;
          --muted: #666666;
          --dim: #999999;
          --red: #ff5757;
          --blue: #57b8ff;
          --yellow: #ffd557;
          color-scheme: dark;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          line-height: 1.6;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        a {
          color: inherit;
        }

        .page-shell {
          position: relative;
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 56px;
          border-bottom: 1px solid var(--border);
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(12px);
        }

        .nav-logo {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.08em;
          color: var(--accent);
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }

        .nav-links a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--text);
        }

        .nav-cta {
          color: var(--bg) !important;
          background: var(--accent);
          padding: 7px 16px;
          border-radius: 2px;
        }

        .nav-cta:hover {
          opacity: 0.85;
        }

        .hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px 48px 80px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-eyebrow {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.2s;
        }

        .badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          border: 1px solid var(--border2);
          color: var(--muted);
        }

        .badge-a {
          border-color: var(--accent);
          color: var(--accent);
        }

        h1 {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: clamp(50px, 8vw, 96px);
          line-height: 0.95;
          letter-spacing: -0.02em;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.35s;
          margin-bottom: 24px;
        }

        .hi {
          color: var(--accent);
          position: relative;
        }

        .hi::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent);
          opacity: 0.25;
        }

        .hero-sub {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(18px, 2.5vw, 26px);
          color: var(--dim);
          margin-bottom: 16px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.5s;
        }

        .hero-desc {
          font-size: 16px;
          color: var(--muted);
          max-width: 560px;
          line-height: 1.7;
          margin-bottom: 48px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.65s;
        }

        .code-pill,
        .footer-inline-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--accent);
          background: rgba(184, 255, 87, 0.08);
          padding: 2px 6px;
          border-radius: 2px;
        }

        .hero-actions,
        .final-actions,
        .inline-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.8s;
        }

        .btn-p,
        .btn-s,
        .install-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s, color 0.2s, border-color 0.2s, background 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-p {
          color: var(--bg);
          background: var(--accent);
          padding: 14px 28px;
          border-radius: 2px;
        }

        .btn-p:hover,
        .btn-s:hover,
        .install-link:hover {
          transform: translateY(-1px);
        }

        .btn-p:hover {
          opacity: 0.9;
        }

        .btn-s {
          color: var(--muted);
          background: transparent;
          padding: 13px 28px;
          border-radius: 2px;
          border: 1px solid var(--border2);
        }

        .btn-s:hover {
          color: var(--text);
          border-color: var(--dim);
        }

        .hero-code {
          position: absolute;
          right: 48px;
          top: 50%;
          transform: translateY(-50%);
          width: 400px;
          opacity: 0;
          animation: fadeLeft 0.8s ease forwards 0.9s;
        }

        @media (max-width: 1100px) {
          .hero-code {
            display: none;
          }
        }

        .cw {
          background: var(--bg3);
          border: 1px solid var(--border2);
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(184, 255, 87, 0.04);
        }

        .ctb {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          background: var(--bg2);
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dr { background: #ff5f57; }
        .dy { background: #febc2e; }
        .dg { background: #28c840; }

        .cfn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          margin-left: 8px;
        }

        .cb {
          padding: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          line-height: 1.85;
          color: var(--dim);
        }

        .cc { color: #555555; }
        .ck { color: var(--blue); }
        .cv { color: var(--accent); }
        .cs { color: var(--yellow); }
        .ci { padding-left: 16px; }

        .ticker {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 14px 0;
          position: relative;
          z-index: 1;
        }

        .tt {
          display: flex;
          gap: 48px;
          animation: ticker 22s linear infinite;
          white-space: nowrap;
        }

        .ti {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }

        .ts {
          color: var(--accent);
          opacity: 0.6;
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .logos {
          position: relative;
          z-index: 1;
          padding: 32px 48px;
          border-bottom: 1px solid var(--border);
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0;
          flex-wrap: wrap;
        }

        .ll {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-right: 40px;
          white-space: nowrap;
        }

        .hero-preview {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          width: 560px;

        .li {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          .hero-preview {
          opacity: 0.45;
          letter-spacing: 0.05em;
          transition: opacity 0.2s;
        }
        .hero-image {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid var(--border2);
          border-radius: 8px;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(184, 255, 87, 0.04);
        }

        .hero-preview-footer {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
          justify-content: flex-start;
        }

        .hero-preview-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border2);
          border-radius: 999px;
          padding: 6px 10px;
        }
          margin-bottom: 20px;
        }

        .sdesc {
          font-size: 16px;
          color: var(--muted);
          max-width: 560px;
          line-height: 1.7;
        }

        .ps, .ls, .hs, .cs2 {
          padding: 100px 0;
          border-bottom: 1px solid var(--border);
        }

        .pgrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-top: 64px;
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .pcol {
          padding: 40px;
          border-right: 1px solid var(--border);
        }

        .pcol:last-child {
          border-right: none;
        }

        .pcl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .drd, .dgr, .chk {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .drd { background: var(--red); }
        .dgr { background: var(--accent); }
        .chk { color: var(--accent); width: auto; height: auto; border-radius: 0; }

        .pitems {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pi {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--muted);
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: 3px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg2);
          transition: border-color 0.2s;
        }

        .pi:hover {
          border-color: var(--border2);
        }

        .si {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text);
          padding: 12px 16px;
          border: 1px solid rgba(184, 255, 87, 0.14);
          border-radius: 3px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(184, 255, 87, 0.03);
          transition: border-color 0.2s, background 0.2s;
        }

        .si:hover {
          border-color: rgba(184, 255, 87, 0.3);
          background: rgba(184, 255, 87, 0.06);
        }

        .ll2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-top: 64px;
          align-items: start;
        }

        .llist {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .litem {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 20px;
          border: 1px solid transparent;
          border-radius: 4px;
          transition: border-color 0.2s, background 0.2s;
        }

        .litem:hover,
        .litem.active {
          border-color: rgba(184, 255, 87, 0.22);
          background: rgba(184, 255, 87, 0.04);
        }

        .lic {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
          transition: border-color 0.2s;
        }

        .litem.active .lic {
          border-color: rgba(184, 255, 87, 0.4);
          background: rgba(184, 255, 87, 0.08);
        }

        .lt h3 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 4px;
        }

        .lt p {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }

        .lb {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 2px;
          background: rgba(184, 255, 87, 0.1);
          color: var(--accent);
          margin-left: auto;
          flex-shrink: 0;
        }

        .lbf {
          background: rgba(100, 100, 100, 0.15);
          color: var(--muted);
        }

        .tree {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          line-height: 2;
          background: var(--bg3);
          border: 1px solid var(--border2);
          border-radius: 6px;
          padding: 28px;
          position: sticky;
          top: 80px;
        }

        .tr { color: var(--accent); font-weight: 500; }
        .tf { color: var(--blue); }
        .tfi { color: var(--dim); }
        .tc { color: #444444; }
        .tb { color: #333333; }
        .th { color: var(--accent); }

        .tl { display: flex; gap: 8px; }
        .ti2 { padding-left: 20px; }

        .sg {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          margin-top: 64px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .step {
          background: var(--bg);
          padding: 40px;
          transition: background 0.2s;
        }

        .step:hover {
          background: var(--bg2);
        }

        .sn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sn::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border2);
        }

        .step h3 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--text);
          margin-bottom: 12px;
        }

        .step p {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
        }

        .sc {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--accent);
          background: rgba(184, 255, 87, 0.06);
          border: 1px solid rgba(184, 255, 87, 0.14);
          border-radius: 3px;
          padding: 10px 14px;
          margin-top: 20px;
          display: block;
        }

        .cg {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          margin-top: 64px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .ci2 {
          background: var(--bg);
          padding: 32px 40px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          transition: background 0.2s;
        }

        .ci2:hover {
          background: var(--bg2);
        }

        .cicon {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--bg);
          background: var(--accent2);
          padding: 6px 10px;
          border-radius: 3px;
          flex-shrink: 0;
          letter-spacing: 0.05em;
        }

        .cicon.b { background: #1e3a52; color: var(--blue); }
        .cicon.y { background: #3a2e0a; color: var(--yellow); }
        .cicon.m { background: var(--bg3); color: var(--muted); border: 1px solid var(--border2); }

        .ct h4 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 6px;
        }

        .ct p {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }

        .ctas {
          padding: 120px 0;
        }

        .ctai {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .ctax p {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 36px;
        }

        .ctab {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ctac {
          background: var(--bg2);
          border: 1px solid var(--border2);
          border-radius: 4px;
          padding: 22px 28px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.2s;
        }

        .ctac:hover {
          border-color: rgba(184, 255, 87, 0.4);
          transform: translateX(4px);
        }

        .ctac-ic {
          font-size: 18px;
          flex-shrink: 0;
        }

        .ctac-t h4 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 2px;
        }

        .ctac-t p {
          font-size: 12px;
          color: var(--muted);
          margin: 0;
          line-height: 1.4;
        }

        .ctac-ar {
          margin-left: auto;
          color: var(--muted);
          font-size: 16px;
          transition: color 0.2s, transform 0.2s;
        }

        .ctac:hover .ctac-ar {
          color: var(--accent);
          transform: translateX(4px);
        }

        .install-strip {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 28px 48px;
          background: var(--bg2);
        }

        .install-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .install-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }

        .install-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--accent);
          background: rgba(184, 255, 87, 0.06);
          border: 1px solid rgba(184, 255, 87, 0.14);
          border-radius: 3px;
          padding: 8px 14px;
        }

        .install-link {
          font-size: 12px;
          color: var(--blue);
          background: rgba(87, 184, 255, 0.05);
          border: 1px solid rgba(87, 184, 255, 0.18);
          border-radius: 3px;
          padding: 8px 14px;
          text-decoration: none;
        }

        .final-banner {
          position: relative;
          z-index: 1;
          padding: 80px 48px;
          background: var(--bg);
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .final-inner {
          max-width: 640px;
          margin: 0 auto;
        }

        .center-title {
          margin-bottom: 16px;
        }

        .final-inner p {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 36px;
        }

        .github-icon {
          width: 16px;
          height: 16px;
          fill: var(--bg);
          flex-shrink: 0;
        }

        footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          background: var(--bg2);
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 48px 32px;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border);
        }

        .footer-brand-name {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 16px;
          color: var(--accent);
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .footer-brand-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          max-width: 280px;
        }

        .footer-socials {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .footer-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--border2);
          border-radius: 4px;
          color: var(--muted);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .footer-social:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(184, 255, 87, 0.06);
        }

        .footer-social svg {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .footer-nav {
          display: flex;
          gap: 56px;
        }

        .footer-col h4 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 16px;
        }

        .footer-col a {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--dim);
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s;
          letter-spacing: 0.03em;
        }

        .footer-col a:hover {
          color: var(--accent);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--muted);
        }

        .footer-copy-accent {
          color: var(--accent);
        }

        .footer-copy a {
          color: var(--accent);
          text-decoration: none;
        }

        .footer-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          border: 1px solid var(--border2);
          border-radius: 2px;
          padding: 3px 8px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .reveal.visible {
          opacity: 1;
          transform: none;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeLeft {
          from { opacity: 0; transform: translateY(-50%) translateX(20px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }

        @media (max-width: 768px) {
          .nav {
            padding: 0 20px;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding: 100px 20px 60px;
          }

          .container,
          .logos,
          .install-strip,
          .footer-inner,
          .final-banner {
            padding-left: 20px;
            padding-right: 20px;
          }

          .pgrid,
          .ll2,
          .sg,
          .cg,
          .ctai {
            grid-template-columns: 1fr;
          }

          .ll2 {
            gap: 40px;
          }

          .footer-top {
            flex-direction: column;
          }

          .footer-nav {
            gap: 32px;
            flex-wrap: wrap;
          }

          .footer-inner {
            padding-top: 40px;
            padding-bottom: 24px;
          }

          .logos {
            padding-top: 24px;
            padding-bottom: 24px;
          }

          .pcol,
          .step,
          .ci2,
          .ctac {
            padding-left: 20px;
            padding-right: 20px;
          }

          .ctac {
            flex-wrap: wrap;
          }

          .ctac-ar {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  )
}
