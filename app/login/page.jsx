import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center px-4">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center">
        Sign in to access your guest area
      </h2>

      <SignInButton />
    </div>
  );
}
