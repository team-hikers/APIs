<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

[type] 커밋 메세지 #이슈번호

init : 개발 환경 구성
feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우
refactor : 코드 리팩토링
test : 테스트 코드, 리팩토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정

js의 경우, int type이 따로 존재하지 않아 long long 같은 큰 수를 다룰 경우, 문제 발생 가능
=> bigint로 감싸주거나, string으로 쓰면 된다.

enum을 활용할 경우, tree shaking이 안 되는 경우가 있을 수 있다.
tree shaking은 빌드할 때, 성능 최적화를 위해서 chunk를 split해서 필요한 부분만 빌드한다.
a enum을 c에서 가져다 쓴다고 했을 때, c를 업데이트 하면 a를 업데이트하게 되고, a를 import하는 b, d 등도
함께 업데이트가 이루어져서 chunk가 커진다는 단점이 있다.
but, 오타를 방지해주고 자동 완성을 쓸 수 있다.

type 엘리어스를 사용하는 것도 검토해봐야 한다 - trade off의 관계이다.

- enum 왜 쓰니? => 관심사 분리
- - 이것은 나의 문제가 아니라 typescript가 해결해야 할 일이다.
- - 나의 일은 유지보수에 유리하고 가독성이 좋은 코드를 작성하여 높은 생산성을 꾀하는 일이지,
- - 빌드와 관련된 성능의 문제는 타입스크립트에서 자체적으로 해결해야 하는 문제이다.

.env는 로컬에 저장하는 것이다.
대신, 네트워크 보안을 이용한다.
이런 예민한 정보는 큰 회사의 경우 따로 관리하는 팀도 있다.
.env를 잘 쓰기 위해서 최적화하는 것은 큰 의미가 없을 수 있다.
private repository 쓰면 그냥 올리기도 한다.

graphql의 통신 규약과 http의 관계

- http를 통해서 serving을 하긴 하지만, 규약을 잘 따른다고 할 수 있나?
- - method는 graphql에서 알아서 해준다.

dockerize / 테스트 코드 / 개발 환경 구축 / ci&cd가 도전과제입니다.

원래 목표 + 칸반 만들기

칸반 순서 조작은 방법이 2가지 정도 있을 것 같다.

- 성능을 비교해보자?
