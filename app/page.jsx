import HeroSection from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection />
      <section>
        <div>
          <h2>Powerful Features for Your Career Growth</h2>
          <div>
            {features.map((feature, index) => {
              return (
                <Card key={feature.id || index}>
                  <CardContent>
                    <div>
                      {feature.icon}
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
