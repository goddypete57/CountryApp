const common = {
  white: '#B847EF',
  // transwhite: 'rgba(255, 255, 255, 0.3)',
  border: 'rgba(169, 184, 212, 1)',
};

const light = {
  background: '#FFFFFF',
  text: '#1C1917',
  textlight: '#667085',
  someText: '#D0D5DD',
  thembackground: 'rgba(252, 252, 253, 1)',
  searchText: 'rgba(102, 112, 133, 1)',
  searchbackground: 'rgba(242, 244, 247, 1)',
  ...common,
};

const dark = {
  background: 'rgba(0, 15, 36, 1)',
  text: '#F2F4F7',
  textlight: '#98A2B3',
  someText: '#000000',
  thembackground: 'rgba(152, 162, 179, 0.2)',
  searchText: 'rgba(234, 236, 240, 1)',
  searchbackground: 'rgba(152, 162, 179, 0.2)',
  ...common,
};

export default {light, dark};
