import {readFileSync} from 'fs';
import {sync} from 'glob';
import {LicenseMap, NO_LICENSE} from './consts';

const parsePackageFile = (path: string) => {
  const fileContent = readFileSync(path).toString();
  let {license} = JSON.parse(fileContent);

  license = license?.type ?? license ?? NO_LICENSE;

  return {name: `./${path}`, license};
};

export const getAllPackageFiles = (
  globString = 'node_modules/**/package.json'
): LicenseMap => {
  const matches = sync(globString);

  const licenseToNames = new Map<string, Set<string>>();

  matches.forEach(path => {
    const {name, license} = parsePackageFile(path);

    const current = licenseToNames.get(license);
    if (current) {
      current.add(name);
      licenseToNames.set(license, current);
      return;
    }

    const newSet = new Set<string>();
    newSet.add(name);
    licenseToNames.set(license, newSet);

    return licenseToNames;
  });

  return licenseToNames;
};
