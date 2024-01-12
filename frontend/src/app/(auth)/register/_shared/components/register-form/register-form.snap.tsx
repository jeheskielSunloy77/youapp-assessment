// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`RegisterForm should match snapshot 1`] = `
<div>
  <form
    class="space-y-6"
    data-testid="register-form"
  >
    <div
      class="space-y-0.5"
      role="container"
    >
      <div>
        <input
          class="input-primary"
          name="email"
          placeholder="Enter Email"
          required=""
          type="email"
        />
      </div>
    </div>
    <div
      class="space-y-0.5"
      role="container"
    >
      <div>
        <input
          class="input-primary"
          minlength="3"
          name="name"
          placeholder="Create Username"
          required=""
          type="text"
        />
      </div>
    </div>
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
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$"
          placeholder="Create Password"
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
          name="passwordConf"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$"
          placeholder="Confirm Password"
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
      class="w-full font-bold text-white bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-60"
      disabled=""
      type="submit"
    >
      Register
    </button>
  </form>
</div>
`;
