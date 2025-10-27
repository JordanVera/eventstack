export default function VideoHero() {
  return (
    <div className="relative h-[85vh] w-screen overflow-hidden sm:h-[80vh]">
      {/* xl:h-[65vh] 2xl:h-[60vh] */}
      {/* Cloudflare Stream background video (16:9 cover) */}
      <iframe
        src="https://customer-55aij4xphwdwvuce.cloudflarestream.com/35be932bf107bd5d623ba8d2c2d8db10/iframe?autoplay=true&controls=false&loop=true&muted=true&preload=true"
        className="absolute top-0 left-0 h-[75vw] min-h-full w-[220vh] min-w-full border-0 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="relative flex h-full flex-col items-center justify-center px-4">
        <h1 className="mb-4 text-center text-5xl font-bold text-white mix-blend-difference sm:text-6xl md:text-8xl">
          create & discover events
        </h1>
      </div>
    </div>
  );
}
