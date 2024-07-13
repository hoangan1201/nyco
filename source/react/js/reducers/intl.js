const initialState = {
  initialNow: Date.now(),
  locale: 'en-US',
  isRtl: false,
};

export default function intl(state = initialState) {
  return state;
}
