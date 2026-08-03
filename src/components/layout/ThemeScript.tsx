/**
 * Runs before first paint so the theme never flashes. The document ships with
 * `class="dark"`; this only strips it when light is the resolved preference.
 * A stored choice always wins over the system setting.
 */
const script = `(function(){try{var s=localStorage.getItem('theme');var light=s?s==='light':window.matchMedia('(prefers-color-scheme: light)').matches;if(light){document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
