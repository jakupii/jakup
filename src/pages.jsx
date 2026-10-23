/**
 * What every command prints.
 * To add a command: write a component for it, add it to `commandList`,
 * and add a `case` for it in getOutput() at the bottom of this file.
 */

/* ── Welcome: shown when the site opens, like the `neofetch` program ── */

// My name in big block letters, one line of text per row.
const LOGO = [
  '     ██╗ █████╗ ██╗  ██╗██╗   ██╗██████╗',
  '     ██║██╔══██╗██║ ██╔╝██║   ██║██╔══██╗',
  '     ██║███████║█████╔╝ ██║   ██║██████╔╝',
  '██   ██║██╔══██║██╔═██╗ ██║   ██║██╔═══╝',
  '╚█████╔╝██║  ██║██║  ██╗╚██████╔╝██║',
  ' ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝',
  '',
  '     ██╗ █████╗ ██╗  ██╗██╗   ██╗██████╗ ██╗',
  '     ██║██╔══██╗██║ ██╔╝██║   ██║██╔══██╗██║',
  '     ██║███████║█████╔╝ ██║   ██║██████╔╝██║',
  '██   ██║██╔══██║██╔═██╗ ██║   ██║██╔═══╝ ██║',
  '╚█████╔╝██║  ██║██║  ██╗╚██████╔╝██║     ██║',
  ' ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝',
];

// The time the page was opened, e.g. "Mon Oct 12 2026 18:24:03"
const openedAt = new Date().toString().slice(0, 24);

function Welcome() {
  const { theme } = useContext(TerminalContext);
  const languageNames = languages.map((language) => language.name);

  return (
    <>
      <p className="dim">Last login: {openedAt} on ttys001</p>

      <div className="fetch">
        <pre className="logo" role="img" aria-label={profile.name}>{LOGO.join('\n')}</pre>

        <div>
          <p className="fetch__host">
            <span className="accent">jakup</span>
            <span className="dim">@</span>
            portfolio
          </p>
          <dl className="info info--fetch">
            <InfoRow label="name">{profile.name}</InfoRow>
            <InfoRow label="role">{profile.title}</InfoRow>
            <InfoRow label="location">{profile.location}</InfoRow>
            <InfoRow label="degree">{education[0].degree}</InfoRow>
            <InfoRow label="focus">{profile.focus}</InfoRow>
            <InfoRow label="projects">
              <CommandButton command="/projects">{projects.length} live websites</CommandButton>
            </InfoRow>
            <InfoRow label="speaks">{languageNames.join(', ')}</InfoRow>
            <InfoRow label="status">
              <span className="status-dot">●</span> available for work
            </InfoRow>
            <InfoRow label="theme">
              <CommandButton command="/themes">{theme}</CommandButton>
            </InfoRow>
          </dl>
          {/* a row of the theme's colours */}
          <p className="fetch__colors" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i />
          </p>
        </div>
      </div>

      <p className="lead">
        Hi, I’m Jakup — I build websites for businesses and help people with IT. Click a command below or type one:
        start with <CommandButton command="/about" /> or <CommandButton command="/projects" />, or
        press <CommandButton command="/help">?</CommandButton> to see them all.
      </p>
    </>
  );
}

/* ── /help ── */

function Help() {
  return (
    <>
      <p className="muted">Available commands — click one, or type it:</p>
      <dl className="info">
        {commandList.map((command) => (
          <InfoRow key={command.name} label={<CommandButton command={'/' + command.name} />}>
            <span className="muted">{command.description}</span>
          </InfoRow>
        ))}
      </dl>
      <p className="dim">Also: /project &lt;name&gt; · /theme &lt;name&gt; · ↑ ↓ for history</p>
    </>
  );
}

/* ── /about ── */

function About() {
  const degree = education[0];

  return (
    <>
      {/* my logo, big, next to my name */}
      <div className="about-head">
        <Logo />
        <div>
          <h2>{profile.name}</h2>
          <p className="muted">{profile.title}</p>
        </div>
      </div>
      {profile.about.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <dl className="info">
        <InfoRow label="focus">{profile.focus}</InfoRow>
        <InfoRow label="studied">{degree.degree} — {degree.school}</InfoRow>
        <InfoRow label="based in">{profile.location}</InfoRow>
        <InfoRow label="status">
          <span className="status-dot">●</span> {profile.availability}
        </InfoRow>
      </dl>
      <NextCommands names={['experience', 'skills', 'projects', 'contact']} />
    </>
  );
}

/* ── /experience: my jobs, drawn like `git log` ── */

function Experience() {
  return (
    <>
      <ol className="git-log">
        {experience.map((job, index) => (
          <li key={job.hash}>
            <p>
              <span className="git-log__hash">{job.hash}</span>
              {/* the newest job is marked like the newest git commit */}
              {index === 0 && <span className="git-log__branch"> (HEAD -&gt; main)</span>}{' '}
              <strong>{job.role}</strong> <span className="muted">— {job.employer}</span>
            </p>
            <p className="muted">
              {job.start} – {job.end || 'present'} · {job.type} · {job.mode}
            </p>
            {/* the projects I built in this job */}
            {job.projects && (
              <p className="button-row">
                <span className="dim">projects:</span>
                {job.projects.map((slug) => (
                  <CommandButton key={slug} command={'/project ' + slug}>{slug}/</CommandButton>
                ))}
              </p>
            )}
          </li>
        ))}
      </ol>
      <NextCommands names={['education', 'skills', 'projects']} />
    </>
  );
}

/* ── /education: my schools, drawn like `tree` (the lines come from style.css) ── */

function Education() {
  return (
    <>
      <div className="tree">
        <p className="tree__folder">education/</p>
        <ul>
          {education.map((school) => (
            <li key={school.school}>
              <span className="tree__folder">{school.school}</span>
              <ul>
                <li>{school.degree}</li>
                <li className="muted">{school.start} – {school.end}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <NextCommands names={['experience', 'languages', 'contact']} />
    </>
  );
}

/* ── /skills: drawn like a JSON file (the { } and commas come from style.css) ── */

function Skills() {
  const groups = Object.keys(skills); // ['frontend', 'backend', 'databases', …]

  return (
    <>
      <div className="json">
        {groups.map((group) => (
          <div className="json__group" key={group}>
            <span className="json__key">"{group}"</span>
            <span className="dim">: [</span>
            <ul>
              {skills[group].map((skill) => (
                <li className="json__string" key={skill}>"{skill}"</li>
              ))}
            </ul>
            <span className="dim json__close">]</span>
          </div>
        ))}
      </div>
      <NextCommands names={['languages', 'projects', 'contact']} />
    </>
  );
}

/* ── /languages: the languages I speak, with a meter from 1 to 5 ── */

function Languages() {
  return (
    <>
      <ul>
        {languages.map((language) => (
          <li className="meter" key={language.name}>
            <span>{language.name}</span>
            <span role="img" aria-label={language.level + ' out of 5'}>
              <span className="dim">[</span>
              <span className="accent">{'■'.repeat(language.level)}</span>
              <span className="dim">{'□'.repeat(5 - language.level)}]</span>
            </span>
            <span className="meter__label muted">{language.proficiency}</span>
          </li>
        ))}
      </ul>
      <NextCommands names={['about', 'projects', 'contact']} />
    </>
  );
}

/* ── /projects: every project as a card with a screenshot ── */

function Projects() {
  return (
    <>
      <p>
        Websites I’ve built as a <CommandButton command="/experience">freelance web & WordPress developer</CommandButton> — for
        businesses around the WORLD.
      </p>
      <ul className="cards">
        {projects.map((project) => (
          <li key={project.slug}>
            <CommandButton command={'/project ' + project.slug} className="card">
              <Screenshot project={project} alt="" sizes="(max-width: 760px) 100vw, 400px" />
              <span className="card__body">
                <span className="card__name"><Icon name="folder" />{project.slug}/</span>
                <span className="card__domain">{project.domain}</span>
                <span className="card__type">{project.category}</span>
              </span>
            </CommandButton>
          </li>
        ))}
      </ul>
      <p className="dim">Click a project, or type /project &lt;name&gt;</p>
    </>
  );
}

/**
 * A project's screenshot. The browser picks the small (640 wide) or big (1280 wide) file,
 * whichever is enough for the space it gets — `sizes` says how wide that space is.
 */
function Screenshot({ project, alt, sizes }) {
  const file = '/assets/projects/' + project.slug;
  const version = '.webp?v=' + screenshotVersion;

  return (
    <img
      src={file + version}
      srcSet={file + '-640' + version + ' 640w, ' + file + version + ' 1280w'}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      width="1280"
      height="800"
    />
  );
}

/** Finds a project by its slug, e.g. findProject('jakostore'). Gives back undefined if there is none. */
function findProject(slug) {
  return projects.find((project) => project.slug === slug);
}

/** Finds the job I built a project in, e.g. findJob('jakostore'). Gives back undefined if there is none. */
function findJob(slug) {
  return experience.find((job) => job.projects && job.projects.includes(slug));
}

/* ── /project <name>: one project in detail ── */

function Project({ slug }) {
  const project = findProject(slug);

  // No project with that name? Show the list instead.
  if (!project) {
    return <Projects />;
  }

  const url = 'https://' + project.domain;
  const job = findJob(slug);

  // The projects before and after this one. After the last project comes the first one again.
  const index = projects.indexOf(project);
  const isFirst = index === 0;
  const isLast = index === projects.length - 1;
  const previous = isFirst ? projects[projects.length - 1] : projects[index - 1];
  const next = isLast ? projects[0] : projects[index + 1];

  return (
    <>
      <div>
        <h2>{project.name}</h2>
        <p className="muted">{project.summary}</p>
      </div>

      <div className="project">
        {/* the screenshot, framed like a browser window */}
        <Link className="shot" href={url}>
          <span className="shot__bar" aria-hidden="true">
            <span className="shot__dots"><i /><i /><i /></span>
            {url}
          </span>
          <Screenshot project={project} alt={'Screenshot of the ' + project.name + ' website'} sizes="(min-width: 1000px) 640px, 100vw" />
        </Link>

        <div className="project__text">
          <p>{project.description}</p>
          <ul className="list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <dl className="info">
            <InfoRow label="url">
              <Link href={url}>{project.domain}</Link>
            </InfoRow>
            <InfoRow label="type">{project.category}</InfoRow>
            {project.location && <InfoRow label="location">{project.location}</InfoRow>}
            <InfoRow label="languages">{project.languages.join(', ')}</InfoRow>
            {project.stack.length > 0 && <InfoRow label="stack">{project.stack.join(', ')}</InfoRow>}
            {job && (
              <InfoRow label="experience">
                <CommandButton command="/experience">{job.role} — {job.employer}</CommandButton>
              </InfoRow>
            )}
            <InfoRow label="status">
              <span className="status-dot">●</span> live
            </InfoRow>
          </dl>
        </div>
      </div>

      <p className="button-row">
        <Button href={url} icon="globe" primary>Visit {project.domain}</Button>
        <CommandButton command={'/project ' + previous.slug}>← {previous.slug}</CommandButton>
        <CommandButton command="/projects">all projects</CommandButton>
        <CommandButton command={'/project ' + next.slug}>{next.slug} →</CommandButton>
      </p>
    </>
  );
}

/* ── /contact ── */

/** A button that copies my email address, then says "copied" for 2 seconds. */
function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    // Some phone browsers have no clipboard, or say no — then open the email app instead.
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch (error) {
      window.location.href = 'mailto:' + profile.email;
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (copied) {
    return <Button icon="check" onClick={copyEmail}>copied</Button>;
  }
  return <Button icon="copy" onClick={copyEmail}>copy</Button>;
}

function Contact() {
  const mailto = 'mailto:' + profile.email;

  return (
    <>
      <p>
        {profile.availability} Need a new website, a fix for an existing one, or help with an IT problem? Send me a message.
      </p>
      <dl className="info">
        <InfoRow label="email">
          <Link href={mailto}>{profile.email}</Link> <CopyEmailButton />
        </InfoRow>
        {socials.map((social) => (
          <InfoRow key={social.label} label={social.label}>
            <Link href={social.url}>{social.handle}</Link>
          </InfoRow>
        ))}
        <InfoRow label="location">{profile.location}</InfoRow>
      </dl>
      <p className="button-row">
        <Button href={mailto} icon="mail" primary>Send an email</Button>
        {socials.map((social) => (
          <Button key={social.label} href={social.url} icon={social.icon}>{social.label}</Button>
        ))}
      </p>
    </>
  );
}

/* ── /themes: every theme as a little card, drawn in its own colours ── */

function Themes() {
  const { theme } = useContext(TerminalContext);

  return (
    <>
      <ul className="theme-grid">
        {themes.map((option) => {
          const isCurrent = option.name === theme;
          return (
            <li key={option.name}>
              <CommandButton command={'/theme ' + option.name} className={isCurrent ? 'theme-card theme-card--current' : 'theme-card'}>
                {/* data-theme gives this card the colours of its own theme */}
                <span className="theme-card__preview" data-theme={option.name}>
                  <span className="theme-card__name">
                    <span><span className="accent">❯</span> {option.name}</span>
                    {isCurrent && <span className="dim">✓</span>}
                  </span>
                  <span className="muted">{option.description}</span>
                  <span className="theme-card__colors" aria-hidden="true"><i /><i /><i /><i /><i /></span>
                </span>
              </CommandButton>
            </li>
          );
        })}
      </ul>
      <p className="dim">Click a theme, or type /theme &lt;name&gt;</p>
    </>
  );
}

/** Checks if there is a theme with this name, e.g. themeExists('ocean') → true */
function themeExists(name) {
  return themes.some((theme) => theme.name === name);
}

/* ── /theme <name> ── */

function ThemeChanged({ name }) {
  if (!themeExists(name)) {
    return <Themes />;
  }
  return (
    <p>
      Theme set to <span className="accent">{name}</span>.
    </p>
  );
}

/* ── A command that doesn't exist ── */

function NotFound({ name }) {
  return (
    <p>
      <span className="error">command not found: {name}</span> — type <CommandButton command="/help" /> to see all commands.
    </p>
  );
}

/* ── All commands ── */

// The commands listed in /help and in the ? menu.
const commandList = [
  { name: 'about', description: 'who I am' },
  { name: 'projects', description: 'websites I’ve built' },
  { name: 'experience', description: 'where I’ve worked' },
  { name: 'education', description: 'where I studied' },
  { name: 'skills', description: 'what I know' },
  { name: 'languages', description: 'languages I speak' },
  { name: 'contact', description: 'get in touch' },
  { name: 'themes', description: 'change the colours' },
  { name: 'help', description: 'list all commands' },
  { name: 'clear', description: 'clear the screen' },
];

// The buttons at the bottom of the terminal, to look around without typing.
const quickCommands = ['about', 'projects', 'experience', 'skills', 'contact', 'themes'];

/**
 * What a command prints.
 * `name` is the command without the slash, e.g. "project",
 * `argument` is the word after it, e.g. "jakostore" in "/project jakostore".
 */
function getOutput(name, argument) {
  switch (name) {
    case 'about':
      return <About />;
    case 'projects':
      return <Projects />;
    case 'project':
      return <Project slug={argument} />;
    case 'experience':
      return <Experience />;
    case 'education':
      return <Education />;
    case 'skills':
      return <Skills />;
    case 'languages':
      return <Languages />;
    case 'contact':
      return <Contact />;
    case 'themes':
      return <Themes />;
    case 'theme':
      return <ThemeChanged name={argument} />;
    case 'help':
      return <Help />;
    default:
      return <NotFound name={name} />;
  }
}
