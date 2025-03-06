import { Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <div className="h-30 mt-20 border-t-2 border-primary/15 bg-primary/5 flex flex-col justify-center items-center space-y-4">
      <div className="space-x-2">
        <span>© 2025, created by</span>
        <span className="text-green-500">wehttqm</span>
      </div>
      <div className="flex flex-row space-x-4">
        <Github
          className="hover:cursor-pointer hover:text-green-500 transition-all"
          onClick={() => {
            window.open("https://github.com/wehttqm");
          }}
        />
        <Linkedin
          className="hover:cursor-pointer hover:text-green-500 transition-all"
          onClick={() => {
            window.open("https://linkedin.com/in/mf5");
          }}
        />
      </div>
    </div>
  );
};
