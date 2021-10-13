import {getAllPackageFiles} from './files';
import {logLicenseInformation} from './licenses';

const main = () => {
  console.log(
    '✨ Running search for package.json files in your node_modules directory.'
  );
  const licenseToNames = getAllPackageFiles();
  console.log('🎉 Success! Interpretting data...');

  if (!licenseToNames) return;
  logLicenseInformation(licenseToNames);
};

main();
