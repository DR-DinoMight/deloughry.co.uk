import BlinkingCursor from "./BlnkingCursor";

const WhoAmI = () => {
  return (
    <div className="mb-10">
      <h2 className="text-3xl"><span className='text-red'>~/</span> <span className='text-white'>$ whoami<BlinkingCursor cursor={'_'}/></span></h2>
      <div className="mt-6">
        <p className="mb-4">So I'm Matt (aka Dr_DinoMight 🦖🧨), a developer of something around 15 years (I think!? They all blend into one and other now 😖)</p>
        <p className="mb-4">I'm a developer for the brilliant HMA Digital here in South Yorkshire, UK.</p>
        <p className="mb-4">💬 I'm a Full Stack Developer who loves to tinker with anything and everything, I love to build, be it personal 1 person projects or large scale community projects, as long as it's code it floats my boat!</p>
        <p className="mb-4">
          🔭 I'm currently a Moderator on both Twitch and Discord for <a href="https://whitep4nth3r.com/" target="_blank" rel="nofollow noreferrer">whiteP4nth3r</a> <a href="https://www.twitch.tv/PixelogicDev" target="_blank" rel="nofollow noreferrer">PixelogicDev</a>.
        </p>
      </div>
    </div>
  )
}

export default WhoAmI;
