import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '10.1.1.13' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
