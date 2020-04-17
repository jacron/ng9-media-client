// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const hostname = document.location.hostname;
let musicServer;  // musiclibrary
let moviesServer; // movies18
let booksServer; // booklibrary
// let systemServer; // systemlibrary
let host;

console.log(document.location);
console.log(hostname);
const pchost = '10.0.1.3';  // imac or macbook

if (hostname.includes('xip.io')
  || hostname.includes('vhx.cloud')
  || hostname.includes(pchost)) {
  host = 'http://' + pchost;
  musicServer = host + ':3005';
  moviesServer = host + ':5080';
  booksServer = host + ':3004';
  // systemServer = host + ':3006';
} else if (hostname.includes('127.0.0.1') ||
  hostname.includes('localhost')) {
  // use dev
  host = 'http://127.0.0.1';
  // musicServer = host + ':8030/api';
  musicServer = host + ':3005';
  moviesServer = host + ':5080';
  // booksServer = host + ':5050';
  booksServer = host + ':3004';
  // systemServer = host + ':3006';
} else {
  // use 'prod'
  // musicServer = 'http://music-api/api';
  moviesServer = 'http://movies18';
  // booksServer = 'http://booklibrary';
  host = 'http://127.0.0.1';
  booksServer = host + ':5050'; // ':3004';
  musicServer = host + ':3005';
  // musicServer = host + ':8030/api'; // dev
}

console.log('music server', musicServer);
console.log('movie server', moviesServer);
console.log('book server', booksServer);

export const environment = {
  musicServer,
  moviesServer,
  booksServer,
  // systemServer,
  googleUrl: 'https://google.nl/search?q=',
  googleAfbUrl: 'https://www.google.nl/search?tbm=isch&q=',
  freedbUrl: 'http://www.freedb.org/freedb_discid_check.php?discid=',
  amazonUrl: 'https://www.amazon.com/dp/',
  musicbrainz: 'https://musicbrainz.org/otherlookup/freedbid?other-lookup.freedbid=',
  imdbNameUrl: 'https://www.imdb.com/name/',
  imdbTitle: 'https://www.imdb.com/title/',
  imdbTitleFind: 'https://www.imdb.com/find?s=tt&q=',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
