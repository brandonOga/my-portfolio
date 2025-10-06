export default function Footer() {
  return (
    <footer className="w-full ">
        <div className="w-full mx-auto py-4 px-[1.5vw] flex flex-col lg:flex-row items-center text-center gap-[10px] lg:items-center justify-between">
            <p className="text-base ld:text-lg text-[var(--offblack)]">© 2025 – All Rights Reserved</p>
            <p className="text-3xl"style={{ fontFamily: 'var(--font-moonrock)' }}>Oga</p>
            <p className="text-base ld:text-lg text-[var(--offblack)]">Designed and Developed by Brandon Mupemhi</p>
        </div>
    </footer>
  );
}