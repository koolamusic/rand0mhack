const callouts = [
  {
    name: "Predict the Block",
    description:
      "Earn rewards by predicting the outcome from any given block versions",
    imageSrc: "/app/block-quest.webp",
    imageAlt: "challenges by the block and transactions on aptos",
    href: "#",
    isEnabled: true,
  },
  {
    name: "Lottery Luck (coming soon)",
    description: "Stake an amount in a lottery and try your luck to win $$",
    imageSrc: "/app/lottery-image.webp",
    imageAlt: "Aptos Lottery & Games",
    href: "#",
    isEnabled: false,
  },
  {
    name: "YOLO (coming soon)",
    description: "If you like to take risks, you can YOLO with frens and win $",
    imageSrc: "/app/yolo-thumbnail.webp",
    imageAlt: "Yolo games for those on the edge",
    href: "#",
    isEnabled: false,
  },
];

export function QuestCategory() {
  return (
    <div className="bg-gray-100" id="#questhome">
      <div className="mx-auto max-w-7xl border-x-2 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">
            Our Challenges and more!
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div
                key={callout.name}
                className={`${callout.isEnabled ? "group relative" : "group relative opacity-70"}`}
              >
                <div className="sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="text-md mt-6 uppercase text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
