// Create this as check-models.js
const fs = require('fs');
const path = require('path');

console.log('Current directory:', process.cwd());
console.log('Checking models directory...\n');

const modelsPath = path.join(__dirname, 'models');

try {
  const files = fs.readdirSync(modelsPath);
  console.log('Models found:');
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
} catch (error) {
  console.error('Error reading models directory:', error.message);
  console.log('\nChecking for nested models directory...');
  
  // Check if we're in pet-management-system and models is in parent
  const parentModelsPath = path.join(__dirname, '..', 'models');
  try {
    const files = fs.readdirSync(parentModelsPath);
    console.log('Models found in parent directory:');
    files.forEach(file => {
      console.log(`  - ${file}`);
    });
  } catch (error) {
    console.error('No models directory found');
  }
}