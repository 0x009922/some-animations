module.exports = {
    purge: ['./src/**/*.vue'],
    theme: {
        extend: {
            boxShadow: {
                focus: '0 0 0 3px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    variants: {
        boxShadow: ['focus'],
        borderColor: ['hover'],
    },
};
