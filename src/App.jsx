/**
 * The terminal window:
 *   - a title bar with the theme and ? buttons
 *   - the log: every command that was run, and what it printed
 *   - at the bottom, quick-command buttons and the input where you type
 */

const TYPING_SPEED = 40; // milliseconds per letter, when a clicked command "types itself"

// Phones and tablets: there, focusing the input would pop up the keyboard.
const isTouchScreen = window.matchMedia('(pointer: coarse)').matches;

// Every block in the log needs its own id, so React can tell them apart.
let nextEntryId = 1;

/**
 * Reads the command from the address bar, so links like jakupjakupi.com/#/about work.
 *   "#/about"            → "/about"
 *   "#/projects/jakostore" → "/project jakostore"
 */
function commandFromUrl() {
  const parts = window.location.hash.split('/'); // "#/projects/jakostore" → ["#", "projects", "jakostore"]
  const page = parts[1];
  const slug = parts[2];

  if (!page) {
    return '';
  }
  if (page === 'projects' && slug) {
    return '/project ' + slug;
  }
  return '/' + page;
}

/** Shows the current page in the address bar and the tab title, so the link can be shared. */
function updateUrl(name, argument) {
  const pages = ['about', 'projects', 'experience', 'education', 'skills', 'languages', 'contact'];

  if (name === 'project' && findProject(argument)) {
    window.history.replaceState(null, '', '#/projects/' + argument);
    document.title = argument + ' ~ ' + profile.name;
  }
  if (pages.includes(name)) {
    window.history.replaceState(null, '', '#/' + name);
    document.title = name + ' ~ ' + profile.name;
  }
}

/** The theme picked on an earlier visit. (index.html already put it on the page as data-theme.) */
function savedTheme() {
  const theme = document.documentElement.dataset.theme;
  return themeExists(theme) ? theme : 'dark';
}

/** The "jakup@portfolio ~ ❯" in front of every command. */
function PromptSign() {
  return (
    <span className="prompt-sign" aria-hidden="true">
      <span className="prompt-sign__user hide-on-phone">jakup@portfolio </span>
      <span className="prompt-sign__path">~ </span>
      <span className="prompt-sign__arrow">❯ </span>
    </span>
  );
}

/** One block in the log: the command, and what it printed. */
function LogEntry({ entry }) {
  // A clicked command types itself one letter at a time (an animation in style.css),
  // and what it prints waits until the typing is done.
  let typingTime = 0;
  if (entry.animate) {
    typingTime = entry.command.length * TYPING_SPEED;
  }

  return (
    <>
      {entry.command && (
        <p className="entry__prompt">
          <PromptSign />
          {entry.animate ? (
            // --letters and --time are CSS variables, used by the typing animation in style.css
            <span className="typing" style={{ '--letters': entry.command.length, '--time': typingTime + 'ms' }}>
              {entry.command}
            </span>
          ) : (
            entry.command
          )}
        </p>
      )}
      <div className="entry__output" style={{ '--delay': typingTime + 'ms' }}>
        {entry.output}
      </div>
    </>
  );
}

function App() {
  // Everything in the log. The welcome screen is there from the start.
  const [entries, setEntries] = useState([{ id: 0, output: <Welcome /> }]);
  // What is written in the input right now.
  const [draft, setDraft] = useState('');
  // The colour theme.
  const [theme, setTheme] = useState(savedTheme);
  // Commands run so far, so ↑ and ↓ can bring them back. Refs, because changing them redraws nothing.
  const pastCommands = useRef([]);
  const pastIndex = useRef(0);

  const inputRef = useRef(null); // the <input> at the bottom
  const helpRef = useRef(null); // the ? menu (a <dialog>)
  const lastEntryRef = useRef(null); // the newest block in the log

  /**
   * Runs a command, e.g. runCommand('/project jakostore', 'click').
   * `source` is 'click' when it came from a button, or 'keyboard' when it was typed.
   * It only uses refs and set… functions, so the same function works on every render (useCallback keeps it).
   */
  const runCommand = useCallback((text, source) => {
    const commandText = text.trim();
    if (commandText === '') {
      return;
    }

    // Split "/project jakostore" into the name "project" and the argument "jakostore".
    const words = commandText.toLowerCase().split(' ').filter((word) => word !== '');
    const name = words[0].replace('/', '');
    const argument = words[1] || '';

    // Remember it, so ↑ and ↓ can bring it back.
    pastCommands.current.push(commandText);
    pastIndex.current = pastCommands.current.length;

    // Close the ? menu, in case the command was clicked there.
    closeHelp();

    if (source === 'keyboard') {
      setDraft('');
    }

    // After a click on a computer, put the cursor back in the input.
    // (Not on phones — there it would pop up the keyboard.)
    if (source === 'click' && !isTouchScreen) {
      inputRef.current.focus();
    }

    if (name === 'clear') {
      setEntries([]);
      return;
    }

    if (name === 'theme' && themeExists(argument)) {
      changeTheme(argument);
    }

    const newEntry = {
      id: nextEntryId,
      command: commandText,
      output: getOutput(name, argument),
      animate: source === 'click',
    };
    nextEntryId = nextEntryId + 1;
    // (entries) => … always adds to the newest log, even when two commands run right after each other.
    setEntries((entries) => [...entries, newEntry]);
    updateUrl(name, argument);
  }, []);

  function changeTheme(name) {
    setTheme(name);
    document.documentElement.dataset.theme = name;
    try {
      localStorage.setItem('theme', name); // remember it for the next visit
    } catch (error) {
      // Some browsers block storage. The theme still changes, it just isn't remembered.
    }
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the form from reloading the page
    runCommand(draft, 'keyboard');
  }

  // ↑ and ↓ bring back commands you ran before, like in a real terminal.
  function handleKeyDown(event) {
    const past = pastCommands.current;
    if (event.key === 'ArrowUp' && pastIndex.current > 0) {
      event.preventDefault();
      pastIndex.current = pastIndex.current - 1;
      setDraft(past[pastIndex.current]);
    }
    if (event.key === 'ArrowDown' && pastIndex.current < past.length) {
      event.preventDefault();
      pastIndex.current = pastIndex.current + 1;
      setDraft(past[pastIndex.current] || '');
    }
  }

  // Old phones (iOS before 15.4) have no <dialog> functions, so fall back to the `open` attribute.
  function openHelp() {
    const dialog = helpRef.current;
    if (dialog.showModal) {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function closeHelp() {
    const dialog = helpRef.current;
    if (!dialog || !dialog.open) {
      return;
    }
    if (dialog.close) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  // A click on the dark area around the ? menu counts as a click on the <dialog> itself.
  function closeHelpOnOutsideClick(event) {
    if (event.target === helpRef.current) {
      closeHelp();
    }
  }

  // When the page opens with an address like #/about, run that command.
  useEffect(() => {
    const command = commandFromUrl();
    if (command !== '') {
      runCommand(command, 'click');
    }
  }, []);

  // When a link like #/projects is opened while the site is already open, run that command too.
  useEffect(() => {
    function handleHashChange() {
      const command = commandFromUrl();
      if (command !== '') {
        runCommand(command, 'click');
      }
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // When a new block is added, scroll it to the top of the screen.
  useEffect(() => {
    if (lastEntryRef.current) {
      lastEntryRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [entries]);

  // Shared with every component. useMemo keeps the same object until the theme changes,
  // so the pages in the log are only redrawn when they need to be.
  const shared = useMemo(() => ({ runCommand, theme }), [runCommand, theme]);

  return (
    <TerminalContext.Provider value={shared}>
      <div className="app">
        <header className="titlebar">
          <span className="titlebar__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="titlebar__title">
            <Logo small /> jakup@portfolio: ~ <span className="dim hide-on-phone">— zsh</span>
          </span>
          <span className="titlebar__buttons">
            <button type="button" className="titlebar__button" onClick={() => runCommand('/themes', 'click')}>
              <Icon name="palette" />
              <span className="hide-on-phone">{theme}</span>
            </button>
            <button type="button" className="titlebar__button titlebar__help" onClick={openHelp} aria-label="Show all commands">
              ?
            </button>
          </span>
        </header>

        <main className="log" aria-live="polite">
          {entries.map((entry, index) => {
            const isLast = index === entries.length - 1;
            return (
              <section className="entry" key={entry.id} ref={isLast ? lastEntryRef : null}>
                <LogEntry entry={entry} />
              </section>
            );
          })}
        </main>

        <footer className="dock">
          <nav className="chips" aria-label="Quick commands">
            {quickCommands.map((name) => (
              <CommandButton key={name} command={'/' + name} className="chip" />
            ))}
          </nav>
          <form className="prompt" onSubmit={handleSubmit}>
            <PromptSign />
            <input
              ref={inputRef}
              className="prompt__input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type /help or a command…"
              aria-label="Command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              enterKeyHint="go"
              autoFocus={!isTouchScreen}
            />
          </form>
        </footer>

        {/* The ? menu: every command as a button. A <dialog> closes by itself when you press Esc. */}
        <dialog ref={helpRef} className="help" aria-label="All commands" onClick={closeHelpOnOutsideClick}>
          <div className="help__head">
            <strong>Commands</strong>
            <button type="button" className="help__close" onClick={closeHelp} aria-label="Close">
              <Icon name="close" />
            </button>
          </div>
          <ul className="help__list">
            {commandList.map((command) => (
              <li key={command.name}>
                <CommandButton command={'/' + command.name} className="help__item">
                  <span className="accent">/{command.name}</span>
                  <span className="muted">{command.description}</span>
                </CommandButton>
              </li>
            ))}
          </ul>
          <p className="help__foot dim">Type a command and press Enter · ↑ ↓ for history</p>
        </dialog>
      </div>
    </TerminalContext.Provider>
  );
}

// Start the app inside <div id="root"> in index.html.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
