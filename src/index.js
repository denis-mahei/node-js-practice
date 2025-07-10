import express from 'express';

const exp = express();

const PORT = 3000;

exp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
