export default function ForgotPasswordPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#55D6C2]">
      <div className="w-[600px] h-[450px] bg-[#efeded80] rounded shadow-md flex flex-col items-center justify-center px-10">
        <p className="text-center text-black text-sm mb-6 px-4">
          Don’t worry, Enter your email below and we will
          <br />
          send you a link to change password.
        </p>

        <form className="flex flex-col items-center gap-4 w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-400 rounded bg-white"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Submit
          </button>

          <a
            href="#"
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Sign In
          </a>
        </form>
      </div>
    </div>
  );
}
