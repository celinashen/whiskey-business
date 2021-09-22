
// // import {GOOGLE_CLOUD_VISION_API_KEY, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_APP_ID, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID} from '../secrets'

// var environments = {
//   staging: {
//     FIREBASE_API_KEY: "AIzaSyAiTV_auiA53DMRTSOQRPrBwbuhQ0c36L4",
//     FIREBASE_APP_ID: "1:880790822468:web:879816dc26d8779a9ea611",
//     FIREBASE_PROJECT_ID: "whiskey-business-36392",
//     FIREBASE_MESSAGING_SENDER_ID: "880790822468",
//     FIREBASE_AUTH_DOMAIN: "whiskey-business-36392.firebaseapp.com",
//     FIREBASE_STORAGE_BUCKET: "whiskey-business-36392.appspot.com",
//     GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyAekpObrtDPPrvY6GKzt2RD9GjBPOPSdS4"
//   },
//   production: {
//   // Warning: This file still gets included in your native binary and  is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
//   }
// };
// function getReleaseChannel() {
//   let releaseChannel = Expo.Constants.manifest.releaseChannel;
//   if (releaseChannel === undefined) {
//     return 'staging';
//   } else if (releaseChannel === 'staging') {
//     return 'staging';
//   } else {
//     return 'staging';
//   }
// }
// function getEnvironment(env) {
//   console.log('Release Channel: ', getReleaseChannel());
//   return environments[env];
// }
// var Environment = getEnvironment(getReleaseChannel());

// export default Environment;