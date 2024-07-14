

export default {
  '**/*.{ts,tsx}': async (files) => {

    return [`npm run lint ${files}`];
  },
};