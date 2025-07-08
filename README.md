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
npm run seed
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

ui は変更しずらく、デザインの一貫性を持たせたいかつ features での細かい粒度での調整もしたいということで pandacss を採用しました。
shadcn と迷ったのですが

- pandacss はまだ使ったことがなかった
- styled で ui 部分はかなり縛れそうな気がした
- 特別インタラクションやアクセシビリティについて記載してなかったので簡単に component を作りたかった
- より型安全や eslint で縛り、統一性のあるコード安全なコードを実現したかった
  といった理由で見送りました
