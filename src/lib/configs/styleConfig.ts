import { ThemeConfig } from 'antd';
import colors from '../../constants/colors';

const AntThemeConfig: ThemeConfig = {
  token: { colorPrimary: colors.primary, fontFamily: 'Manrope, sans-serif' },
  components: {
    Menu: {
      iconSize: 24,
      collapsedIconSize: 18,
      itemMarginBlock: 10,
    },
    Input: {
      addonBg: 'white',
    },
  },
};

export default AntThemeConfig;
