<h1 align="center"><img src="./logo.png" alt="Ecoleta" /></h1>
<p align="center">Project develop in Next Level Week #01 Code Booster</p>
<p align="center">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/static/v1?label=Node&message=JS&color=blue?style=plastic&logo=Node.js" alt="NodeJS" />
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/static/v1?label=React&message=JS&color=blue?style=plastic&logo=React" alt="ReactJS" />
  </a>
  <a href="https://reactnative.dev/">
    <img src="https://img.shields.io/static/v1?label=React&message=Native&color=blue?style=plastic&logo=React" alt="React-Native" />
  </a>
</p>
<p align="center"><img src="./ecoleta.png" /></p>

---

## About

Ecoleta is an application to connect people who want to find collection places for recycling batteries, electronics, lamps, among others in your city and region closest to you.

This project includes: Server-API / Web App / Mobile App

### Technologies

<ul>
    <li>React</li>
    <li>React Native</li>
    <li>NodeJs</li>
    <li>Typescript</li>
</ul>
<h2>Figma</h2>
<p>Design: <a href="https://www.figma.com/file/9TlOcj6l7D05fZhU12xWT3/Ecoleta-(Booster)" target="__blank">Project Link</a></p>

## Run Project

Clone Project

```git
git clone https://github.com/alvaroico/NextLevelWeek.git
```

API

```ssh
cd serve
npm install
npm run knex:migrate
npm run knex:seed
npm run dev
```

Web

```ssh
cd web
npm install
npm run start
```

Mobile

```ssh
cd mobile
npm install
npm run start
```

## Author

Álvaro Ribeiro Pereira - [GitHub](https://github.com/alvaroico) / [Linkedin](https://www.linkedin.com/in/alvaroico) / [Email](mailto:alvaro.r.p@hotmail.com)

## License

This project use MIT license, see the file [LICENSE](./LICENSE) for more details

---

<p align="center">Develop by <a href="https://github.com/alvaroico">Álvaro Ribeiro Pereira</a></p>

-----
Server
--
npm init -y

npm install express

npm install @types/express -D


npm install ts-node -D

npm install typescript -D

npx tsc --init

npm install ts-node-dev -D

npm install knex

npm install sqlite3
se tiver erro na instalação utiliza o comando antes 
npm install --global --production windows-build-tools

npx knex migrate:latest --knexfile knexfile.ts

npm install cors
npm install @types/cors -D

npm install multer

npm install @types/multer -D

npm install colebrate

npm install @types/hapi__joi

-----------------
WEB
--
npx create-react-app web --template=typescript

adicionar comando de auto complet html 
"emmet.syntaxProfiles": {"javascript": "jsx"},
    "emmet.includeLanguages": {"javascript": "javascriptreact"},

npm install react-icons

npm install react-router-dom

npm install @types/react-router-dom -D

npm install leaflet react-leaflet
https://react-leaflet.js.org/
https://leafletjs.com/
npm install @types/react-leaflet -D

npm install axios

npm install react-dropzone

----------
APP Celular
--
 npm install -g expo-cli
 expo init mobile

 expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto

https://reactnavigation.org/docs/getting-started
 npm install @react-navigation/native
 expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
 npm install @react-navigation/stack

 expo install react-native-maps

 expo install expo-constants

expo install react-native-svg

npm install axios

expo install expo-location

expo install expo-mail-composer