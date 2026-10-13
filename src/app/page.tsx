import HeroStage from "@/components/HeroStage";

/**
 * Home page
 *
 * Renders:
 *  1. HeroStage – the full-viewport pinned hero section
 *  2. A short footer spacer so the user can see the page continues after
 *     the pin is released (required for the scroll trigger to work)
 */
export default function Home() {
  return (
    <>
      <HeroStage />
      {/* Extra scroll space so the page has room below the hero */}
      <footer className="footer-spacer">
        <p>Scroll up to replay the animation ↑</p>
      </footer>
    </>
  );
}
