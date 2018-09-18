
<p align="center"> <img src="https://user-images.githubusercontent.com/33973828/45661881-ecb9aa00-bb18-11e8-9c30-b1341609e9a4.png" width="300"/></p>



Its an app that allow us to create inspections, edit categories , sub categories and forword these inspections to email. 

  - Forword inspections with pdf format.
  - Create edit and delete categories and sub-categories.
  - Add categories and delete inspections.

# New Features Release!

  - Forword inspections with email pipeline
  - Implementing subscriptions handler using stripe ( 30 days free trial ).
  - Export documents as PDF via email 


This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Tech

Thanks
* [angular] - Component based framework 
* [ionic] - Libr for mob UI's
* [yii] - Framework for php backend
* [php] - Language for backend handlers
* [stripe] - Api for payment process
* [cordova] - converting web to hybrid 

### Installation

must be running [Node.js](https://nodejs.org/) in your system. Install ionic and cordova globally.
Install the dependencies and devDependencies and start the server.
```sh
$ cd safety-app
$ npm install 
$ ionic serve
```

For production environments...

```sh
$ ionic cordova run android --prod
$ ionic cordova build android --prod
$ ionic cordova build android --aot --minifyjs --minifycss --release
```

### Plugins
Chief Safety is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Camera | [ReadMe](https://github.com/apache/cordova-plugin-camera/blob/master/README.md) |
| Stripe | [ReadMe](https://github.com/zyra/cordova-plugin-stripe/blob/master/README.md) |
| Email | [ReadMe](https://github.com/katzer/cordova-plugin-email-composer/blob/master/README.md) |


#### Building for source
For production release:
```sh
$ ionic cordova build android --release --prod
```
   [Angular]: <http://angular.io>
   [Ionic]: <http://ionicframework.com>
   [stripe]: <http://stripe.com>
   [yii]: <https://www.yiiframework.com/>
   [php]: <http://php.net/>
   [cordova]: <https://cordova.apache.org/>
  

