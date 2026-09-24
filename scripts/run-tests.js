const { spawnSync } = require('child_process');

const testResult = spawnSync('npx', ['playwright', 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
});

const generateResult = spawnSync(
  'npx',
  ['allure', 'generate', './allure-results', '--output', './allure-report'],
  { stdio: 'inherit', shell: true }
);

if (generateResult.status) {
  console.error('Allure 3 report generation failed.');
} else {
  console.log('Allure 3 report generated in allure-report/awesome');
}

process.exit(testResult.status ?? 1);
