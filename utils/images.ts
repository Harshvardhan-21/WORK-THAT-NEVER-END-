// Central asset registry — all require() calls resolved at module load time
// This avoids Metro bundler issues with spaces in folder paths on Windows

const Images = {
  srvLoginLogo:  require('../assets/logo/srv-login-logo.png'),
  srvLogo:       require('../assets/logo/srv-logo.png'),
};

export default Images;
