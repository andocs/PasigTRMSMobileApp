import { StyleSheet, View, Image } from 'react-native';

const SocialLogin = () => (
  <View style={styles.socialContainer}>
    <Image style={styles.socialIcon} source={require('../assets/images/google.svg')} />
    <Image style={styles.socialIcon} source={require('../assets/images/facebook.svg')} />
    <Image style={styles.socialIcon} source={require('../assets/images/twitter.svg')} />
  </View>
);
const styles = StyleSheet.create({
    socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
})
export default SocialLogin;
