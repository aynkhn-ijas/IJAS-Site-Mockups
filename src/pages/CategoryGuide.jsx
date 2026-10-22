import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import usePageTitle from "@/hooks/usePageTitle";

const categories = [
  { name: "Aerospace Science", body: "Flight, rocketry, drones, aerodynamics, and space systems." },
  { name: "Agriculture", body: "Crops, soils, livestock, agronomy, and food production systems." },
  { name: "Astronomy", body: "Celestial observation, planetary science, and astrophysics investigations." },
  { name: "Behavioral Science", body: "Human or animal behavior, psychology, and learning studies." },
  { name: "Biochemistry", body: "Chemical processes in living systems, enzymes, and biomolecules." },
  { name: "Botany", body: "Plant growth, physiology, ecology, and agricultural plant science." },
  { name: "Cellular and Molecular Biology", body: "Cells, genetics, molecular pathways, and biotechnology." },
  { name: "Chemistry", body: "Reactions, materials chemistry, analytical methods, and chemical properties." },
  { name: "Computer Science", body: "Algorithms, software, modeling, cybersecurity, and computational tools." },
  { name: "Earth Science", body: "Geology, weather, climate, hydrology, and earth systems." },
  { name: "Electronics", body: "Circuits, sensors, signal processing, and electronic devices." },
  { name: "Engineering", body: "Design, build, and test solutions to applied technical problems." },
  { name: "Environmental Science", body: "Ecosystems, pollution, conservation, and sustainability." },
  { name: "Health Science", body: "Human health, medicine, public health, and biomedical applications." },
  { name: "Materials Science", body: "Properties, processing, and performance of materials." },
  { name: "Mathematics", body: "Proofs, modeling, statistics, and theoretical or applied math." },
  { name: "Microbiology", body: "Bacteria, fungi, viruses, and microbial processes." },
  { name: "Physics", body: "Mechanics, energy, waves, optics, and physical systems." },
  { name: "Product/Consumer Science", body: "Product testing, consumer comparisons, and applied evaluation." },
  { name: "Zoology", body: "Animals, animal behavior, physiology, and zoological ecology." },
];

export default function CategoryGuide() {
  usePageTitle("Category Guide");

  return (
    <>
      <PageHero title="IJAS Category Guide" />
      <PageContent>
        <p>
          Students must design an experiment to investigate a question or problem, design or develop
          a new model, computer program, solve a mathematical proof, and so forth. The following
          information about the 20 IJAS categories should help place a given project in the proper
          category for judging.
        </p>
        {categories.map((item) => (
          <section key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.body}</p>
          </section>
        ))}
      </PageContent>
    </>
  );
}
