# KUBE_WATCHER - UI 프로젝트

## contributor
@manbalboy(정훈) manbalboy@hanmail.net

## Tech Requirement (Tech Stack)
- nuxt.js
- ESLint
- Babel
- Sass
- Storybook
- Jest

## Release
0.0.1 : initialize

## Script
```json
{
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:generate-output": "jest --json --outputFile=.jest-test-results.json"
  }
}
```

## Install
- git clone
```shell
git clone https://github.com/manbalboy/kubewatcher-ui-vue.git .
```
- npm install
```shell
# clone dir
npm i
```

- project dev start
```shell
npm run dev
```

- project storybook start
```shell
npm run storybook
```

## Tip 
- Storybook install 방법
```shell
npx -p @storybook/cli sb init
```

## 사용 모듈 공식사이트
- [Nuxtjs](https://nuxtjs.org)
- [Jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)
- [vue2-transitions](https://github.com/BinarCode/vue2-transitions)
- [tween.js](https://github.com/tweenjs/tween.js/)