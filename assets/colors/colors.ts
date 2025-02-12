const common = {
  primary: '#B847EF',
  secondary: '#19A7FD',
  white: '#FFFFFF',
  black: '#000000',
  textLight: '#424344',
  textGray: '#8A817C',
  aliceBlue: '#E9F1F7',
  success: '#AEFFB2',
  error: '#FFAEAE',
  inactiveBt: '#D7D7D7',
  inactiveTab: '#DEDEDE',
  textHash: '#455154',
  // border: '#F8F8F9',
  warning: '#FFD9E9',
  subText: '#868686',
  textColor:'#1E1E1E',

};


const light = {
  background: '#FFFFFF',
  textDark: '#1E1E1E',
  textlight: '#FFFFFF',
  inactive: 'rgba(34, 22, 98, 0.15)',
  gray:'#FBF3FF',
  card:'#FBFBFB',
  lightcard:'#FBF2FF',
  tab:'#F3F3F3',
  subtext:'#7A7A7A',
  cardBorder:'#DDDDDD',
  field: '#FAEFFF',
  inputText:'#FBFBFB',
  border:'rgba(130, 130, 130, 0.10)',
  buttonLight:'#888',
  ...common,
}

const dark = {
  background: '#0D0014',
  textDark: '#FFFFFF',
  textlight: '#1E1E1E',
  inactive: 'rgba(34, 22, 98, 0.15)',
  gray:'#2D2D2D',
  card:'#2D2D2D',
  lightcard:'#2D2D2D',
  tab:'#2D2D2D',
  subtext:'#EEEEEE',
  cardBorder:'#2D2D2D',
  field: '#2D2D2D',
  inputText:'#2D2D2D',
  border:'rgba(130, 130, 130, 0.10)',
  buttonLight:'#2D2D2D',
  ...common,
}

export default { light, dark };
