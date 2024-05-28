"use server";

import { env } from "@/env";
import { BASE_PRICE, PRODUCT_PRICES } from "@/lib/products";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type Order } from "@prisma/client";

type createCheckoutSessionArgs = {
  configId: string;
};

export async function createCheckoutSession({
  configId,
}: createCheckoutSessionArgs) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in!");
  }

  const config = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!config) {
    throw new Error("No config found!");
  }

  const { finish, material } = config;

  let price = BASE_PRICE;

  const priceModifiers = [
    { condition: finish === "textured", value: PRODUCT_PRICES.finish.textured },
    {
      condition: material === "polycarbonate",
      value: PRODUCT_PRICES.material.polycarbonate,
    },
  ];

  priceModifiers.forEach((modifier) => {
    if (modifier.condition) {
      price += modifier.value;
    }
  });

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: config.id,
    },
  });

  let order: Order | undefined = undefined;
  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: config.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [config.imgUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripSession = await stripe.checkout.sessions.create({
    success_url: `${env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${config.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripSession.url };
}
