import NextAuth, { EventCallbacks } from "next-auth";

import EmailProvider from "next-auth/providers/email";
import CredentialProvider from "next-auth/providers/credentials";

import type { NextApiRequest, NextApiResponse } from "next";

import { LOGIN } from "src/graphql/auth/mutations/authenticate";
import { REGISTER_USER } from "src/graphql/auth/mutations/register";
import { DgraphAdapter } from "@next-auth/dgraph-adapter";
import apolloClient from "src/apollo/apollo-client";
import { Router } from "next/router";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`

  return await NextAuth(req, res, {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt", maxAge: 1 * 1 * 1 * 100000 },

    providers: [
      // OAuth authentication providers

      CredentialProvider({
        name: "NEXT AUTH",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "Email",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
          firstName: {
            label: "First name",
            type: "text",
            placeholder: "Enter first name",
          },
          lastName: {
            label: "Last name",
            type: "text",
            placeholder: "Enter last name",
          },
        },
        async authorize(credentials, request) {
          if (credentials?.firstName) {
            const { data, errors } = await apolloClient.mutate({
              mutation: REGISTER_USER,
              variables: {
                emailAddress: credentials?.email,
                password: credentials?.password,
                firstName: credentials?.firstName,
                lastName: credentials?.lastName,
              },
            });
            if (data.signUp.token) {
              return data.signUp.token;
            }
            return errors;
          }
          const { data, errors } = await apolloClient.mutate({
            mutation: LOGIN,
            variables: {
              emailAddress: credentials?.email,
              password: credentials?.password,
            },
          });
          if (data.authenticate.token) {
            return data.authenticate.token;
          }

          return null;
        },
      }),
    ],
    pages: {
      signIn: "/signin",
      newUser: "/newUser",
      signOut: "/home",
      error: "/signin",
    },
    callbacks: {
      // async signIn({ user, account, profile, email, credentials }) {
      //   console.log(credentials);
      //   return true;
      // },
      // async redirect({ url, baseUrl }) {
      //   return baseUrl;
      //

      async session({ session, user, token }) {
        if (token) {
          session.accessToken = token.accessToken;
          session.token = token.token as any;
        }

        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.token = user;
        }
        if (account) {
          token.accessToken = account.access_token;
        }

        return token;
      },
    },
  });
}
