CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL
);

CREATE TABLE "wallets" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL
);

CREATE TABLE "cryptos" (
  "id" SERIAL PRIMARY KEY,
  "wallet_id" INT NOT NULL,
  "cryptocurrency_id" INT NOT NULL,
  "balance" NUMERIC(20,2) NOT NULL DEFAULT 0
);

CREATE TABLE "cryptocurrencies" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "abbreviation" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE "fiats" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "crypto_id" INT NOT NULL,
  "type" ENUM(THB,USD) NOT NULL,
  "amount" NUMERIC(20,2) NOT NULL DEFAULT 0
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "crypto_id" INT NOT NULL,
  "cryptocurrency_id" INT NOT NULL,
  "type" ENUM(BUY,SELL) NOT NULL,
  "price" NUMERIC(20,2) NOT NULL DEFAULT 0,
  "quantity" NUMERIC(20,2) NOT NULL DEFAULT 0
);

CREATE TABLE "tansactions" (
  "id" SERIAL PRIMARY KEY,
  "from_order_id" INT NOT NULL,
  "from_user_id" INT NOT NULL,
  "from_crypto_id" INT NOT NULL,
  "to_order_id" INT NOT NULL,
  "to_user_id" INT NOT NULL,
  "to_crypto_id" INT NOT NULL,
  "quantity" NUMERIC(20,2) NOT NULL DEFAULT 0
);

ALTER TABLE "wallets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "cryptos" ADD FOREIGN KEY ("wallet_id") REFERENCES "wallets" ("id");

ALTER TABLE "cryptos" ADD FOREIGN KEY ("cryptocurrency_id") REFERENCES "cryptocurrencies" ("id");

ALTER TABLE "fiats" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "fiats" ADD FOREIGN KEY ("crypto_id") REFERENCES "cryptos" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("crypto_id") REFERENCES "cryptos" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("cryptocurrency_id") REFERENCES "cryptocurrencies" ("id");

ALTER TABLE "tansactions" ADD FOREIGN KEY ("from_order_id") REFERENCES "orders" ("id");

ALTER TABLE "tansactions" ADD FOREIGN KEY ("from_user_id") REFERENCES "users" ("id");

ALTER TABLE "tansactions" ADD FOREIGN KEY ("from_crypto_id") REFERENCES "cryptos" ("id");

ALTER TABLE "tansactions" ADD FOREIGN KEY ("to_order_id") REFERENCES "orders" ("id");

ALTER TABLE "tansactions" ADD FOREIGN KEY ("to_user_id") REFERENCES "users" ("id");

ALTER TABLE "tansactions" ADD FOREIGN KEY ("to_crypto_id") REFERENCES "cryptos" ("id");
