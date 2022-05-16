import GithubLogo from "../components/Icons/GithubLogo";
import TwitterLogo from "../components/Icons/TwitterLogo";
import TwitchLogo from "../components/Icons/TwitchLogo";
import MothLogo from "../components/Icons/MothLogo";




const links = {
  main: [
    { name: '/var/logs', href: '/logs'},
    // { name: '~/projects', href: '#' },
    { name: '~/stats', href: '/stats' },
  ],
  social: [
    {
      name: 'Github',
      href: 'https://github.com/DR-DinoMight',
      icon: () => (
        <GithubLogo />
      ),
      rel: 'me'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/DR_DinoMight',
      icon: () => (
        <TwitterLogo />
      ),
      rel: 'me'
    },
    {
      name: 'Twitch',
      href: 'https://www.twitch.tv/dr_dinomight',
      icon: () => (
        <TwitchLogo />
      ),
      rel: 'me'
    },
    {
      name: 'The Claw Discord',
      href: 'https://discord.gg/theclaw',
      icon: () => (
        <MothLogo />
      ),
      rel: ''
    },
  ],
}

export default links;
