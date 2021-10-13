import * as chalk from 'chalk';
import {NO_LICENSE} from './consts';
import type {LicenseMap} from './consts';

export const logLicenseInformation = (licenseMap: LicenseMap) => {
  console.log(chalk.green(`💬 Found ${licenseMap.size} licenses.`));

  licenseMap.forEach((value, key) => {
    if (key === NO_LICENSE) {
      return;
    }
    console.log(`  -- ${value.size} dependencies with license "${key}".`);
  });

  const noLicense = licenseMap.get(NO_LICENSE) ?? new Set();
  console.log(
    `⚠️  ${chalk.yellow(
      `Could not find a license for ${noLicense.size} dependencies:`
    )}`
  );
  noLicense.forEach((dep: string) => console.log(`  -- ${dep}`));
};
