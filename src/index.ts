import {readFileSync} from 'fs';
import {Glob} from 'glob';

const glob = new Glob('node_modules/**/package.json', error => {
  if (error) {
    console.error({error});
    return;
  }
});

const licenseToNames = new Map<string, Set<string>>();

const handleInput = (matchPath: string) => {
  const fileContent = readFileSync(matchPath).toString();
  const {name, license} = JSON.parse(fileContent);

  const current = licenseToNames.get(license);

  if (current) {
    current.add(name);
    licenseToNames.set(license, current);
    return;
  }

  const newSet = new Set<string>();
  newSet.add(name);
  licenseToNames.set(license, newSet);
};

glob.on('end', (matches: string[]) => {
  // store to map
  matches.forEach(handleInput);

  // print to console
  // TODO: this, but useful
  licenseToNames.forEach((value, key) => {
    console.log(`${key} has ${value.size} packages.`);
  });
});

export default glob;
