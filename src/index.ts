#! /usr/bin/env node
import {program} from 'commander';

import {getAllPackageFiles} from './files';
import {logLicenseInformation} from './licenses';

const printLicenses = () => {
  console.log(
    '✨ Running search for package.json files in your node_modules directory.'
  );
  const licenseToNames = getAllPackageFiles();
  console.log('🎉 Success! Interpretting data...');

  if (!licenseToNames) return;
  logLicenseInformation(licenseToNames);
};

program
  .command('list')
  .description('List all licenses in this project.')
  .action(printLicenses);

program.parse();
