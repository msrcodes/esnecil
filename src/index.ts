import * as chalk from 'chalk';
import {readFileSync} from 'fs';
import {Glob} from 'glob';

console.log(
  '✨ Running search for package.json files in your node_modules directory.'
);

const glob = new Glob('node_modules/**/package.json', error => {
  if (error) {
    console.error(chalk.red(error));
    return;
  }
});

console.log('🎉 Success! Interpretting data...');

const licenseToNames = new Map<string, Set<string | undefined>>();

const handleInput = (matchPath: string) => {
  const fileContent = readFileSync(matchPath).toString();
  const {license} = JSON.parse(fileContent);
  const name = matchPath.replace(/(node_modules\/)|(\/package\.json)/gi, '');

  const parsedLicense = license ?? 'NONE';

  const current = licenseToNames.get(parsedLicense);

  if (current) {
    current.add(name);
    licenseToNames.set(parsedLicense, current);
    return;
  }

  const newSet = new Set<string>();
  newSet.add(name);
  licenseToNames.set(parsedLicense, newSet);
};

glob.on('end', (matches: string[]) => {
  // store to map
  matches.forEach(handleInput);

  console.log(`💬 Found ${licenseToNames.size} licenses.`);

  // print to console
  // TODO: this, but useful
  licenseToNames.forEach((value, key) => {
    if (key === 'NONE') {
      return;
    }
    console.log(`-- ${value.size} dependencies have license "${key}".`);
  });

  const noLicense = licenseToNames.get('NONE') ?? new Set();
  console.log(
    `-- ⚠️  ${chalk.yellow(
      `${noLicense.size} dependencies do not have a license:`
    )}`
  );
  noLicense.forEach(dep => console.log(`  -- ${dep}`));
});

export default glob;
