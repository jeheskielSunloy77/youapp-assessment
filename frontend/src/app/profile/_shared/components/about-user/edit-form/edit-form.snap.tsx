// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`EditForm should match snapshot 1`] = `
<div>
  <form
    class="space-y-2"
    id="about-user"
  >
    <label
      class="flex items-center gap-4 group cursor-pointer w-fit"
      for="image-input"
    >
      <div
        class="bg-gray-200 dark:bg-white dark:bg-opacity-[0.08] rounded-2xl w-16 h-16 flex items-start justify-center text-amber-500 text-5xl font-extralight group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
      >
        <div
          class="mt-1 text-gradient-gold"
        >
          +
        </div>
      </div>
      <div>
        <span
          class="text-gray-800 dark:text-gray-100 text-sm group-hover:underline font-medium"
        >
          Add
           Profile Image
        </span>
      </div>
      <input
        accept="image/png, image/jpeg, image/jpg, image/webp"
        class="sr-only"
        id="image-input"
        name="avatar"
        type="file"
      />
    </label>
    <div
      class="space-y-4"
    >
      <div
        class="space-y-0.5"
        role="container"
      >
        <div
          class="flex items-center justify-between"
        >
          <label
            class="text-xs text-gray-600 dark:text-gray-400"
            for="Display Name"
          >
            Display Name
          </label>
          <input
            class="w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400"
            id="Display Name"
            minlength="3"
            name="name"
            placeholder="Enter Name"
            type="text"
            value="testusername"
          />
        </div>
      </div>
      <div
        class="space-y-0.5"
      >
        <div
          class="flex items-center justify-between"
        >
          <label
            class="text-xs text-gray-600 dark:text-gray-400"
            for="Gender"
          >
            Gender
          </label>
          <select
            class="w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end disabled:text-gray-500 "
            id="Gender"
            name="gender"
          >
            <option
              class="dark:bg-gray-800"
              disabled=""
              value=""
            >
              Select Gender
            </option>
            <option
              class="dark:bg-gray-800"
              selected=""
              value="Male"
            >
              Male
            </option>
            <option
              class="dark:bg-gray-800"
              value="Female"
            >
              Female
            </option>
          </select>
        </div>
      </div>
      <div
        class="space-y-0.5"
        role="container"
      >
        <div
          class="flex items-center justify-between"
        >
          <label
            class="text-xs text-gray-600 dark:text-gray-400"
            for="Birthday"
          >
            Birthday
          </label>
          <input
            class="w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400"
            id="Birthday"
            max="2024-01-12"
            name="birthday"
            type="date"
            value="2000-12-12"
          />
        </div>
      </div>
      <div
        class="space-y-0.5"
        role="container"
      >
        <div
          class="flex items-center justify-between"
        >
          <label
            class="text-xs text-gray-600 dark:text-gray-400"
            for="Horoscope"
          >
            Horoscope
          </label>
          <input
            class="w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400"
            id="Horoscope"
            name="horoscope"
            placeholder="--"
            readonly=""
            type="text"
            value="Rabbit"
          />
        </div>
      </div>
      <div
        class="space-y-0.5"
        role="container"
      >
        <div
          class="flex items-center justify-between"
        >
          <label
            class="text-xs text-gray-600 dark:text-gray-400"
            for="Zodiac"
          >
            Zodiac
          </label>
          <input
            class="w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400"
            id="Zodiac"
            name="zodiac"
            placeholder="--"
            readonly=""
            type="text"
            value="Sagittarius"
          />
        </div>
      </div>
      <div
        class="space-y-0.5"
        role="container"
      >
        <div
          class="flex items-center justify-between relative"
        >
          <label
            class="text-xs text-gray-600 dark:text-gray-400"
            for="Height"
          >
            Height
          </label>
          <input
            class="w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400 pr-10"
            data-testid="input-with-unit"
            id="Height"
            max="300"
            min="40"
            name="height"
            placeholder="Add Height"
            type="number"
            unit="cm"
            value="183"
          />
          <span
            class="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 text-sm"
            data-testid="unit-label"
          >
            cm
          </span>
        </div>
      </div>
      <div
        class="space-y-0.5"
        role="container"
      >
        <div
          class="flex items-center justify-between relative"
        >
          <label
            class="text-xs text-gray-600 dark:text-gray-400"
            for="Weight"
          >
            Weight
          </label>
          <input
            class="w-2/3 border dark:border-white dark:border-opacity-[0.22] input-primary text-end read-only:text-gray-400 pr-10"
            data-testid="input-with-unit"
            id="Weight"
            max="300"
            min="10"
            name="weight"
            placeholder="Add Weight"
            type="number"
            unit="kg"
            value="70"
          />
          <span
            class="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 text-sm"
            data-testid="unit-label"
          >
            kg
          </span>
        </div>
      </div>
    </div>
  </form>
</div>
`;
