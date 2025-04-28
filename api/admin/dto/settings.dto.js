module.exports = class SettingsDto {
  constructor(email, notificationsEnabled, appName, googleMapsApiKey, firebaseConfig) {
    this.email = email;
    this.notificationsEnabled = notificationsEnabled;
    this.appName = appName;
    this.googleMapsApiKey = googleMapsApiKey;
    this.firebaseConfig = firebaseConfig;
  }
};
