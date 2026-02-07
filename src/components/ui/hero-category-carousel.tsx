export function HeroCategoryCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const filteredProjects = selectedCategory
    ? categoryProjects.filter((p) =>
        p.categories.includes(selectedCategory)
      )
    : [];

  return (
    <div className="w-full">

      {/* CATEGORY CAROUSEL */}
      <div className="relative">

        {/* Arrows */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-card border border-border shadow-sm disabled:opacity-0"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-card border border-border shadow-sm disabled:opacity-0"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
        </button>

        {/* Embla Container */}
        <div className="overflow-hidden px-2 sm:px-10" ref={emblaRef}>
          <div className="flex gap-3 py-2">

            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              const projectCount = categoryProjects.filter((p) =>
                p.categories.includes(category.id)
              ).length;

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory((prev) =>
                      prev === category.id ? null : category.id
                    )
                  }
                  className={cn(
                    "flex-shrink-0 flex items-center gap-2",
                    "px-4 py-2 rounded-full border",
                    "min-h-[38px] text-sm font-medium transition-all",
                    isSelected
                      ? `${category.bgColor} ${category.color} border-current`
                      : "bg-card border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  <FontAwesomeIcon
                    icon={category.icon}
                    className="w-4 h-4"
                  />

                  {category.label}

                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      isSelected
                        ? "bg-current/20"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {projectCount}
                  </span>
                </button>
              );
            })}

          </div>
        </div>

        <div className="flex justify-center mt-2 sm:hidden">
          <span className="text-xs text-muted-foreground">
            ← Swipe →
          </span>
        </div>
      </div>

      {/* PROJECT PANEL */}
      <AnimatePresence mode="wait">
        {selectedCategory && filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold">
                  {
                    categories.find(
                      (c) => c.id === selectedCategory
                    )?.label
                  }{" "}
                  Projects
                </h3>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-xl overflow-hidden border border-border bg-muted/40 hover:shadow-md transition-all"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <h4 className="text-base font-semibold mb-1">
                        {project.title}
                      </h4>

                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          View Project
                          <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            className="w-3 h-3"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
