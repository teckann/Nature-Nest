import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

/* 
  Resource:
    https://next-auth.js.org/getting-started/example (npm install next-auth@beta)
    https://next-auth.js.org/providers/google
*/
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  // NextAuth will auto call these callback function when some important steps occur in the login process
  callbacks: {
    // check if logged in
    authorized({ auth, request }) {
      // double ! will make this as a boolean result, it will return either true or false
      return !!auth?.user;
    },

    // controlling whether users can log in
    // run after click signIn, bu before actual login into system
    async signIn({ user, account, profile }) {
      try {
        // check got this this person in database or not
        const existingGuest = await getGuest(user.email);

        // if cannot found in that person in supabase = new user
        // need to create an account for that person AND store into supabase
        if (!existingGuest)
          createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },

    // add data to session (add the id in session as guestId)
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;

      return session;
    },
  },

  // customize the page routes used by NextAuth (if not, it will keep default)
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
