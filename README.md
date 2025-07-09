# 開発環境構築

## 初回 / .envが更新された時

```
cp .env.example .env
```

### install

```
npm install
```

## db

table の更新がしたいときは、`src/db/schema.ts`を更新してください
table 定義を更新したら以下の順番で実装してください

```
npm run db:gen
npm run db:migrate
```

seed は以下を実行してください

```
npm run db:seed
```

## docker

npm の script で立ち上がります

```
npm run up
npm run down
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
