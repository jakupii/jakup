/**
 * Small building blocks used by the pages: icons, links, buttons and info rows.
 */

// The React functions this site uses. React itself is loaded by a <script> tag in index.html.
const { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } = React;

/**
 * The terminal shares two things with every component inside it:
 *   runCommand(text, source) — runs a command, e.g. runCommand('/about', 'click')
 *   theme                    — the name of the current colour theme, e.g. 'dark'
 * A component gets them like this: const { runCommand, theme } = useContext(TerminalContext);
 */
const TerminalContext = createContext(null);

/* Icons: small 24×24 drawings. Use one with <Icon name="mail" />. */
const ICONS = {
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor" stroke="none" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" strokeWidth="3" />
    </>
  ),
  facebook: <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H6v4h2v7h4v-7h2.5l.5-4h-3V7.8c0-.5.3-.8.8-.8H15z" />,
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2z" />
      <path d="M7.5 11.5h.01M10 7.5h.01M14.5 7.5h.01" strokeWidth="3" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
};

/** An icon. It takes the colour of the text around it. */
function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/**
 * My logo: an Enter key. It is drawn in the theme's text and background colours (see .mark in style.css),
 * so it is white on dark themes and black on light ones. The files for other uses are in the logo folder.
 * `small` leaves out the thin line around the key, so it stays sharp at icon size (like the favicon).
 */
function Logo({ small }) {
  if (small) {
    return (
      <svg className="mark mark--small" viewBox="2 2 96 96" aria-hidden="true">
        <rect className="mark__key" x="2" y="2" width="96" height="96" rx="24" />
        <g className="mark__line" fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M62,26.5 V50.5 A12,12 0 0 1 50,62.5 H38" />
          <path d="M47,53.5 L38,62.5 L47,71.5" />
        </g>
      </svg>
    );
  }
  return (
    <svg className="mark" viewBox="2 2 96 96" role="img" aria-label={profile.name + ' logo'}>
      <rect className="mark__key" x="2" y="2" width="96" height="96" rx="24" />
      <rect className="mark__key mark__line" x="10" y="7" width="80" height="78" rx="17" strokeWidth="3" />
      <g className="mark__line" fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M62,22.5 V46.5 A12,12 0 0 1 50,58.5 H38" />
        <path d="M47,49.5 L38,58.5 L47,67.5" />
      </g>
    </svg>
  );
}

/** A link. Links to other websites (https://…) open in a new tab. */
function Link({ href, className = 'link', children }) {
  if (href.startsWith('http')) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

/**
 * A button with an icon, e.g. <Button icon="mail" href="mailto:…">Send an email</Button>
 * With `href` it is a link, without it a normal button.
 * `primary` fills it with the accent colour.
 */
function Button({ href, icon, primary, onClick, children }) {
  const className = primary ? 'btn btn--primary' : 'btn';

  if (href) {
    return (
      <Link className={className} href={href}>
        <Icon name={icon} />
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      <Icon name={icon} />
      {children}
    </button>
  );
}

/**
 * Text you can click to run a command, e.g. <CommandButton command="/about" />.
 * It shows the command, or the text you put inside it.
 */
function CommandButton({ command, className = 'link', children }) {
  const { runCommand } = useContext(TerminalContext);

  return (
    <button type="button" className={className} onClick={() => runCommand(command, 'click')}>
      {children || command}
    </button>
  );
}

/** A "next:" line with commands to try after this one, e.g. <NextCommands names={['skills', 'contact']} /> */
function NextCommands({ names }) {
  return (
    <p className="button-row">
      <span className="dim">next:</span>
      {names.map((name) => (
        <CommandButton key={name} command={'/' + name} />
      ))}
    </p>
  );
}

/** One "label   value" line. Put a few of them inside <dl className="info">. */
function InfoRow({ label, children }) {
  return (
    <div className="info__row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
