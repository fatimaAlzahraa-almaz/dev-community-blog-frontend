import { LuLinkedin } from "react-icons/lu";
import { LuGithub } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/fatimaAlzahraa-almaz",
      icon: LuGithub,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/fatima-almaz-74724a2b8/",
      icon: LuLinkedin,
    },
    {
      label: "Instagram",
      href: "#",
      icon: LuInstagram,
    },
  ];

  return (
    <footer className="w-full border-t border-border bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row w-full">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="text-lg font-semibold text-primary">About Dev</p>
            <p className="max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
              We&apos;re a place where coders share, stay up-to-date, and grow
              their careers.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:ml-auto sm:justify-end">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-accent text-accent-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-chart-4 hover:text-chart-4"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Dev. All rights reserved.</p>
          <p>Built for developers who write, publish, and grow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
