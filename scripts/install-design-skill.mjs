import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const option = (name) => { const i = args.indexOf(name); return i < 0 ? undefined : args[i + 1]; };
const agent = option('--agent');
const mappings = { claude: '.claude', cursor: '.cursor', codex: '.agents' };
if (!Object.hasOwn(mappings, agent)) throw new Error('Use --agent claude|cursor|codex');
if (args.includes('--global') && option('--project')) throw new Error('Choose --global or --project, not both.');
const base = args.includes('--global') ? os.homedir() : path.resolve(option('--project') || process.cwd());
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../skills/signature-web-design');
const destination = path.join(base, mappings[agent], 'skills', 'signature-web-design');
if (fs.existsSync(destination)) throw new Error(`Already installed: ${destination}. Preserve or remove your existing copy before reinstalling.`);
if (destination.startsWith(source + path.sep)) throw new Error('Destination cannot be inside the skill source.');
if (args.includes('--dry-run')) { console.log(`Would copy ${source} to ${destination}`); }
else { fs.mkdirSync(path.dirname(destination), { recursive: true }); fs.cpSync(source, destination, { recursive: true, errorOnExist: true, force: false }); console.log(`Installed: ${destination}`); }
