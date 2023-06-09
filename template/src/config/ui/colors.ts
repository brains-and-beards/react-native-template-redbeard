enum Palette {
  BLACK = '#1d1d1d',
  WHITE = '#ffffff',
  OFF_WHITE = '#e6e6e6',
  ORANGE = '#FBA928',
  ORANGE_DARKER = '#EB9918',
  LIGHT_GREY = '#939AA4',
  ANGRY = '#dd3333',
  DEEP_PURPLE = '#5D2555',
  TRANSPARENT = 'rgba(0, 0, 0, 0)',
}

const Colors = {
  palette: Palette,
  primary: Palette.ORANGE,
  onPrimary: Palette.WHITE,
  secondary: Palette.DEEP_PURPLE,
  onSecondary: Palette.WHITE,
  background: Palette.LIGHT_GREY,
  onBackground: Palette.WHITE,
  surface: Palette.OFF_WHITE,
  onSurface: Palette.BLACK,
  inputBackground: Palette.WHITE,
  onInputBackground: Palette.BLACK,
  error: Palette.ANGRY,
  onError: Palette.WHITE,
  transparent: Palette.TRANSPARENT,
}

export default Colors
