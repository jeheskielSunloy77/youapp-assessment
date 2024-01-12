// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`LoginPage should match snapshot 1`] = `
<div>
  <div
    class="background-light"
  >
    <nav
      class="fixed top-8 text-black dark:text-white w-full z-50"
      role="navigation"
    >
      <div
        class="container mx-auto px-4 sm:px-0 flex items-center justify-between"
      >
        <button
          class="button-ghost font-bold"
          role="navigation"
        >
          <svg
            class="w-6 h-6 -rotate-90"
            data-testid="chevron-up"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
            />
          </svg>
          Back
        </button>
      </div>
    </nav>
    <main
      class="container mx-auto py-6 px-6 md:px-0 h-screen flex items-center justify-center"
    >
      <div
        class="w-full space-y-8"
      >
        <h1
          class="text-2xl font-bold text-black dark:text-white"
        >
          Login
        </h1>
        <form
          class="space-y-6"
          data-testid="login-form"
        >
          <input
            class="input-primary"
            minlength="3"
            name="credential"
            placeholder="Enter Username/Email"
            required=""
            type="text"
          />
          <div
            class="space-y-0.5"
            role="container"
          >
            <div
              class="relative"
            >
              <input
                class="input-primary"
                minlength="8"
                name="password"
                placeholder="Enter Password"
                required=""
                type="password"
              />
              <svg
                class="w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer"
                data-testid="eye-outline"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
                />
              </svg>
            </div>
          </div>
          <button
            class="w-full button-gradient"
            disabled=""
            type="submit"
          >
            Login
          </button>
        </form>
        <p
          class="text-sm text-center text-gray-800 dark:text-gray-100"
        >
          No account?
           
          <a
            class="text-gradient-gold underline"
            href="/register"
          >
            Register here
          </a>
        </p>
      </div>
    </main>
  </div>
</div>
`;
