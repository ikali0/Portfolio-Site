const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Inga k.
        </p>
        <p className="text-sm text-muted-foreground">
          AI Systems · Ethics · Applied Philosophy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
