export default {
  components: {
    btn: {
      class({ variant }) {
        return [
          'btn',
          'inline-block text-sm uppercase text-gray-800 font-semibold text-decoration-none transition hover:text-gray-600',
          {
            'py-3 px-5': variant?.includes('medium'),
            'py-2 px-4': variant?.includes('small'),
            'bg-white shadow border border-transparent rounded hover:shadow-md active:shadow-none':
              variant?.includes('default'),
            'text-white rounded hover:text-white bg-gray-700 shadow active:bg-gray-800 active:shadow-inner':
              variant?.includes('primary'),
            'bg-gray-600 hover:bg-gray-500':
              variant?.includes('primary') && !variant?.includes('active'),
            'bg-gray-800 shadow-inner':
              variant?.includes('primary') && variant?.includes('active'),
          },
        ];
      },
    },

    icon: {
      spriteUrl: `${import.meta.env.BASE_URL}assets/icons.svg`,
      class:
        'inline-block align-middle relative top-[-0.135em] fill-transparent stroke-current stroke-2 will-change-transform pointer-events-none',
    },

    label: {
      class: 'text-sm font-medium',
    },

    select: {
      class: 'relative',
    },

    selectBtn: {
      class:
        'appearance-none py-2 px-4 text-sm text-white font-semibold whitespace-nowrap bg-gray-600 hover:bg-gray-500 rounded shadow transition',
    },

    selectOptions: {
      class:
        'overflow-hidden absolute top-full mt-1 left-0 min-w-full text-gray-700 bg-white shadow border border-gray-300 rounded',
    },

    selectOption: {
      class({ active }) {
        return [
          'py-2 px-3 text-sm font-semibold cursor-pointer hover:bg-gray-100 hover:text-gray-800',
          {
            'text-gray-600': !active,
            'bg-gray-100 text-gray-800': active,
          },
        ];
      },
    },

    textField: {
      class:
        'appearance-none w-full py-3 px-4 text-gray-700 leading-[1.35] border border-gray-400 rounded shadow-inner hover:border-gray-600 focus:border-gray-600',
    },
  },
};
