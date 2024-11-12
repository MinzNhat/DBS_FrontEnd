import { store } from "@/store";
import ProviderWrapper from "@/hooks";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import React from "react";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  const locale = store.getState().language.locale;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ProviderWrapper>
        {children}
      </ProviderWrapper>
    </NextIntlClientProvider>
  );
};