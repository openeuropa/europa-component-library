// Simple content for demo
const publicUrl = process.env.PUBLIC_URL || '';
const exampleLink = `${publicUrl}/example`;

module.exports = {
  link: {
    label: 'The European Union',
    path: exampleLink,
    negative: true,
  },
};
