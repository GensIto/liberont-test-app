## 開発環境構築

`node --version`
v22.15.1
`npm --version`
11.4.0

## 本番環境

https://liberont-test-app.gensito1121.workers.dev

## 初回

```
cp .env.example .env
cp wrangler.example.json wrangler.json
npm install
npm run dev
```

### install

```
npm install
```

## db

table の更新がしたいときは、`src/db/schema.ts`を更新してください
table 定義を更新したら以下の順番で実行してください

```
npm run db:gen
npm run db:migrate
```

本番環境にmigrateを行いたいときは以下を実行してください

```
db:migrate:remote
```

localへのseed は`src/db/seed.ts`を更新してください。実行は以下を実行してください

```
npm run db:seed:local
```

本番環境へのseedは`src/db/seed.sql`を更新してください。実行は以下を実行してください

```
npm run db:seed:remote
```

## コンポーネント設計

- features
  - ドメインというかページ単位での固有の ui をおく
- ui
  - アプリケーション全体で共通の ui

限られた時間での実装なのでできるだけコアなUIの作成の工数は省きたいため、shadcn/uiを採用しました。
デザイナーとの連携も考えtailwindcssベースだとfigmaとの連携でtokenを自動生成しPRを作成する記事を見かけたのと、もしshadcn/uiが提供しているcomponentではデザイナーさんが提案してくれるデザイン要件を満たせない場合でもベースがtailwindcssなので変更しやすいと言ったメリットがあると思います

個人的にはui は変更しずらく、デザインの一貫性を持たせたいかつ型安全に開発したいので、pandacssを使用するか迷ったのですが、以下の理由で見送りました

- pandacss はまだ使ったことがなかった
- arkuiなどの使用を検討する必要がある
- 限られた時間での実装なので、学習しながらだと課題が終わらない可能性もある
  tailwindcssぽくもかけるしcssぽくもかけるので、これから入る人の学習コストも減らせそうと考えています。(コードの統一感という意味では悩みどころですが、、、)

## deploy

```
cp wrangler.example.json wrangler.json
```

を行い実際の環境の値を反映させてください。以下を実行すると本番環境にdeployされます

```
npm run deploy
```
