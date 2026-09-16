import { signInWithMicrosoft } from '@/app/lib/actions';

export function MicrosoftSignInButton() {
  return (
    <div className="rounded-lg bg-gray-50 px-6 py-4">
      <div className="relative flex items-center">
        <div className="grow border-t border-gray-200" />
        <span className="mx-3 shrink text-xs font-medium text-gray-500">
          Or continue with
        </span>
        <div className="grow border-t border-gray-200" />
      </div>
      <form action={signInWithMicrosoft} className="mt-4">
        <button
          type="submit"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-200"
        >
          <MicrosoftLogo />
          Sign in with Microsoft
        </button>
      </form>
    </div>
  );
}

function MicrosoftLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}
