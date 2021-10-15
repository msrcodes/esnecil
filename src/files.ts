import {readFileSync} from 'fs';
import {sync} from 'glob';
import {LicenseMap, NO_LICENSE} from './consts';

interface OldLicense {
  type: string;
  url: string;
}

interface PackageFile {
  license?: string | OldLicense;
  licenses?: [OldLicense];
}

const parseLicense = ({license, licenses}: PackageFile): string => {
  let parsedLicense = NO_LICENSE;

  if (typeof license === 'string') {
    parsedLicense = license;
  } else if (license?.type) {
    parsedLicense = license.type;
  } else if (licenses) {
    const types = licenses.map(({type}) => type);
    if (types.length === 1) {
      parsedLicense = types[0];
    } else {
      parsedLicense = `(${types.join(' OR ')})`;
    }
  }

  return parsedLicense;
};

const parsePackageFile = (path: string) => {
  const fileContent = readFileSync(path).toString();
  const pkgFile = JSON.parse(fileContent) as PackageFile;

  const license = parseLicense(pkgFile);

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
