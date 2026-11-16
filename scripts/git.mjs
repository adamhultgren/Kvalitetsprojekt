// Simplified git commands for the team. Run through npm scripts (see README):
//   npm run new <name>        create a new feature branch from the latest main
//   npm run save "message"    check, commit and push your branch
//   npm run update            bring what others did in main into your branch
//   npm run finish            merge your branch into main and clean up
import { spawnSync } from 'node:child_process';

const MAIN = 'main';
const [command, ...args] = process.argv.slice(2);

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function step(text) {
  console.log(`\n→ ${text}`);
}

// Runs a command and shows its output. Returns true if it succeeded.
function run(cmd, cmdArgs, { shell = false } = {}) {
  const res = spawnSync(cmd, cmdArgs, { stdio: 'inherit', shell });
  return res.status === 0;
}

const git = (...a) => run('git', a);

// Runs git and returns its output as text.
function gitOutput(...a) {
  const res = spawnSync('git', a, { encoding: 'utf8' });
  return res.status === 0 ? res.stdout.trim() : '';
}

const currentBranch = () => gitOutput('branch', '--show-current');
const hasUncommittedChanges = () => gitOutput('status', '--porcelain') !== '';

function ensure(condition, message) {
  if (!condition) fail(message);
}

function ensureFeatureBranch() {
  const branch = currentBranch();
  ensure(branch !== '', 'Du står inte på någon branch.');
  ensure(
    branch !== MAIN,
    `Du står på ${MAIN}. Byt först till din feature-branch (git switch <namn>).`,
  );
  return branch;
}

function ensureCleanWorkingTree() {
  ensure(
    !hasUncommittedChanges(),
    'Du har ändringar som inte är sparade. Kör först: npm run save "meddelande"',
  );
}

function runChecks() {
  step('Kör npm run check (lint + typecheck)');
  ensure(
    run('npm', ['run', 'check'], { shell: true }),
    'Kontrollen misslyckades. Rätta felen ovan och försök igen.',
  );
}

const CONFLICT_HELP = `Git hittade en konflikt, alltså att du och någon annan har ändrat samma rad.
  1. Öppna filerna som är markerade med C i Source Control i VS Code.
  2. Välj "Accept Current Change", "Accept Incoming Change" eller "Accept Both Changes".
  3. Spara filerna, klicka på + vid dem och klicka sedan på Commit.
  4. Kör samma npm-kommando igen.
  (Vill du avbryta helt? Kör: git merge --abort)`;

// Merges main into the branch you are on. Conflicts are resolved on your own branch.
function mergeMainIntoBranch() {
  step(`Hämtar senaste ${MAIN} från GitHub`);
  ensure(git('fetch', 'origin'), 'Kunde inte hämta från GitHub. Kontrollera internetanslutningen.');
  const before = gitOutput('rev-parse', 'HEAD');
  step(`Slår ihop origin/${MAIN} in i din branch`);
  ensure(git('merge', `origin/${MAIN}`), CONFLICT_HELP);
  installIfPackagesChanged(before);
}

// Runs npm install if package.json or package-lock.json changed since commit `before`.
function installIfPackagesChanged(before) {
  const changed = gitOutput('diff', '--name-only', before, 'HEAD').split('\n');
  if (changed.includes('package.json') || changed.includes('package-lock.json')) {
    step('Paketen har ändrats, kör npm install');
    ensure(run('npm', ['install'], { shell: true }), 'npm install misslyckades.');
  }
}

function newFeature() {
  const raw = args.join(' ');
  ensure(raw.trim() !== '', 'Ange ett namn. Exempel: npm run new login');
  const name = raw
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  ensure(name !== '', 'Namnet innehåller inga bokstäver eller siffror.');
  const branch = `feature/${name}`;
  ensureCleanWorkingTree();
  ensure(gitOutput('branch', '--list', branch) === '', `Branchen ${branch} finns redan.`);

  step(`Byter till ${MAIN} och hämtar senaste versionen`);
  ensure(git('switch', MAIN), `Kunde inte byta till ${MAIN}.`);
  const before = gitOutput('rev-parse', 'HEAD');
  ensure(git('pull'), 'Kunde inte hämta senaste versionen från GitHub.');
  installIfPackagesChanged(before);
  step(`Skapar ${branch}`);
  ensure(git('switch', '-c', branch), 'Kunde inte skapa branchen.');
  console.log(`\n✔ Klart. Du jobbar nu på ${branch}.`);
}

function save() {
  const branch = ensureFeatureBranch();
  const message = args.join(' ').trim();
  if (hasUncommittedChanges()) {
    ensure(message !== '', 'Skriv ett meddelande. Exempel: npm run save "Lägger till inloggning"');
    runChecks();
    step('Sparar (commit)');
    ensure(git('add', '-A'), 'git add misslyckades.');
    ensure(
      git('commit', '-m', message),
      'Committen avbröts, troligen av kontrollen i hooken. Rätta felen ovan och kör igen.',
    );
  } else {
    console.log('\nInga nya ändringar att spara. Pushar det som redan är committat.');
  }
  step(`Skickar upp ${branch} till GitHub`);
  ensure(git('push', '-u', 'origin', 'HEAD'), 'Push misslyckades.');
  console.log('\n✔ Sparat och uppskickat.');
}

function update() {
  ensureFeatureBranch();
  ensureCleanWorkingTree();
  mergeMainIntoBranch();
  console.log(`\n✔ Din branch har nu allt som finns i ${MAIN}.`);
}

function finish() {
  const branch = ensureFeatureBranch();
  ensureCleanWorkingTree();
  mergeMainIntoBranch();
  runChecks();

  step(`Skickar upp ${branch}`);
  ensure(git('push', '-u', 'origin', 'HEAD'), 'Push misslyckades.');
  step(`Byter till ${MAIN} och lägger in ${branch}`);
  ensure(git('switch', MAIN), `Kunde inte byta till ${MAIN}.`);
  ensure(git('pull'), 'Kunde inte hämta senaste versionen från GitHub.');
  ensure(git('merge', branch), `Kunde inte slå ihop ${branch}. Kör: git merge --abort`);
  ensure(git('push', 'origin', MAIN), `Kunde inte pusha ${MAIN}. Kör npm run finish igen.`);

  step(`Tar bort ${branch}`);
  git('branch', '-d', branch);
  git('push', 'origin', '--delete', branch);
  console.log(`\n✔ Klart. ${branch} ligger nu i ${MAIN}. Du står på ${MAIN}.`);
}

const commands = { new: newFeature, save, update, finish };

if (!commands[command]) {
  console.log(`Använd ett av dessa kommandon:
  npm run new <name>        skapa en ny feature-branch
  npm run save "message"    kontrollera, committa och pusha
  npm run update            hämta in andras ändringar från main
  npm run finish            lägg in din branch i main`);
  process.exit(command ? 1 : 0);
}

commands[command]();
