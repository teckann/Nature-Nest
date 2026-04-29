import Image from "next/image";
import { signInAction } from "../_lib/action";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-4 sm:gap-6 text-base sm:text-lg border border-primary-300 px-6 py-3 sm:px-10 sm:py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
