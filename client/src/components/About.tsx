import { useLanguage } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import teamMember1 from '@assets/generated_images/Professional_team_member_portrait_7f87b141.png';
import teamMember2 from '@assets/generated_images/Female_team_member_portrait_98eff077.png';

export function About() {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: 'Mohammed Al-Ahmad',
      role: 'Chief Technology Officer',
      image: teamMember1,
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Frontend Developer',
      image: teamMember2,
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
      }
    },
  ];

  const values = [
    {
      icon: 'fas fa-eye',
      title: t('about.vision.title'),
      description: t('about.vision.desc'),
    },
    {
      icon: 'fas fa-bullseye',
      title: t('about.mission.title'),
      description: t('about.mission.desc'),
    },
  ];

  return (
    <section className=\"py-20 bg-background min-h-screen\">
      <div className=\"container mx-auto px-4\">
        {/* Section Header */}
        <div className=\"text-center mb-16\" data-aos=\"fade-up\">
          <h1 className=\"text-3xl md:text-4xl font-bold text-foreground mb-4\">
            {t('about.title')}
          </h1>
          <p className=\"text-lg text-muted-foreground max-w-3xl mx-auto\">
            {t('about.subtitle')}
          </p>
        </div>

        {/* About Description */}
        <div className=\"max-w-4xl mx-auto mb-20\" data-aos=\"fade-up\" data-aos-delay=\"200\">
          <p className=\"text-lg text-muted-foreground leading-relaxed text-center\">
            {t('about.description')}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-8 mb-20\">
          {values.map((value, index) => (
            <Card 
              key={index}
              className=\"hover-elevate border-border transition-all duration-300\"
              data-aos=\"fade-up\"
              data-aos-delay={index * 200}
            >
              <CardContent className=\"p-8 text-center\">
                <div className=\"mb-6\">
                  <div className=\"inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-chart-2 text-white rounded-full text-2xl\">
                    <i className={value.icon}></i>
                  </div>
                </div>
                <h3 className=\"text-xl font-semibold text-foreground mb-4\">
                  {value.title}
                </h3>
                <p className=\"text-muted-foreground leading-relaxed\">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Section */}
        <div className=\"text-center mb-12\" data-aos=\"fade-up\">
          <h2 className=\"text-2xl md:text-3xl font-bold text-foreground mb-4\">
            {t('about.team.title')}
          </h2>
        </div>

        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto\">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className=\"hover-elevate border-border transition-all duration-300\"
              data-aos=\"fade-up\"
              data-aos-delay={index * 200}
              data-testid={`card-team-member-${index}`}
            >
              <CardContent className=\"p-8 text-center\">
                {/* Team Member Photo */}
                <div className=\"mb-6\">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className=\"w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-primary/20\"
                    data-testid={`img-team-member-${index}`}
                  />
                </div>

                {/* Name & Role */}
                <h3 className=\"text-xl font-semibold text-foreground mb-2\" data-testid={`text-team-name-${index}`}>
                  {member.name}
                </h3>
                <p className=\"text-muted-foreground mb-6\" data-testid={`text-team-role-${index}`}>
                  {member.role}
                </p>

                {/* Social Links */}
                <div className=\"flex justify-center space-x-4\">
                  <a 
                    href={member.social.linkedin}
                    className=\"text-muted-foreground hover:text-primary transition-colors\"
                    data-testid={`link-team-linkedin-${index}`}
                  >
                    <i className=\"fab fa-linkedin text-xl\"></i>
                  </a>
                  <a 
                    href={member.social.twitter}
                    className=\"text-muted-foreground hover:text-primary transition-colors\"
                    data-testid={`link-team-twitter-${index}`}
                  >
                    <i className=\"fab fa-twitter text-xl\"></i>
                  </a>
                  <a 
                    href={member.social.github}
                    className=\"text-muted-foreground hover:text-primary transition-colors\"
                    data-testid={`link-team-github-${index}`}
                  >
                    <i className=\"fab fa-github text-xl\"></i>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}