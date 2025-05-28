import bcrypt from 'bcryptjs';

const hashed = '$2b$10$OVeq0mAJubUaHEbZHZpgsueJ0PY9QFAEhjtCxDHc1JWL0BpSweuzi';
const plain = 'bhanu';

bcrypt.compare(plain, hashed).then(match => {
  console.log('Does password match?', match);
});
