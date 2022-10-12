module.exports = {
    mode: 'jit',
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './safelist.txt',
        './components/**/*.{js,jsx,ts,tsx}',
        './helpers/**/*.{js,jsx,ts,tsx}',
    ],
    safelist: [
        {
            pattern: /(bg|text|border|fill|stroke)-(red|green|blue|purple|yellow|pink|orange)-(100|200|300|400|500)/,
        },
        {
            pattern: /(bg|text|border|fill|stroke)-(red|green|blue|purple|yellow|pink|orange)/,
        }
    ],
    theme: {
        extend: {
            fontSize: {
                '2xs': '0.625rem',
                '3xs': '0.5rem',
                '5xl': ['3rem','3.4rem'],
            },
            sizes: {
                '2xs': '0.625rem',
                '3xs': '0.5rem',
                '10xl': '5rem',
            },
            animation: {
                marquee: 'marquee 10s linear infinite',
                spinslow: 'spin 10s linear infinite;',
                fadein: 'fadein 1s linear',
                fadeinslow: 'fadein 4s linear'
              },
              keyframes: {
                marquee: {
                  '0%': { transform: 'translateX(50%)' },
                  '100%': { transform: 'translateX(-100%)' },
                },
                fadein: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 100}
                }
              },
            colors: {
                'twitch': '#6441a5',
                'twitter': '#1DA1F2',
                'spotify': '#1DB954',
                'claw-red': '#F30F15',
                'terminal-green': '#00f701',
                'black':
                    {
                        DEFAULT: '#050505',
                        '50':
                            '#616161',
                        '100':
                            '#575757',
                        '200':
                            '#424242',
                        '300':
                            '#232323',
                        '400':
                            '#191919',
                        '500':
                            '#050505',
                        '600':
                            '#000000',
                        '700':
                            '#000000',
                        '800':
                            '#000000',
                        '900':
                            '#000000'
                    }
                ,
                'white':
                    {
                        DEFAULT: '#FDFFFF',
                        '50':
                            '#FFFFFF',
                        '100':
                            '#FFFFFF'
                    }
                ,
                'blue':
                    {
                        DEFAULT: '#3454D1',
                        '50':
                            '#CAD2F3',
                        '100':
                            '#B9C4EF',
                        '200':
                            '#98A8E8',
                        '300':
                            '#778CE0',
                        '400':
                            '#5570D9',
                        '500':
                            '#3454D1',
                        '600':
                            '#2640A7',
                        '700':
                            '#1B2F79',
                        '800':
                            '#111D4C',
                        '900':
                            '#070B1E'
                    }
                ,
                'red':
                    {
                        DEFAULT: '#E04242',
                        '50':
                            '#FAE0E0',
                        '100':
                            '#F7CFCF',
                        '200':
                            '#F1ACAC',
                        '300':
                            '#EC8989',
                        '400':
                            '#E66565',
                        '500':
                            '#E04242',
                        '600':
                            '#CA2121',
                        '700':
                            '#9A1919',
                        '800':
                            '#691111',
                        '900':
                            '#390909'
                    }
                ,
                'purple':
                    {
                        DEFAULT: '#8051EC',
                        '50':
                            '#F8F6FE',
                        '100':
                            '#EBE3FC',
                        '200':
                            '#D0BFF8',
                        '300':
                            '#B59AF4',
                        '400':
                            '#9B75F0',
                        '500':
                            '#8051EC',
                        '600':
                            '#5B1EE6',
                        '700':
                            '#4614B8',
                        '800':
                            '#330F85',
                        '900':
                            '#200953'
                    }
                ,
                'pink':
                    {
                        DEFAULT: '#D1345B',
                        '50':
                            '#F3CAD4',
                        '100':
                            '#EFB9C6',
                        '200':
                            '#E898AC',
                        '300':
                            '#E07791',
                        '400':
                            '#D95576',
                        '500':
                            '#D1345B',
                        '600':
                            '#A72646',
                        '700':
                            '#791B33',
                        '800':
                            '#4C1120',
                        '900':
                            '#1E070C'
                    }
                ,
                'orange':
                    {
                        DEFAULT: '#E08E45',
                        '50':
                            '#FAEEE2',
                        '100':
                            '#F7E3D1',
                        '200':
                            '#F1CEAE',
                        '300':
                            '#ECB88B',
                        '400':
                            '#E6A368',
                        '500':
                            '#E08E45',
                        '600':
                            '#CB7222',
                        '700':
                            '#9B571A',
                        '800':
                            '#6B3C12',
                        '900':
                            '#3B210A'
                    }
            }
        },
    },
    plugins: [],
}
