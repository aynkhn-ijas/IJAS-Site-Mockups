import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const cards = [
  {
    id: "students",
    href: "#students",
    title: "STUDENTS",
    body: "Everything you need to get ready for IJAS. Start your science fair journey here!",
    imageUrl: "/cards/students.jpg",
  },
  {
    id: "teachers",
    href: "#teachers",
    title: "TEACHERS",
    body: "All the resources you need to guide and Inspire your students",
    imageUrl: "/cards/teachers.jpg",
  },
  {
    id: "volunteer",
    href: "#volunteer",
    title: "VOLUNTEERS",
    body: "Join us as a judge or runner and inspire young scientists!",
    imageUrl: "/cards/volunteers.jpg",
  },
  {
    id: "donors",
    href: "#donors",
    title: "DONORS",
    body: "Learn how your organization can support IJAS and the future scientists!",
    imageUrl: "/cards/donors.jpg",
  },
];

export default function AudienceCards() {
  return (
    <section className="bg-ijas-wash px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto grid max-w-[1180px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {cards.map((card) => (
          <a key={card.id} id={card.id} href={card.href} className="block">
            <CardContainer containerClassName="py-0 w-full" className="w-full">
              <CardBody className="group/card relative h-[300px] w-full overflow-hidden rounded-[6px] bg-[#111] md:h-[350px]">
                <CardItem translateZ={80} className="absolute inset-0 h-full w-full">
                  <img
                    src={card.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </CardItem>
                <CardItem
                  translateZ={50}
                  className="absolute inset-x-0 bottom-12 left-0 max-w-[92%] px-4 text-white"
                >
                  <p className="text-xl font-bold tracking-wide">{card.title}</p>
                  <p className="mt-1 text-sm leading-snug">{card.body}</p>
                </CardItem>
                <CardItem
                  translateZ={40}
                  className="absolute bottom-4 left-4 text-lg leading-none text-white"
                  aria-hidden="true"
                >
                  →
                </CardItem>
              </CardBody>
            </CardContainer>
          </a>
        ))}
      </div>
    </section>
  );
}
