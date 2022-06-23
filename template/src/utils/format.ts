import dayjs from 'dayjs';
import {FormatFunction} from 'i18next';
import {Platform} from 'react-native';

const formatFunction: FormatFunction = (value, format, lng) => {
  if (value instanceof Date) {
    return formatDate(value, format);
  }
  switch (format) {
    case 'currency':
      return formatCurrency(value, lng);
    case 'number':
      return formatNumber(value, lng);
  }
  return value;
};

export default formatFunction;

function formatDate(date: Date, format?: string) {
  return dayjs(date).format(format);
}

function formatCurrency(value: number, lng?: string) {
  if (Platform.OS === 'ios') {
    // lack of Intl support on hermes engine for iOS
    // https://github.com/facebook/hermes/issues/23#issuecomment-1156823548
    return `€${value}`;
  }
  return Intl.NumberFormat(lng, {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

function formatNumber(value: number, lng?: string) {
  if (Platform.OS === 'ios') {
    // lack of Intl support on hermes engine for iOS
    // https://github.com/facebook/hermes/issues/23#issuecomment-1156823548
    return value;
  }
  return Intl.NumberFormat(lng).format(value);
}
